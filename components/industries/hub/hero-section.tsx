import ShaderBackground from '@/components/ui/shader-background';
import { INDUSTRIES_MOSAIC_FRAGMENT } from '@/components/ui/shaders/industries-mosaic';
import content from '@/content/industries-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import { GlowButton } from '@/components/ui/glow-button';

import IndustriesVisual from './industries-visual';

export default function HeroSection() {
  const c = content.hero;

  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden bg-black md:min-h-[80vh]'>
      <ShaderBackground fragmentSource={INDUSTRIES_MOSAIC_FRAGMENT} />

      <div className='relative mx-auto w-full max-w-[1280px] px-6 py-20 md:py-28'>
        <div className='grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6'>
          <AnimatedSequence
            animation='fadeInUp'
            className='flex flex-col items-center text-center lg:items-start lg:text-left'
          >
            <p className='text-overline mb-6 inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 font-public font-semibold text-secondary backdrop-blur-sm md:mb-8'>
              {c.overline}
            </p>
            {/* The H1 keeps the current page name and adds the primary keyword as a second line */}
            <h1 className='mb-6 max-w-5xl font-anybody'>
              <span className='text-title-h3 text-balance block text-[#ffca00]'>{c.name}</span>
              <span className='text-title-h5 text-balance mt-3 block text-white'>{c.title}</span>
            </h1>
            <p className='text-pretty max-w-xl font-public text-body-line leading-relaxed text-white/70 md:text-[1.0625rem] md:leading-7'>
              {c.subtitle}
            </p>
            <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start'>
              <GlowButton href='#contact'>{c.primaryCta}</GlowButton>
              <GlowButton href='#industries' variant='outline' showArrow={false}>
                {c.secondaryCta}
              </GlowButton>
            </div>
          </AnimatedSequence>

          <IndustriesVisual />
        </div>

        <AnimatedSequence animation='fadeInUp' delay={0.3} className='mt-12 md:mt-16'>
          <ul className='grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
            {c.proof.map(item => (
              <li
                key={item.label}
                className='flex items-center gap-4 rounded-2xl border border-gray/40 bg-white/[0.08] px-6 py-4 text-left shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.12]'
              >
                <span className='shrink-0 font-public text-[22px] font-bold leading-none text-secondary'>
                  {item.value}
                </span>
                <span className='font-public text-xs leading-snug text-white/60'>{item.label}</span>
              </li>
            ))}
          </ul>
        </AnimatedSequence>
      </div>
    </section>
  );
}
