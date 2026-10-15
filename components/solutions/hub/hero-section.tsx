import content from '@/content/solutions-hub.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import { GlowButton } from '@/components/ui/glow-button';
import ImagesSlider from '@/components/ui/images-slider';
import { LIVE_SITE } from '@/lib/site';
import { clientLogos } from '@/lib/client-logos';

export default function HeroSection() {
  const c = content.hero;

  return (
    <section className='relative overflow-hidden bg-black'>
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary/20 blur-[150px]' />
        <div className='absolute bottom-1/4 right-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-talent/10 blur-[180px] delay-1000' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.06]'>
          <defs>
            <pattern id='hub-hero-grid' width='48' height='48' patternUnits='userSpaceOnUse'>
              <path d='M48 0H0V48' fill='none' stroke='#FAF8F9' strokeWidth='1' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#hub-hero-grid)' />
        </svg>
      </div>

      <div className='relative mx-auto w-full max-w-[1280px] px-6 pb-14 pt-20 text-center md:pb-16 md:pt-32'>
        <AnimatedSequence animation='fadeInUp' className='flex flex-col items-center'>
          <p className='text-overline mb-6 inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 font-public font-semibold text-secondary backdrop-blur-sm md:mb-8'>
            {c.overline}
          </p>
          <h1 className='text-title-h3 text-balance mx-auto mb-6 max-w-5xl font-anybody text-[#ffca00]'>
            {c.title}
          </h1>
          <p className='text-pretty mx-auto max-w-3xl font-public text-body-line leading-relaxed text-white/70 md:text-[1.0625rem] md:leading-7'>
            {c.subtitle}
          </p>
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <GlowButton href={`${LIVE_SITE}/contact-us`}>{c.primaryCta}</GlowButton>
            <GlowButton href='#solutions' variant='outline' showArrow={false}>
              {c.secondaryCta}
            </GlowButton>
          </div>
        </AnimatedSequence>
      </div>

      {/* Client logos: same carousel as the home page, logos only */}
      <div id='clients' className='relative w-full bg-primary-dark-3 pt-8 lg:pb-16'>
        <div className='flex w-full items-start overflow-x-hidden pb-8'>
          <ImagesSlider
            items={clientLogos}
            direction='right'
            speed='normal'
            className='flex !items-center space-x-12'
          />
        </div>
      </div>
    </section>
  );
}
