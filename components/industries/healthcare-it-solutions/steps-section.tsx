import { CheckCircle2 } from 'lucide-react';
import content from '@/content/healthcare-it-solutions.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

import EngagementPlayer from './engagement-player';

export default function StepsSection() {
  const c = content.steps;
  const steps = c.items;

  return (
    <section id='how-it-works' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 md:mb-20'>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 max-w-4xl font-anybody text-black'>{c.title}</h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-dark-gray'>{c.intro}</p>
        </div>

        <div className='grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14'>
          <div className='lg:sticky lg:top-28 lg:self-start'>
            <EngagementPlayer
              steps={steps}
              outcomeLabel={c.outcomeLabel}
              label='Animated overview of how a healthcare engagement works'
              stepLabel='Step'
              pauseLabel='Pause animation'
              playLabel='Play animation'
            />
          </div>

          {/* Semantic list mirrors the HowTo JSON-LD steps */}
          <AnimatedSequence animation='fadeInUp' staggerDuration={0.08} classNames={{ item: 'relative' }}>
            {steps.map((step, i) => (
              <div
                key={step.id}
                id={step.id}
                className={`relative grid scroll-mt-24 grid-cols-[3rem_1fr] gap-5 md:grid-cols-[4rem_1fr] md:gap-8 ${
                  i < steps.length - 1 ? 'pb-10' : ''
                }`}
              >
                {i < steps.length - 1 && (
                  <span
                    className='absolute left-6 top-14 h-[calc(100%-3.5rem)] w-px bg-divider md:left-8'
                    aria-hidden='true'
                  />
                )}
                <div className='relative z-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-talent bg-absolute-white font-anybody text-lg font-bold text-talent md:h-16 md:w-16 md:text-2xl'>
                  {i + 1}
                </div>
                <div className='rounded-2xl border border-divider bg-absolute-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-8'>
                  <h3 className='mb-2 font-anybody text-lg font-bold text-black md:text-xl'>{step.title}</h3>
                  <p className='mb-4 font-public text-body-line text-dark-gray'>{step.text}</p>
                  <p className='flex items-start gap-2 font-public text-sm text-black'>
                    <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-positive' aria-hidden='true' />
                    <span>
                      <span className='font-semibold'>{c.outcomeLabel}:</span> {step.outcome}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </AnimatedSequence>
        </div>
      </div>
    </section>
  );
}
