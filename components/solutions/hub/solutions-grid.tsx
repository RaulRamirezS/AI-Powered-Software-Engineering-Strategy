import { ArrowRight, Code2, Database, Headset, Compass, ScanSearch, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import content from '@/content/solutions-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import { LIVE_SITE } from '@/lib/site';

const ICONS: Record<string, typeof Code2> = {
  'ai-powered-software-engineering': Code2,
  'data-readiness': Database,
  'customer-care-technical-support': Headset,
  'ai-transformation': Compass,
  'ai-discovery-agent-experience': ScanSearch,
};

export default function SolutionsGrid() {
  const c = content.grid;

  return (
    <section id='solutions' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 max-w-4xl md:mb-16'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-white/60'>{c.intro}</p>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.08} className='grid gap-6 md:grid-cols-2'>
          {c.items.map(item => {
            const Icon = ICONS[item.slug] ?? Code2;
            return (
              <article
                key={item.slug}
                id={item.slug}
                className='group flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] md:p-8'
              >
                <div className='mb-5 flex items-center gap-4'>
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'>
                    <Icon className='h-6 w-6' aria-hidden='true' />
                  </span>
                  <p className='font-public text-sm italic text-white/60'>{item.tagline}</p>
                </div>
                <h3 className='mb-3 font-anybody text-xl font-bold text-white md:text-2xl'>{item.title}</h3>
                <p className='mb-6 font-public text-body-line text-white/70'>{item.text}</p>
                <p className='text-overline mb-3 font-public font-semibold text-secondary'>{c.resultsLabel}</p>
                <ul className='mb-6 grid gap-2'>
                  {item.results.map(r => (
                    <li key={r} className='flex items-start gap-2 font-public text-sm text-white'>
                      <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-secondary' aria-hidden='true' />
                      {r}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/solutions/${item.slug}`}
                  className='ti-button mt-auto inline-flex items-center gap-2 text-secondary hover:text-secondary-light-1'
                  aria-label={`${c.cta}: ${item.title}`}
                >
                  {c.cta}
                  <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
                </Link>
              </article>
            );
          })}

          {/* Helper card fills the sixth slot and routes undecided visitors to an expert */}
          <a
            href={`${LIVE_SITE}/contact-us`}
            className='group flex h-full flex-col justify-center rounded-2xl border border-secondary/50 bg-secondary/10 p-7 transition-all duration-300 hover:-translate-y-1 md:p-8'
          >
            <span className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-absolute-black'>
              <MessageSquare className='h-6 w-6' aria-hidden='true' />
            </span>
            <h3 className='mb-3 font-anybody text-xl font-bold text-secondary md:text-2xl'>{c.helper.title}</h3>
            <p className='mb-6 font-public text-body-line text-white/70'>{c.helper.text}</p>
            <span className='ti-button inline-flex items-center gap-2 text-white'>
              {c.helper.cta}
              <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
            </span>
          </a>
        </AnimatedSequence>
      </div>
    </section>
  );
}
