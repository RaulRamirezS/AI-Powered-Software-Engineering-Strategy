'use client';

import { motion, type Variants } from 'motion/react';
import { Children, type ReactNode } from 'react';

type Animation = 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';

const offsets: Record<Animation, { x?: number; y?: number }> = {
  fadeInUp: { y: 60 },
  fadeInDown: { y: -60 },
  fadeInLeft: { x: -60 },
  fadeInRight: { x: 60 },
};

type AnimatedSequenceProps = {
  children: ReactNode;
  animation?: Animation;
  duration?: number;
  staggerDuration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
  classNames?: { item?: string };
};

// Port of TIAnimatedSequence from the TEAM design system: staggered scroll-triggered reveal.
export default function AnimatedSequence({
  children,
  animation = 'fadeInUp',
  duration = 0.4,
  staggerDuration = 0.15,
  delay = 0,
  once = true,
  className = '',
  classNames,
}: AnimatedSequenceProps) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDuration, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, ...offsets[animation] },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, amount: 0.15 }}
      className={className}
    >
      {Children.map(children, child => (
        <motion.div variants={item} className={classNames?.item || ''}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
