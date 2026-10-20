import { Clock, Globe2, ShieldCheck } from 'lucide-react';
import content from '@/content/logistics-it-solutions.json';

export default function DeliverySection() {
  const c = content.delivery;

  return (
    <section id='delivery' className='scroll-mt-20 border-b border-white/10 bg-black py-16 md:py-20'>
      <div className='mx-auto grid max-w-[1280px] items-center gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16'>
        <div>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance font-anybody text-white'>{c.title}</h2>
        </div>
        <div>
          <p className='mb-6 font-public text-[1.0625rem] leading-8 text-white/75'>{c.text}</p>
          <ul className='flex flex-wrap gap-3'>
            {[
              { Icon: Globe2, label: 'Medellín → North America' },
              { Icon: Clock, label: 'Ukraine → Europe' },
              { Icon: ShieldCheck, label: 'ISO/IEC 27001:2022' },
            ].map(({ Icon, label }) => (
              <li
                key={label}
                className='inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 font-public text-sm text-white'
              >
                <Icon className='h-4 w-4 text-secondary' aria-hidden='true' />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
