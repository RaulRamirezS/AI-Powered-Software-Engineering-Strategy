import { Bot, Headset, Wrench, BarChart3, ArrowDown } from 'lucide-react';
import content from '@/content/customer-care-technical-support.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

const ICONS = [Bot, Headset, Wrench, BarChart3];

export default function ModelSection() {
  const c = content.model;
  const layers = c.layers;

  return (
    <section id='human-ai' className='relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-28'>
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-talent/15 blur-[140px]' />
      </div>
      <div className='relative mx-auto grid max-w-[1280px] items-start gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16'>
        <div className='lg:sticky lg:top-28'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='font-public text-body-line leading-relaxed text-white/70'>{c.text}</p>
        </div>

        {/* Layered routing: each request goes to the level that resolves it best */}
        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-3'>
          {layers.map((layer, i) => {
            const Icon = ICONS[i] ?? Bot;
            const isLoop = i === layers.length - 1;
            return (
              <div key={layer.title}>
                <article
                  className={
                    isLoop
                      ? 'flex items-start gap-5 rounded-2xl border border-secondary/40 bg-secondary/10 p-6'
                      : 'flex items-start gap-5 rounded-2xl border border-white/20 bg-white/[0.08] p-6 backdrop-blur-xl'
                  }
                >
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary'>
                    <Icon className='h-6 w-6' aria-hidden='true' />
                  </span>
                  <span>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.08em] text-white/50'>
                      {isLoop ? 'Feedback loop' : `Level ${i + 1}`}
                    </span>
                    <h3 className='mb-1 mt-1 font-anybody text-lg font-bold text-white'>
                      {layer.title}
                    </h3>
                    <p className='font-public text-body-line text-white/60'>{layer.text}</p>
                  </span>
                </article>
                {i < layers.length - 1 && (
                  <div className='flex justify-center py-1' aria-hidden='true'>
                    <ArrowDown className='h-4 w-4 text-white/30' />
                  </div>
                )}
              </div>
            );
          })}
        </AnimatedSequence>
      </div>
    </section>
  );
}
