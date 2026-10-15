import content from '@/content/ai-discovery-agent-experience.json';
import { Code2, BadgeCheck, LineChart, MonitorCheck, Globe2, Sparkles, Award, TrendingUp } from 'lucide-react';
import AnimatedSequence from '@/components/ui/animated-sequence';

const ICONS = [Code2, BadgeCheck, LineChart, MonitorCheck, Globe2, Sparkles];

export default function WhySection() {
  const c = content.why;
  const items = c.items;
  const headers = c.compare.headers;
  const rows = c.compare.rows;
  const proof = content.proof;

  return (
    <section className='bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 md:mb-20'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary-dark-2'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 text-balance max-w-4xl font-anybody text-black'>
            {c.title}
          </h2>
        </div>

        <AnimatedSequence
          animation='fadeInUp'
          staggerDuration={0.08}
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
        >
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <article
                key={item.title}
                className='group h-full rounded-2xl border border-divider bg-absolute-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]'
              >
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary-dark-2 transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </div>
                <h3 className='mb-2 font-anybody text-lg font-bold text-black'>{item.title}</h3>
                <p className='font-public text-body-line text-dark-gray'>{item.text}</p>
              </article>
            );
          })}
        </AnimatedSequence>

        {/* Scrunch customer results, labeled as vendor-published */}
        <div id='proof' className='mt-16 scroll-mt-24'>
          <h3 className='text-title-h5 mb-3 font-anybody text-black'>{proof.title}</h3>
          <p className='mb-8 max-w-3xl font-public text-body-line text-dark-gray'>{proof.intro}</p>
          <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {proof.items.map(item => (
              <li
                key={item.client}
                className='flex items-start gap-4 rounded-2xl border border-divider bg-absolute-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
              >
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-talent/15 text-talent'>
                  <TrendingUp className='h-5 w-5' aria-hidden='true' />
                </span>
                <span>
                  <span className='block font-anybody text-base font-bold text-black'>
                    {item.client}
                  </span>
                  <span className='font-public text-sm text-dark-gray'>{item.scope}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-16'>
          <h3 className='text-title-h5 mb-6 font-anybody text-black'>{c.compare.title}</h3>
          <div className='overflow-x-auto rounded-2xl border border-divider bg-absolute-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]'>
            <table className='w-full min-w-[640px] text-left font-public text-body-line'>
              <thead>
                <tr className='border-b border-divider'>
                  {headers.map((h, i) => (
                    <th
                      key={h}
                      scope='col'
                      className={
                        i === 2
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
                {rows.map(row => (
                  <tr key={row[0]} className='border-b border-divider last:border-b-0'>
                    <th scope='row' className='px-6 py-4 font-semibold text-black'>
                      {row[0]}
                    </th>
                    <td className='px-6 py-4 text-dark-gray'>{row[1]}</td>
                    <td className='bg-secondary/[0.06] px-6 py-4 font-medium text-black'>
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
