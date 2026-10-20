import ShaderBackground from '@/components/ui/shader-background';
import content from '@/content/data-readiness.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import { GlowButton } from '@/components/ui/glow-button';

export default function HeroSection() {
  const c = content.hero;
  const proof = c.proof;

  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden bg-black md:min-h-[80vh]'>
      <ShaderBackground />

      <div className='relative mx-auto w-full max-w-[1280px] px-6 py-20 text-center md:py-32'>
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
            <GlowButton href='#contact'>{c.primaryCta}</GlowButton>
            <GlowButton href='#paths' variant='outline' showArrow={false}>
              {c.secondaryCta}
            </GlowButton>
          </div>
          <ul className='mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3'>
            {proof.map(item => (
              <li
                key={item.label}
                className='flex items-center gap-4 rounded-2xl border border-gray/40 bg-white/[0.08] px-6 py-4 text-left shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.12]'
              >
                <span className='shrink-0 font-public text-[26px] font-bold leading-none text-secondary'>
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
