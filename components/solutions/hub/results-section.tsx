import { ArrowRight } from 'lucide-react';
import content from '@/content/solutions-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

export default function ResultsSection() {
  const c = content.results;

  return (
    <section className='bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 max-w-3xl'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-4 font-anybody text-white'>{c.title}</h2>
          <p className='font-public text-body-line text-white/60'>{c.intro}</p>
        </div>
        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-6 md:grid-cols-3'>
          {c.items.map(item => (
            <article
              key={item.title}
              className='flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-7 backdrop-blur-xl'
            >
              <p className='mb-4 font-anybody text-3xl font-bold leading-tight text-secondary'>{item.metric}</p>
              <h3 className='mb-3 font-anybody text-lg font-bold text-white'>{item.title}</h3>
              <p className='font-public text-body-line text-white/60'>{item.text}</p>
            </article>
          ))}
        </AnimatedSequence>
        <a
          href={c.ctaHref}
          className='ti-button group mt-10 inline-flex items-center gap-2 border border-white/60 px-8 py-3 text-white transition-colors hover:border-secondary hover:text-secondary'
        >
          {c.cta}
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </a>
      </div>
    </section>
  );
}
