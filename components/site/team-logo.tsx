import Image from 'next/image';

export default function TeamLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src='/team-international-logo.svg'
      alt='TEAM International'
      width={113}
      height={34}
      priority
      className={className}
    />
  );
}
