import Image from 'next/image';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import content from '@/content/insights-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Industry Intel: same white paper as the live page.
export default function IntelSection() {
  const c = content.intel;

  return (
    <section id='industry-intel' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16'>
        <div>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-black'>{c.title}</h2>
          <p className='mb-6 font-public text-body-line leading-relaxed text-dark-gray'>{c.intro}</p>
          <ul className='mb-8 grid gap-3'>
            {c.bullets.map(b => (
              <li key={b} className='flex items-start gap-2 font-public text-body-line text-black'>
                <CheckCircle2 className='mt-1 h-4 w-4 shrink-0 text-secondary-dark-2' aria-hidden='true' />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={c.ctaHref}
            className='ti-button group inline-flex items-center gap-2 border border-black px-6 py-3 text-black transition-colors hover:bg-black hover:text-white'
          >
            {c.cta}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>

        <AnimatedSequence animation='fadeInUp'>
          <a
            href={c.featured.href}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative block overflow-hidden rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
          >
            <div className='relative aspect-[16/11]'>
              <Image
                src={c.featured.image}
                alt={c.featured.title}
                fill
                sizes='(min-width: 1024px) 640px, 100vw'
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent' />
            </div>
            <div className='absolute inset-x-0 bottom-0 p-8'>
              <p className='mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-public text-xs font-semibold text-absolute-black'>
                <FileText className='h-3.5 w-3.5' aria-hidden='true' />
                {c.featured.label}
              </p>
              <h3 className='mb-4 font-anybody text-xl font-bold leading-snug text-white md:text-2xl'>{c.featured.title}</h3>
              <span className='ti-button inline-flex items-center gap-2 text-secondary'>
                {c.featured.cta}
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </span>
            </div>
          </a>
        </AnimatedSequence>
      </div>
    </section>
  );
}
