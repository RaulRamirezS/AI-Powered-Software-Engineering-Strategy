import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import content from '@/content/ai-discovery-agent-experience.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

export default function PlatformSection() {
  const c = content.platform;
  const columns = [
    { ...c.scrunch, accent: 'talent' as const },
    { ...c.team, accent: 'secondary' as const },
  ];

  return (
    <section id='scrunch-team' className='relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-28'>
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-talent/15 blur-[140px]' />
      </div>
      <div className='relative mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 max-w-3xl md:mb-16'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='font-public text-body-line leading-relaxed text-white/70'>{c.text}</p>
        </div>

        {/* What Scrunch measures vs what TEAM does with it */}
        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-6 md:grid-cols-2'>
          {columns.map(col => (
            <article
              key={col.title}
              className={
                col.accent === 'secondary'
                  ? 'h-full rounded-2xl border border-secondary/50 bg-secondary/10 p-7'
                  : 'h-full rounded-2xl border border-white/20 bg-white/[0.08] p-7 backdrop-blur-xl'
              }
            >
              <h3 className='mb-5 font-anybody text-xl font-bold text-white'>{col.title}</h3>
              <ul className='grid gap-3'>
                {col.items.map(item => (
                  <li key={item} className='flex items-start gap-3 font-public text-body-line text-white/80'>
                    <CheckCircle2
                      className={
                        col.accent === 'secondary'
                          ? 'mt-0.5 h-5 w-5 shrink-0 text-secondary'
                          : 'mt-0.5 h-5 w-5 shrink-0 text-talent-light-2'
                      }
                      aria-hidden='true'
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </AnimatedSequence>

        <div className='mt-10 rounded-2xl border border-white/15 p-7'>
          <h3 className='mb-4 font-anybody text-lg font-bold text-white'>{c.next.title}</h3>
          <ul className='grid gap-3 md:grid-cols-3'>
            {c.next.links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='group inline-flex items-start gap-2 font-public text-sm font-semibold text-secondary hover:text-secondary-light-1'
                >
                  <ArrowRight
                    className='mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
