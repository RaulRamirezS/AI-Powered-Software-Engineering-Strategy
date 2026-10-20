import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import content from '@/content/insights-hub.json';
import { solutions } from '@/lib/solutions';
import { industries } from '@/lib/industries';

// Internal links to every solution and industry page (anchor = page name, never a target keyword).
export default function ExploreSection() {
  const c = content.explore;
  const sol = solutions.filter(s => s.live);

  const linkCls =
    'group flex items-center justify-between gap-4 border-b border-white/10 py-3 font-public text-body-line text-white/80 transition-colors hover:text-secondary';

  return (
    <section className='bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 max-w-3xl'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='font-public text-body-line leading-relaxed text-white/60'>{c.intro}</p>
        </div>
        <div className='grid gap-10 md:grid-cols-2 md:gap-16'>
          <div>
            <h3 className='mb-4 font-anybody text-xl font-bold text-white'>{c.solutionsTitle}</h3>
            <ul>
              {sol.map(s => (
                <li key={s.href}>
                  <Link href={s.href} className={linkCls}>
                    {s.label}
                    <ArrowRight className='h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1' aria-hidden='true' />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href='/solutions' className='ti-button mt-6 inline-flex items-center gap-2 text-secondary'>
              {c.solutionsCta} →
            </Link>
          </div>
          <div>
            <h3 className='mb-4 font-anybody text-xl font-bold text-white'>{c.industriesTitle}</h3>
            <ul>
              {industries.map(ind =>
                ind.internal ? (
                  <li key={ind.href}>
                    <Link href={ind.href} className={linkCls}>
                      {ind.label}
                      <ArrowRight className='h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1' aria-hidden='true' />
                    </Link>
                  </li>
                ) : (
                  <li key={ind.href}>
                    <a href={ind.href} target='_blank' rel='noopener noreferrer' className={linkCls}>
                      {ind.label}
                      <ArrowRight className='h-4 w-4 shrink-0 -rotate-45' aria-hidden='true' />
                    </a>
                  </li>
                ),
              )}
            </ul>
            <Link href='/industries' className='ti-button mt-6 inline-flex items-center gap-2 text-secondary'>
              {c.industriesCta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
