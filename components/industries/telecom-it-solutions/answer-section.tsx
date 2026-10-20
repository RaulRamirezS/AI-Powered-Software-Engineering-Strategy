import { Check } from 'lucide-react';
import content from '@/content/telecom-it-solutions.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

export default function AnswerSection() {
  const c = content.answer;

  return (
    <section id='answer' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16'>
          {/* Main direct-answer snippet: plain, crawlable text first on the page */}
          <div>
            <p className='text-overline mb-4 font-public font-semibold text-secondary-dark-2'>
              {c.overline}
            </p>
            <h2 className='text-title-h5 text-balance mb-6 font-anybody text-black'>{c.question}</h2>
            <p className='border-l-4 border-secondary pl-6 font-public text-[1.0625rem] leading-8 text-black/80'>
              {c.text}
            </p>
          </div>

          <div className='rounded-2xl border border-divider bg-absolute-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-8'>
            <h2 className='mb-2 font-anybody text-xl font-bold text-black'>{c.segmentsTitle}</h2>
            <p className='mb-6 font-public text-body-line text-dark-gray'>{c.segmentsIntro}</p>
            <AnimatedSequence animation='fadeInUp' staggerDuration={0.05} className='grid gap-3 sm:grid-cols-2'>
              {c.segments.map(s => (
                <span
                  key={s}
                  className='flex items-start gap-2 rounded-xl border border-divider px-4 py-3 font-public text-sm text-black'
                >
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-secondary-dark-2' aria-hidden='true' />
                  {s}
                </span>
              ))}
            </AnimatedSequence>
          </div>
        </div>
      </div>
    </section>
  );
}
