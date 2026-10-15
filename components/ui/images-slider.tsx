'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type SliderItem = { id: string; src: string; width: number; height: number; alt: string };

// Port of TIImagesSlider from the main site: duplicates the list once and scrolls it
// with the `scroll` keyframes; pauses on hover.
export default function ImagesSlider({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: SliderItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      '--animation-direction',
      direction === 'left' ? 'forwards' : 'reverse'
    );
    containerRef.current.style.setProperty('--animation-duration', duration);
    setStart(true);
  }, [direction, duration]);

  return (
    <div ref={containerRef} className='scroller relative z-20 w-full overflow-hidden'>
      <ul
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          className
        )}
      >
        {[...items, ...items].map((item, i) => (
          <li key={`${item.id}-${i}`} aria-hidden={i >= items.length} className='shrink-0'>
            <Image
              src={item.src}
              width={item.width}
              height={item.height}
              loading='lazy'
              style={{ width: 'auto', height: 'auto' }}
              alt={i >= items.length ? '' : item.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
