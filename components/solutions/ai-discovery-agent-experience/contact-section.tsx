import { ArrowRight, ScanSearch, BarChart3, Map } from 'lucide-react';
import content from '@/content/ai-discovery-agent-experience.json';
import { LIVE_SITE } from '@/lib/site';

const ICONS = [ScanSearch, BarChart3, Map];

// Stand-in for TIContact: links to the live contact form so leads land in the existing CRM flow.
export default function ContactSection() {
  const c = content.contact;
  const deliverables = c.deliverables.map((label, i) => ({ Icon: ICONS[i] ?? Map, label }));
  return (
    <section id='contact' className='relative scroll-mt-16 overflow-hidden bg-black py-20 md:py-28'>
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[140px]' />
        <div className='absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-talent/10 blur-[140px]' />
      </div>
      <div className='relative mx-auto max-w-[1280px] px-6'>
        <div className='rounded-3xl border border-white/20 bg-white/[0.06] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-14'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>Get started</p>
          <h2 className='text-title-h4 mb-5 max-w-3xl text-balance font-anybody text-white'>
            {c.title}
          </h2>
          <p className='mb-8 max-w-2xl font-public text-body-line leading-relaxed text-white/70'>
            {c.subtitle}
          </p>
          <ul className='mb-10 flex flex-wrap gap-3'>
            {deliverables.map(({ Icon, label }) => (
              <li
                key={label}
                className='inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 font-public text-sm text-white'
              >
                <Icon className='h-4 w-4 text-secondary' aria-hidden='true' />
                {label}
              </li>
            ))}
          </ul>
          <a
            href={`${LIVE_SITE}/contact-us`}
            className='ti-button group inline-flex items-center gap-2 bg-secondary px-8 py-3 text-secondary-accent transition-colors hover:bg-secondary-light-1 active:bg-secondary-dark-1'
          >
            Talk to our team
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>
      </div>
    </section>
  );
}
