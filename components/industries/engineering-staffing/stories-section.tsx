import { ArrowRight } from 'lucide-react';
import content from '@/content/engineering-staffing.json';
import { LIVE_SITE } from '@/lib/site';

// The live page shows a slider of all case studies loaded from the main site's CMS.
// Until the new case studies are ready, this section links to that list instead.
export default function StoriesSection() {
  const c = content.stories;

  return (
    <section id='success-stories' className='scroll-mt-20 bg-primary-dark-2 py-16 md:py-20'>
      <div className='mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center'>
        <h2 className='text-title-h4 font-anybody text-white'>{c.title}</h2>
        <a
          href={`${LIVE_SITE}/case-studies`}
          className='ti-button group inline-flex items-center gap-2 bg-secondary px-6 py-3 text-secondary-accent transition-colors hover:bg-secondary-light-1'
        >
          {c.buttonText}
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </a>
      </div>
    </section>
  );
}
