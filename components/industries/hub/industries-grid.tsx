import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Fuel,
  HardHat,
  HeartPulse,
  Landmark,
  MessageSquare,
  Plane,
  RadioTower,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import content from '@/content/industries-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';

const ICONS: Record<string, typeof Plane> = {
  telecom: RadioTower,
  healthcare: HeartPulse,
  finance: Landmark,
  travel: Plane,
  retail: ShoppingBag,
  logistics: Truck,
  business: Briefcase,
  engineering: HardHat,
  oilgas: Fuel,
};

const card =
  'group flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]';
const iconBox =
  'mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black';

// Card anchor text is the industry name (never another page's primary keyword).
export default function IndustriesGrid() {
  const c = content.grid;
  const ext = c.external;
  const ExtIcon = ICONS[ext.key] ?? Fuel;

  return (
    <section id='industries' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 max-w-4xl md:mb-16'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>{c.overline}</p>
          <h2 className='text-title-h4 text-balance mb-5 font-anybody text-white'>{c.title}</h2>
          <p className='max-w-3xl font-public text-body-line leading-relaxed text-white/60'>{c.intro}</p>
        </div>

        <AnimatedSequence animation='fadeInUp' staggerDuration={0.06} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {c.items.map(item => {
            const Icon = ICONS[item.key] ?? Briefcase;
            return (
              <Link key={item.href} href={item.href} className={card}>
                <span className={iconBox}>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </span>
                <h3 className='mb-3 font-anybody text-xl font-bold text-white'>{item.name}</h3>
                <p className='mb-5 font-public text-body-line text-white/70'>{item.text}</p>
                <p className='mb-6 flex items-start gap-2 font-public text-sm text-white'>
                  <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-secondary' aria-hidden='true' />
                  <span>
                    <span className='font-semibold text-secondary'>{c.proofLabel}: </span>
                    {item.proof}
                  </span>
                </p>
                <span className='ti-button mt-auto inline-flex items-center gap-2 text-secondary group-hover:text-secondary-light-1'>
                  {c.cta} {item.name}
                  <ArrowRight className='h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1' />
                </span>
              </Link>
            );
          })}

          <a href={ext.href} target='_blank' rel='noopener noreferrer' className={card}>
            <span className={iconBox}>
              <ExtIcon className='h-6 w-6' aria-hidden='true' />
            </span>
            <h3 className='mb-3 font-anybody text-xl font-bold text-white'>{ext.name}</h3>
            <p className='mb-6 font-public text-body-line text-white/70'>{ext.text}</p>
            <span className='ti-button mt-auto inline-flex items-center gap-2 text-secondary group-hover:text-secondary-light-1'>
              {ext.cta}
              <ArrowUpRight className='h-4 w-4 shrink-0' />
            </span>
          </a>
        </AnimatedSequence>

        {/* Helper banner routes visitors from unlisted industries to an expert */}
        <a
          href='#contact'
          className='group mt-6 flex flex-col gap-5 rounded-2xl border border-secondary/50 bg-secondary/10 p-7 transition-all duration-300 hover:-translate-y-1 md:flex-row md:items-center md:p-8'
        >
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-absolute-black'>
            <MessageSquare className='h-6 w-6' aria-hidden='true' />
          </span>
          <span className='flex-1'>
            <span className='mb-2 block font-anybody text-xl font-bold text-secondary'>{c.helper.title}</span>
            <span className='block font-public text-body-line text-white/70'>{c.helper.text}</span>
          </span>
          <span className='ti-button inline-flex items-center gap-2 text-white'>
            {c.helper.cta}
            <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
          </span>
        </a>
      </div>
    </section>
  );
}
