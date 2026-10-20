import { Layers, Boxes, Users, Scale, Headset, CheckCircle2 } from 'lucide-react';
import content from '@/content/business-services.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

const ICONS = [Layers, Users, Scale, Headset];

export default function FocusSection() {
  const c = content.focus;

  return (
    <section id='what-we-build' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 md:mb-20'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 max-w-4xl font-anybody text-white'>{c.title}</h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-white/60'>{c.intro}</p>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-6 md:grid-cols-2'>
          {c.items.map((item, i) => {
            const Icon = ICONS[i] ?? Boxes;
            return (
              <article
                key={item.title}
                className='group relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]'
              >
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </div>
                <h3 className='mb-3 font-anybody text-lg font-bold text-white md:text-xl'>{item.title}</h3>
                <p className='mb-5 font-public text-body-line text-white/60'>{item.text}</p>
                <p className='mt-auto flex items-start gap-2 border-t border-white/10 pt-4 font-public text-sm text-white/85'>
                  <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-secondary' aria-hidden='true' />
                  <span>{item.proof}</span>
                </p>
              </article>
            );
          })}
        </AnimatedSequence>
      </div>
    </section>
  );
}
