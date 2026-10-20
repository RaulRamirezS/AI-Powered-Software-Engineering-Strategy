import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import content from '@/content/insights-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Same three blog posts as the current live page; titles, dates and summaries are crawlable text.
export default function BlogSection() {
  const c = content.blog;

  return (
    <section id='blog' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
            <h2 className='text-title-h4 text-balance mb-5 font-anybody text-black'>{c.title}</h2>
            <p className='font-public text-body-line leading-relaxed text-dark-gray'>{c.intro}</p>
          </div>
          <a
            href={c.ctaHref}
            className='ti-button group inline-flex shrink-0 items-center gap-2 border border-black px-6 py-3 text-black transition-colors hover:bg-black hover:text-white'
          >
            {c.cta}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.08} className='grid gap-6 md:grid-cols-3'>
          {c.items.map(item => (
            <article
              key={item.href}
              className='group flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-absolute-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]'
            >
              <div className='relative aspect-[16/10] overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes='(min-width: 768px) 400px, 100vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <div className='flex flex-grow flex-col p-6'>
                <p className='mb-3 flex items-center gap-3 font-public text-xs text-dark-gray'>
                  <time dateTime={item.date}>{item.dateLabel}</time>
                  <span className='inline-flex items-center gap-1'>
                    <Clock className='h-3.5 w-3.5' aria-hidden='true' />
                    {item.readTime}
                  </span>
                </p>
                <h3 className='mb-3 font-anybody text-lg font-bold leading-snug text-black'>{item.title}</h3>
                <p className='mb-6 font-public text-body-line text-dark-gray'>{item.text}</p>
                <a
                  href={item.href}
                  className='ti-button mt-auto inline-flex items-center gap-2 text-black hover:text-secondary-dark-2'
                  aria-label={`${c.cardCta}: ${item.title}`}
                >
                  {c.cardCta}
                  <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
                </a>
              </div>
            </article>
          ))}
        </AnimatedSequence>
      </div>
    </section>
  );
}
