import content from '@/content/data-readiness.json';

export default function AnswersSection() {
  const c = content.answers;
  const items = c.items;

  return (
    <section className='bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 md:mb-20'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance max-w-4xl font-anybody text-white'>
            {c.title}
          </h2>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          {items.map(item => (
            <article
              key={item.q}
              className='rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-8'
            >
              <span className='mb-4 block h-0.5 w-8 bg-secondary' aria-hidden='true' />
              <h3 className='mb-3 font-anybody text-lg font-bold text-white md:text-xl'>
                {item.q}
              </h3>
              <p className='font-public text-body-line leading-relaxed text-white/70'>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
