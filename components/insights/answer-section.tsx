import content from '@/content/insights-hub.json';

export default function AnswerSection() {
  const c = content.answer;

  return (
    <section className='bg-white py-20 md:py-24'>
      <div className='mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16'>
        {/* Main direct-answer snippet: plain, crawlable text first on the page */}
        <div>
          <p className='text-overline mb-4 font-public font-semibold text-secondary-dark-2'>{c.overline}</p>
          <h2 className='text-title-h5 text-balance mb-6 font-anybody text-black'>{c.question}</h2>
          <p className='border-l-4 border-secondary pl-6 font-public text-[1.0625rem] leading-8 text-black/80'>
            {c.text}
          </p>
        </div>
        <div className='content-center'>
          <h3 className='text-overline mb-4 font-public font-semibold text-dark-gray'>{c.topicsTitle}</h3>
          <ul className='flex flex-wrap gap-3'>
            {c.topics.map(t => (
              <li
                key={t}
                className='rounded-full border border-divider bg-absolute-white px-4 py-2 font-public text-sm text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
