import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import content from '@/content/insights-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Same three success stories as the current live page (Allica Bank, Texas Center, Telenor).
export default function StoriesSection() {
  const c = content.stories;

  return (
    <section id='success-stories' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
            <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
            <p className='font-public text-body-line leading-relaxed text-white/60'>{c.intro}</p>
          </div>
          <a
            href={c.ctaHref}
            className='ti-button group inline-flex shrink-0 items-center gap-2 border border-white/60 px-6 py-3 text-white transition-colors hover:border-secondary hover:text-secondary'
          >
            {c.cta}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-6 md:grid-cols-3'>
          {c.items.map(item => (
            <article
              key={item.key}
              className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]'
            >
              <div className='relative aspect-[4/3] overflow-hidden'>
                <Image
                  src={item.image}
                  alt={`${item.client} success story`}
                  fill
                  sizes='(min-width: 768px) 400px, 100vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
                <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt={item.client} className='h-auto w-48' />
                </div>
              </div>
              <div className='flex flex-grow flex-col p-6'>
                <p className='text-overline mb-2 font-public font-semibold text-secondary'>{item.industry}</p>
                <p className='mb-6 font-public text-body-line text-white/75'>{item.text}</p>
                <a
                  href={item.href}
                  className='ti-button mt-auto inline-flex items-center gap-2 text-secondary hover:text-secondary-light-1'
                  aria-label={`${c.buttonText}: ${item.client}`}
                >
                  {c.buttonText}
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
