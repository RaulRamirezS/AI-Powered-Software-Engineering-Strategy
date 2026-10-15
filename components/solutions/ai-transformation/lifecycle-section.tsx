import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import content from '@/content/ai-transformation.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

type Stage = {
  title: string;
  text: string;
  links?: { label: string; href: string }[];
};

export default function LifecycleSection() {
  const c = content.lifecycle;
  const stages: Stage[] = c.stages;

  return (
    <section
      id='strategy-to-production'
      className='relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-28'
    >
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

        {/* Consult → Validate → Build → Operate → Optimize */}
        <AnimatedSequence
          animation='fadeInUp'
          staggerDuration={0.1}
          className='grid gap-4 md:grid-cols-5'
        >
          {stages.map((stage, i) => (
            <article
              key={stage.title}
              className={
                i === 0
                  ? 'relative flex h-full flex-col rounded-2xl border border-secondary/50 bg-secondary/10 p-6'
                  : 'relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-6 backdrop-blur-xl'
              }
            >
              <span className='mb-3 font-anybody text-sm font-bold text-secondary'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className='mb-2 flex items-center gap-1 font-anybody text-xl font-bold text-white'>
                {stage.title}
                {i < stages.length - 1 && (
                  <ChevronRight className='h-5 w-5 text-white/30 md:hidden' aria-hidden='true' />
                )}
              </h3>
              <p className='font-public text-body-line text-white/60'>{stage.text}</p>
              {stage.links && (
                <ul className='mt-auto grid gap-2 pt-5'>
                  {stage.links.map(link => (
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
              )}
            </article>
          ))}
        </AnimatedSequence>
      </div>
    </section>
  );
}
