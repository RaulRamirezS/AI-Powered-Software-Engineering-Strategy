import { ArrowRight } from 'lucide-react';
import content from '@/content/industries-hub.json';
import { LIVE_SITE } from '@/lib/site';

// Links to the live contact form so leads keep flowing into the existing CRM.
export default function ContactSection() {
  const c = content.contact;
  return (
    <section id='contact' className='relative scroll-mt-16 overflow-hidden bg-black py-20 md:py-28'>
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[140px]' />
        <div className='absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-talent/10 blur-[140px]' />
      </div>
      <div className='relative mx-auto max-w-[1280px] px-6'>
        <div className='rounded-3xl border border-white/20 bg-white/[0.06] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-14'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>Get started</p>
          <h2 className='text-title-h4 text-balance mx-auto mb-5 max-w-3xl font-anybody text-white'>{c.title}</h2>
          <p className='mx-auto mb-10 max-w-2xl font-public text-body-line leading-relaxed text-white/70'>
            {c.subtitle}
          </p>
          <a
            href={`${LIVE_SITE}/contact-us`}
            className='ti-button group inline-flex items-center gap-2 bg-secondary px-8 py-3 text-secondary-accent transition-colors hover:bg-secondary-light-1 active:bg-secondary-dark-1'
          >
            {c.cta}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>
      </div>
    </section>
  );
}
