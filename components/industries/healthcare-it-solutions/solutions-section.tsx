import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import content from '@/content/healthcare-it-solutions.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Short reference: how each of the five TEAM solutions applies to healthcare and wellness.
// Link text is the solution name (never the solution page's primary keyword) to avoid cannibalization.
export default function SolutionsSection() {
  const c = content.solutions;

  return (
    <section id='solutions-for-healthcare' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 md:mb-16'>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 max-w-4xl font-anybody text-black'>{c.title}</h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-dark-gray'>{c.intro}</p>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.06} className='divide-y divide-divider border-y border-divider'>
          {c.items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='group grid gap-2 py-6 transition-colors hover:bg-secondary/5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] md:items-center md:gap-8 md:px-4'
            >
              <h3 className='font-anybody text-base font-bold text-black group-hover:text-secondary-dark-2 md:text-lg'>
                {item.name}
              </h3>
              <p className='font-public text-body-line text-dark-gray'>{item.text}</p>
              <ArrowRight
                className='hidden h-5 w-5 text-black transition-transform group-hover:translate-x-1 md:block'
                aria-hidden='true'
              />
            </Link>
          ))}
        </AnimatedSequence>
      </div>
    </section>
  );
}
