import content from '@/content/insights-hub.json';

// E-E-A-T: who writes the content, with verifiable points only.
export default function AuthorsSection() {
  const c = content.authors;

  return (
    <section className='bg-white py-20 md:py-24'>
      <div className='mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16'>
        <div>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-black'>{c.title}</h2>
          <p className='font-public text-[1.0625rem] leading-8 text-black/80'>{c.text}</p>
        </div>
        <ul className='grid content-center gap-4'>
          {c.points.map(f => (
            <li
              key={f.label}
              className='flex items-center gap-5 rounded-2xl border border-divider bg-absolute-white px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            >
              <span className='w-28 shrink-0 font-anybody text-3xl font-bold text-secondary-dark-2'>{f.value}</span>
              <span className='font-public text-body-line text-dark-gray'>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
