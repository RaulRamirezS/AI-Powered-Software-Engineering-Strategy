import content from '@/content/industries-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

// Plain, crawlable HowTo steps (mirrored in the HowTo JSON-LD in page.tsx).
export default function StepsSection() {
  const c = content.steps;

  return (
    <section id='how-it-works' className='scroll-mt-20 bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 max-w-3xl'>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-black'>{c.title}</h2>
          <p className='font-public text-body-line leading-relaxed text-dark-gray'>{c.intro}</p>
        </div>
        <AnimatedSequence animation='fadeInUp' staggerDuration={0.1} className='grid gap-6 md:grid-cols-3'>
          {c.items.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className='flex h-full scroll-mt-24 flex-col rounded-2xl border border-divider bg-absolute-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            >
              <span className='mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-anybody text-lg font-bold text-absolute-black'>
                {i + 1}
              </span>
              <h3 className='mb-3 font-anybody text-xl font-bold text-black'>{s.title}</h3>
              <p className='mb-5 font-public text-body-line text-dark-gray'>{s.text}</p>
              <p className='mt-auto border-t border-divider pt-4 font-public text-sm text-black'>
                <span className='font-semibold'>{c.outcomeLabel}: </span>
                {s.outcome}
              </p>
            </article>
          ))}
        </AnimatedSequence>
      </div>
    </section>
  );
}
