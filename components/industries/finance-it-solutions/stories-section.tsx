import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import content from '@/content/finance-it-solutions.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import { LIVE_SITE } from '@/lib/site';

// Same three success stories as the current live page (Telenor, Texas Center, Allica Bank).
// Kept unchanged while TEAM replaces its case studies.
export default function StoriesSection() {
  const c = content.stories;

  return (
    <section id='success-stories' className='scroll-mt-20 bg-primary-dark-2 py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <h2 className='text-title-h4 mb-10 font-anybody text-white md:mb-14'>{c.title}</h2>
        <AnimatedSequence
          animation='fadeInUp'
          staggerDuration={0.1}
          className='grid justify-items-center gap-6 md:grid-cols-3'
        >
          {c.items.map(item => (
            <article key={item.key} className='group flex h-full w-full max-w-[360px] flex-col'>
              <div className='relative aspect-square overflow-hidden'>
                <Image
                  src={item.image}
                  alt={`${item.client} success story`}
                  width={360}
                  height={360}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute bottom-5 left-0 right-0 flex justify-center transition-transform duration-300 group-hover:scale-110'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt={item.client} className='h-auto w-56' />
                </div>
              </div>
              <div className='flex flex-grow flex-col items-start justify-between gap-4 bg-secondary p-4'>
                <p className='font-public text-body-line text-secondary-accent'>{item.text}</p>
                <a
                  href={`${LIVE_SITE}${item.href}`}
                  className='ti-button group/btn inline-flex items-center gap-2 bg-black px-5 py-2 text-white transition-colors hover:bg-primary-dark-3'
                >
                  {c.buttonText}
                  <ArrowRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-1' />
                </a>
              </div>
            </article>
          ))}
        </AnimatedSequence>
      </div>
    </section>
  );
}
