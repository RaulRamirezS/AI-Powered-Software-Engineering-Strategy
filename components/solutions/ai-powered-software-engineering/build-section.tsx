import content from '@/content/ai-powered-software-engineering.json';
import { Compass, Layers, Code, ShieldCheck, Server, Rocket } from 'lucide-react';
import AnimatedSequence from '@/components/ui/animated-sequence';

const ICONS = [Compass, Layers, Code, ShieldCheck, Server];

export default function BuildSection() {
  const c = content.build;
  const items = c.items;

  return (
    <section id='build' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 md:mb-20'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance mb-5 max-w-4xl font-anybody text-white'>
            {c.title}
          </h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-white/60'>
            {c.intro}
          </p>
        </div>

        <AnimatedSequence
          animation='fadeInUp'
          staggerDuration={0.1}
          className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
        >
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <article
                key={item.title}
                className='group relative h-full rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]'
              >
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </div>
                <h3 className='mb-3 font-anybody text-lg font-bold text-white'>{item.title}</h3>
                <p className='font-public text-body-line text-white/60'>{item.text}</p>
              </article>
            );
          })}

          {/* MVP callout */}
          <article className='group relative h-full rounded-2xl border border-secondary/40 bg-secondary/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-absolute-black'>
              <Rocket className='h-6 w-6' aria-hidden='true' />
            </div>
            <h3 className='mb-3 font-anybody text-lg font-bold text-secondary'>{c.mvp.title}</h3>
            <p className='font-public text-body-line text-white/70'>{c.mvp.text}</p>
          </article>
        </AnimatedSequence>
      </div>
    </section>
  );
}
