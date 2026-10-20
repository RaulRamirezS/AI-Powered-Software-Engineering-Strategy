import Image from 'next/image';
import { Download, CheckCircle2, Quote } from 'lucide-react';
import content from '@/content/insights-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Featured TEAM Insider report (same 2026 PDF as the live page).
export default function ReportSection() {
  const c = content.report;

  return (
    <section id='report' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <AnimatedSequence
          animation='fadeInUp'
          className='grid overflow-hidden rounded-3xl border border-white/20 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]'
        >
          <div className='relative min-h-[260px] lg:min-h-full'>
            <Image src={c.image} alt={c.title} fill sizes='(min-width: 1024px) 560px, 100vw' className='object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r' />
          </div>
          <div className='p-8 md:p-12'>
            <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
            <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
            <p className='mb-6 font-public text-body-line leading-relaxed text-white/70'>{c.text}</p>
            <ul className='mb-8 grid gap-2'>
              {c.bullets.map(b => (
                <li key={b} className='flex items-start gap-2 font-public text-sm text-white'>
                  <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-secondary' aria-hidden='true' />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={c.href}
              target='_blank'
              rel='noopener noreferrer'
              className='ti-button group inline-flex items-center gap-2 bg-secondary px-8 py-3 text-secondary-accent transition-colors hover:bg-secondary-light-1'
            >
              <Download className='h-4 w-4' aria-hidden='true' />
              {c.cta}
            </a>
            <figure className='mt-10 border-l-4 border-secondary pl-6'>
              <Quote className='mb-2 h-5 w-5 text-secondary' aria-hidden='true' />
              <blockquote className='font-anybody text-lg font-semibold leading-snug text-white'>{c.quote}</blockquote>
              <figcaption className='mt-3 font-public text-sm text-white/60'>{c.quoteAuthor}</figcaption>
            </figure>
          </div>
        </AnimatedSequence>
      </div>
    </section>
  );
}
