import Link from 'next/link';
import content from '@/content/solutions-hub.json';

const SLUGS = [
  'ai-powered-software-engineering',
  'data-readiness',
  'customer-care-technical-support',
  'ai-transformation',
  'ai-discovery-agent-experience',
];

export default function StartSection() {
  const c = content.start;

  return (
    <section id='how-it-starts' className='bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-12 max-w-3xl'>
          <p className='text-overline mb-4 font-public font-semibold text-talent'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-black'>{c.title}</h2>
          <p className='font-public text-body-line leading-relaxed text-dark-gray'>{c.text}</p>
        </div>

        <div className='overflow-x-auto rounded-2xl border border-divider bg-absolute-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]'>
          <table className='w-full min-w-[720px] text-left font-public text-body-line'>
            <thead>
              <tr className='border-b border-divider'>
                {c.headers.map((h, i) => (
                  <th
                    key={h}
                    scope='col'
                    className={
                      i === 1
                        ? 'bg-secondary/15 text-overline px-6 py-4 font-semibold text-black'
                        : 'text-overline px-6 py-4 font-semibold text-dark-gray'
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={row[0]} className='border-b border-divider last:border-b-0'>
                  <th scope='row' className='px-6 py-4 font-semibold text-black'>
                    <Link href={`/solutions/${SLUGS[i]}`} className='hover:text-secondary-dark-2 hover:underline'>
                      {row[0]}
                    </Link>
                  </th>
                  <td className='bg-secondary/[0.06] px-6 py-4 font-medium text-black'>{row[1]}</td>
                  <td className='px-6 py-4 text-dark-gray'>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className='mx-auto mt-12 max-w-3xl text-center font-anybody text-xl font-bold text-black md:text-2xl'>
          {c.closing}
        </p>
      </div>
    </section>
  );
}
