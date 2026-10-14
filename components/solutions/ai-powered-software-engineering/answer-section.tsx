import content from '@/content/ai-powered-software-engineering.json';
import { ArrowRight, Hammer, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import AnimatedSequence from '@/components/ui/animated-sequence';

const PATHS = [
  { key: 'build', href: '#build', Icon: Hammer, accent: 'secondary' },
  { key: 'modernize', href: '#modernize', Icon: RefreshCcw, accent: 'talent' },
] as const;

export default function AnswerSection() {
  const c = content.answer;

  return (
    <section id='paths' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16'>
          {/* Main direct-answer snippet: plain, crawlable text first on the page */}
          <div>
            <p className='text-overline mb-4 font-public font-semibold text-secondary-dark-2'>
              {c.overline}
            </p>
            <h2 className='text-title-h5 text-balance mb-6 font-anybody text-black'>
              {c.question}
            </h2>
            <p className='border-l-4 border-secondary pl-6 font-public text-[1.0625rem] leading-8 text-black/80'>
              {c.text}
            </p>
          </div>

          <div>
            <p className='text-overline mb-4 font-public font-semibold text-dark-gray'>
              {c.pathsLabel}
            </p>
            <AnimatedSequence animation='fadeInUp' className='grid gap-5'>
              {PATHS.map(({ key, href, Icon, accent }) => (
                <Link
                  key={key}
                  href={href}
                  className='group relative block overflow-hidden rounded-2xl border border-divider bg-absolute-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]'
                >
                  <div className='flex items-start gap-5'>
                    <div
                      className={
                        accent === 'secondary'
                          ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary-dark-2 transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'
                          : 'bg-talent/15 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-talent transition-all duration-300 group-hover:bg-talent group-hover:text-white'
                      }
                    >
                      <Icon className='h-6 w-6' aria-hidden='true' />
                    </div>
                    <div>
                      <span className='text-[10px] font-semibold uppercase tracking-[0.08em] text-dark-gray'>
                        {c[key].tag}
                      </span>
                      <h3 className='mb-2 mt-1 font-anybody text-xl font-bold text-black'>
                        {c[key].title}
                      </h3>
                      <p className='font-public text-body-line text-dark-gray'>
                        {c[key].text}
                      </p>
                      <span className='ti-button mt-4 inline-flex items-center gap-2 text-black'>
                        {c[key].cta}
                        <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </AnimatedSequence>
          </div>
        </div>
      </div>
    </section>
  );
}
