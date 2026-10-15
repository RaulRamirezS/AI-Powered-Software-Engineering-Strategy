import { Bot, CheckCircle2, MessageSquare } from 'lucide-react';
import content from '@/content/data-readiness.json';

const BARS = [
  { label: 'Industrial Parts', value: 84 },
  { label: 'Field Services', value: 52 },
  { label: 'Spare Kits', value: 33 },
];

export default function FastTrackSection() {
  const c = content.fastTrack;

  return (
    <section
      id='fast-track'
      className='relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-28'
    >
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[140px]' />
      </div>
      <div className='relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16'>
        <div>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='mb-8 font-public text-body-line leading-relaxed text-white/70'>{c.text}</p>
          <ul className='grid gap-3'>
            {c.bullets.map(b => (
              <li key={b} className='flex items-start gap-3 font-public text-body-line text-white'>
                <CheckCircle2
                  className='mt-0.5 h-5 w-5 shrink-0 text-secondary'
                  aria-hidden='true'
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustrative natural language query exchange */}
        <figure className='rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-8'>
          <div className='flex justify-end'>
            <p className='max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-5 py-3 font-public text-body-line font-semibold text-secondary-accent'>
              Which product lines lost margin this quarter?
            </p>
          </div>
          <div className='mt-5 max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.12] p-5'>
            <p className='mb-4 flex items-start gap-2 font-public text-body-line text-white'>
              <MessageSquare
                className='mt-1 h-4 w-4 shrink-0 text-talent-light-2'
                aria-hidden='true'
              />
              <span>
                Three product lines, led by <strong>Industrial Parts</strong> (−4.2 pts).
              </span>
            </p>
            <div className='grid gap-2'>
              {BARS.map(bar => (
                <div key={bar.label} className='flex items-center gap-3'>
                  <span className='w-32 shrink-0 font-public text-xs text-white/70'>
                    {bar.label}
                  </span>
                  <span
                    className='h-2.5 rounded-full bg-talent-light-2'
                    style={{ width: `${bar.value}%` }}
                    aria-hidden='true'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-5 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-public text-sm text-white/70'>
            <Bot className='h-4 w-4 text-secondary' aria-hidden='true' />
            Turn this question into a no-code AI agent that reports weekly
          </div>
          <figcaption className='mt-4 font-public text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40'>
            Illustrative example
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
