'use client';

import { ArrowLeftRight, Check, Navigation, Truck } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';

const BASE_ROTATE_X = 50;
const BASE_ROTATE_Z = -30;

// Reuses the tmt-* keyframes from tailwind.config.ts (float, ripple, bar, progress, dash).
const z = (value: number, delay: number): CSSProperties =>
  ({ '--tmt-z': `${value}px`, animationDelay: `${delay}s` }) as CSSProperties;

/**
 * Decorative isometric "freight stack": Freight, EDI and Fleet cards floating on a
 * glowing platform, linked by an animated route with parcels, with pointer parallax.
 * Purely visual: the page heading carries the real meaning.
 */
export default function LogisticsVisual() {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [-1, 1], [BASE_ROTATE_X + 6, BASE_ROTATE_X - 6]);
  const rotateZ = useTransform(sx, [-1, 1], [BASE_ROTATE_Z - 8, BASE_ROTATE_Z + 8]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      aria-hidden='true'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className='relative mx-auto h-[320px] w-full max-w-[600px] sm:h-[420px] lg:h-[520px]'
    >
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[90px]' />

      <div
        className='absolute left-1/2 top-1/2 h-[400px] w-[560px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.58] sm:scale-[0.8] lg:scale-[1] xl:scale-[1.08]'
        style={{ perspective: '1400px' }}
      >
        <motion.div
          className='relative h-full w-full'
          style={{
            transformStyle: 'preserve-3d',
            rotateX: reduceMotion ? BASE_ROTATE_X : rotateX,
            rotateZ: reduceMotion ? BASE_ROTATE_Z : rotateZ,
          }}
        >
          {/* Platform */}
          <div
            className='absolute inset-[6%] rounded-[28px] border border-white/5 bg-secondary/10'
            style={{ transform: 'translateZ(-16px)' }}
          />
          <div
            className='absolute inset-[6%] overflow-hidden rounded-[28px] border border-secondary/30 bg-gradient-to-br from-[#1b1710] via-[#0d0c0d] to-[#0d0c18] shadow-[0_0_60px_rgba(253,190,0,0.15)]'
            style={{ transform: 'translateZ(0)' }}
          >
            <svg className='absolute inset-0 h-full w-full opacity-[0.12]'>
              <defs>
                <pattern id='logistics-plate-grid' width='32' height='32' patternUnits='userSpaceOnUse'>
                  <path d='M32 0H0V32' fill='none' stroke='#FDBE00' strokeWidth='1' />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#logistics-plate-grid)' />
            </svg>

            <div className='absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-secondary/25 motion-reduce:animate-none' />
            <div className='absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-[spin_80s_linear_infinite_reverse] rounded-full border border-talent/20 motion-reduce:animate-none' />

            {/* Route: freight → EDI → fleet */}
            <svg className='absolute inset-0 h-full w-full' viewBox='0 0 476 336' fill='none'>
              <path
                d='M90 250 C 150 250, 170 170, 238 170 S 330 100, 390 100'
                stroke='#FDBE00'
                strokeOpacity='0.55'
                strokeWidth='2'
                strokeDasharray='6 10'
                className='animate-tmt-dash motion-reduce:animate-none'
              />
              <path
                d='M90 250 C 150 250, 170 170, 238 170 S 330 100, 390 100'
                stroke='#5E63FC'
                strokeOpacity='0.35'
                strokeWidth='6'
                className='blur-[3px]'
              />
              {/* Parcels travelling along the route */}
              {!reduceMotion &&
                [0, 1.4, 2.8].map(delay => (
                  <rect key={delay} width='10' height='10' rx='2' x='-5' y='-5' fill='#FDBE00' opacity='0.9'>
                    <animateMotion
                      dur='4.2s'
                      begin={`${delay}s`}
                      repeatCount='indefinite'
                      path='M90 250 C 150 250, 170 170, 238 170 S 330 100, 390 100'
                    />
                  </rect>
                ))}
            </svg>
          </div>

          {/* 01 Freight */}
          <div className='absolute left-[6%] top-[42%] h-[230px] w-[160px]' style={{ transformStyle: 'preserve-3d' }}>
            <div className='animate-tmt-float h-full w-full motion-reduce:animate-none' style={{ ...z(34, 0), transformStyle: 'preserve-3d' }}>
              <Card index='01' icon={<Truck className='h-4 w-4' />} title='Freight' tone='indigo'>
                <div className='relative mx-auto my-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-talent/50 bg-talent/20'>
                  <span className='absolute inset-0 animate-tmt-ripple rounded-2xl border border-talent/60 motion-reduce:animate-none' />
                  <Truck className='h-8 w-8 text-talent-light-3' />
                </div>
                <p className='text-center font-public text-[10px] leading-snug text-white/60'>Loads. Tenders.</p>
                {/* Load board lines */}
                <div className='mx-auto mt-3 w-[78%] space-y-1 rounded-md bg-white/10 p-2'>
                  {[0.9, 0.6, 0.75].map((w, i) => (
                    <span
                      key={i}
                      className='block h-1 animate-pulse rounded-full bg-talent-light-2/80 motion-reduce:animate-none'
                      style={{ width: `${w * 100}%`, animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 02 EDI */}
          <div className='absolute left-[34%] top-[24%] h-[230px] w-[170px]' style={{ transformStyle: 'preserve-3d' }}>
            <div className='animate-tmt-float h-full w-full motion-reduce:animate-none' style={{ ...z(62, 1.2), transformStyle: 'preserve-3d' }}>
              <Card index='02' icon={<ArrowLeftRight className='h-4 w-4' />} title='EDI' tone='neutral'>
                <div className='relative mx-auto my-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10'>
                  <span className='absolute inset-0 animate-tmt-ripple rounded-2xl border border-white/40 [animation-delay:0.8s] motion-reduce:animate-none' />
                  <ArrowLeftRight className='h-7 w-7 text-white/90' />
                </div>
                <p className='text-center font-public text-[10px] leading-snug text-white/60'>Carriers. Partners.</p>
                <div className='mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10'>
                  <div className='h-full animate-tmt-progress rounded-full bg-gradient-to-r from-secondary to-secondary-light-3 motion-reduce:animate-none' />
                </div>
                <div className='mt-2 flex justify-between font-inconsolata text-[8px] text-white/40'>
                  <span>204</span>
                  <span>214 · 210</span>
                </div>
              </Card>
            </div>
          </div>

          {/* 03 Fleet */}
          <div className='absolute left-[66%] top-[2%] h-[210px] w-[150px]' style={{ transformStyle: 'preserve-3d' }}>
            <div className='animate-tmt-float h-full w-full motion-reduce:animate-none' style={{ ...z(96, 2.4), transformStyle: 'preserve-3d' }}>
              <Card index='03' icon={<Navigation className='h-4 w-4' />} title='Fleet' tone='gold'>
                <div className='relative mx-auto my-2 flex h-14 w-14 items-center justify-center'>
                  <span className='absolute inset-0 animate-tmt-ripple rounded-full border border-secondary/70 motion-reduce:animate-none' />
                  <span className='absolute inset-0 animate-tmt-ripple rounded-full border border-secondary/70 [animation-delay:1s] motion-reduce:animate-none' />
                  <span className='flex h-11 w-11 items-center justify-center rounded-full border border-secondary/60 bg-secondary/20'>
                    <Navigation className='h-6 w-6 text-secondary' />
                  </span>
                </div>
                <ul className='mt-2 space-y-1.5 font-public text-[10px] text-white/75'>
                  {['Drivers', 'Tracking', 'Delivery'].map(item => (
                    <li key={item} className='flex items-center gap-1.5'>
                      <Check className='h-3 w-3 text-secondary' />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Badge */}
          <div className='absolute left-[62%] top-[74%]' style={{ transformStyle: 'preserve-3d' }}>
            <div className='animate-tmt-float motion-reduce:animate-none' style={{ ...z(54, 0.6), transformStyle: 'preserve-3d' }}>
              <div className='rounded-xl border border-secondary/60 bg-black/80 px-4 py-2 shadow-[0_0_30px_rgba(253,190,0,0.35)]'>
                <span className='font-anybody text-xl font-bold tracking-wider text-secondary'>FREIGHT</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const tones = {
  indigo: { border: 'border-talent/50', glow: 'shadow-[0_0_28px_rgba(94,99,252,0.25)]', dot: 'bg-talent' },
  neutral: { border: 'border-white/25', glow: 'shadow-[0_0_28px_rgba(250,248,249,0.12)]', dot: 'bg-white' },
  gold: { border: 'border-secondary/80', glow: 'shadow-[0_0_34px_rgba(253,190,0,0.35)]', dot: 'bg-secondary' },
} as const;

function Card({
  index,
  icon,
  title,
  tone,
  children,
}: {
  index: string;
  icon: ReactNode;
  title: string;
  tone: keyof typeof tones;
  children: ReactNode;
}) {
  const t = tones[tone];
  return (
    <div className={`flex h-full w-full flex-col rounded-2xl border bg-gradient-to-b from-[#16141a] to-[#0a090b] p-3.5 ${t.border} ${t.glow}`}>
      <div className='mb-2 flex items-start justify-between text-white/80'>
        {icon}
        <span className='flex items-center gap-1 font-inconsolata text-[9px] text-white/50'>
          {index}
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
        </span>
      </div>
      <p className='font-anybody text-[15px] font-semibold leading-tight text-white'>{title}</p>
      {children}
    </div>
  );
}
