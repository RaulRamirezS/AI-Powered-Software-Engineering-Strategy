'use client';

import { Briefcase, Fuel, HardHat, HeartPulse, Landmark, Plane, RadioTower, ShoppingBag, Truck } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { CSSProperties, PointerEvent } from 'react';

const BASE_ROTATE_X = 50;
const BASE_ROTATE_Z = -30;

// Reuses the tmt-* keyframes from tailwind.config.ts (float, ripple, dash).
const z = (value: number, delay: number): CSSProperties =>
  ({ '--tmt-z': `${value}px`, animationDelay: `${delay}s` }) as CSSProperties;

// Same order as the industries grid; Oil and Gas closes the mosaic.
const TILES = [
  { icon: RadioTower, label: 'TMT' },
  { icon: HeartPulse, label: 'Health' },
  { icon: Landmark, label: 'Finance' },
  { icon: Plane, label: 'Travel' },
  { icon: ShoppingBag, label: 'Retail' },
  { icon: Truck, label: 'Logistics' },
  { icon: Briefcase, label: 'Business' },
  { icon: HardHat, label: 'Engineering' },
  { icon: Fuel, label: 'Oil & Gas' },
];

/**
 * Decorative isometric "industry mosaic": nine industry tiles floating on a glowing platform,
 * lighting up one after another, with pointer parallax. Purely visual: the page heading and
 * the industries grid carry the real meaning.
 */
export default function IndustriesVisual() {
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
        className='absolute left-1/2 top-1/2 h-[420px] w-[420px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.66] sm:scale-[0.86] lg:scale-[1.05] xl:scale-[1.12]'
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
            className='absolute inset-[2%] rounded-[28px] border border-white/5 bg-secondary/10'
            style={{ transform: 'translateZ(-16px)' }}
          />
          <div
            className='absolute inset-[2%] overflow-hidden rounded-[28px] border border-secondary/30 bg-gradient-to-br from-[#1b1710] via-[#0d0c0d] to-[#0d0c18] shadow-[0_0_60px_rgba(253,190,0,0.15)]'
            style={{ transform: 'translateZ(0)' }}
          >
            <div className='absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-secondary/20 motion-reduce:animate-none' />
            {/* Links between neighbouring tiles: one partner across industries */}
            <svg className='absolute inset-0 h-full w-full' viewBox='0 0 400 400' fill='none'>
              <path
                d='M70 70 H330 V200 H70 V330 H330'
                stroke='#FDBE00'
                strokeOpacity='0.4'
                strokeWidth='2'
                strokeDasharray='6 10'
                className='animate-tmt-dash motion-reduce:animate-none'
              />
              {!reduceMotion && (
                <rect width='8' height='8' rx='2' x='-4' y='-4' fill='#FDBE00' opacity='0.9'>
                  <animateMotion dur='9s' repeatCount='indefinite' path='M70 70 H330 V200 H70 V330 H330' />
                </rect>
              )}
            </svg>
          </div>

          {/* 3 × 3 industry tiles */}
          <div className='absolute inset-[6%] grid grid-cols-3 gap-[6%]' style={{ transformStyle: 'preserve-3d' }}>
            {TILES.map(({ icon: Icon, label }, i) => (
              <div key={label} style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className='animate-tmt-float h-full w-full motion-reduce:animate-none'
                  style={{ ...z(24 + (i % 3) * 14, i * 0.45), transformStyle: 'preserve-3d' }}
                >
                  <div
                    className={`relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border bg-gradient-to-b from-[#16141a] to-[#0a090b] ${
                      i === 4
                        ? 'border-secondary/80 shadow-[0_0_34px_rgba(253,190,0,0.35)]'
                        : 'border-white/15 shadow-[0_0_24px_rgba(94,99,252,0.18)]'
                    }`}
                  >
                    <span
                      className='absolute inset-0 animate-tmt-ripple rounded-2xl border border-secondary/60 motion-reduce:animate-none'
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                    <Icon className={`h-7 w-7 ${i === 4 ? 'text-secondary' : 'text-white/85'}`} />
                    <span className='font-inconsolata text-[10px] uppercase tracking-wider text-white/55'>{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div className='absolute left-[70%] top-[86%]' style={{ transformStyle: 'preserve-3d' }}>
            <div className='animate-tmt-float motion-reduce:animate-none' style={{ ...z(80, 0.6), transformStyle: 'preserve-3d' }}>
              <div className='rounded-xl border border-secondary/60 bg-black/80 px-4 py-2 shadow-[0_0_30px_rgba(253,190,0,0.35)]'>
                <span className='font-anybody text-xl font-bold tracking-wider text-secondary'>9 INDUSTRIES</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
