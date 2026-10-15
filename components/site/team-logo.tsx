import Image from 'next/image';

type TeamLogoProps = {
  className?: string;
  /** 'dark' = white text for dark backgrounds (navbar, footer); 'light' = black text for light backgrounds. */
  variant?: 'dark' | 'light';
};

export default function TeamLogo({ className = '', variant = 'dark' }: TeamLogoProps) {
  return (
    <Image
      src={variant === 'dark' ? '/team-international-logo-dark-bg.png' : '/team-international-logo-light-bg.png'}
      alt='TEAM International'
      width={1920}
      height={665}
      priority
      className={className}
    />
  );
}
