import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import TeamLogo from '@/components/site/team-logo';
import { LIVE_SITE } from '@/lib/site';
import { solutions } from '@/lib/solutions';

const social = [
  { title: 'LinkedIn', href: 'https://www.linkedin.com/company/team-international', Icon: Linkedin },
  { title: 'Instagram', href: 'https://instagram.com/teamintl.global', Icon: Instagram },
  { title: 'Facebook', href: 'https://www.facebook.com/teamintl', Icon: Facebook },
  { title: 'YouTube', href: 'https://www.youtube.com/@teaminternationalglobal', Icon: Youtube },
];

const company = [
  { label: 'About', href: `${LIVE_SITE}/about-us` },
  { label: 'Industries', href: `${LIVE_SITE}/industries` },
  { label: 'Careers', href: `${LIVE_SITE}/careers` },
  { label: 'Insights', href: `${LIVE_SITE}/insights` },
  { label: 'Contact Us', href: `${LIVE_SITE}/contact-us` },
  { label: 'Privacy Policy and Terms', href: `${LIVE_SITE}/privacy-policy` },
];

// Mirrors TIFooter from the main site (bg-primary-dark-2, logo, email, address, social, copyright).
export default function Footer() {
  return (
    <footer className='px-section bg-primary-dark-2 py-10 text-white md:py-12 lg:py-15'>
      <div className='mx-auto w-full max-w-screen-2xl'>
        <div className='grid gap-10 md:grid-cols-2'>
          <div>
            <p className='mb-4 font-inconsolata text-xs uppercase tracking-widest text-secondary'>
              Solutions
            </p>
            <ul className='flex flex-col gap-2 font-public text-sm'>
              {solutions.map(s => (
                <li key={s.href} className={s.live ? 'text-white' : 'text-white/40'}>
                  {s.live ? (
                    <a href={s.href} className='hover:text-secondary'>
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='mb-4 font-inconsolata text-xs uppercase tracking-widest text-secondary'>
              Company
            </p>
            <ul className='flex flex-col gap-2 font-public text-sm'>
              {company.map(c => (
                <li key={c.label}>
                  <a href={c.href} className='hover:text-secondary'>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className='my-10 w-full border-primary' />

        <div className='flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-between'>
          <a href={`${LIVE_SITE}/`} title='Home'>
            <TeamLogo className='h-10 w-auto' />
          </a>
          <div className='text-center font-public text-sm md:text-left'>
            <p>sales@teaminternational.com</p>
            <p className='pt-1'>1145 TownPark Avenue Suite 2201</p>
            <p className='pt-1'>Lake Mary, FL 32746</p>
          </div>
          <div className='text-center md:text-left'>
            <p className='font-inconsolata text-xs uppercase leading-5 tracking-widest'>Follow us</p>
            <div className='flex gap-4 pt-3'>
              {social.map(({ title, href, Icon }) => (
                <a key={href} href={href} target='_blank' rel='noopener noreferrer' title={title}>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                  <span className='sr-only'>{title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className='mt-6 border-primary' />
        <p className='pt-10 text-center font-public text-primary-light-4'>
          Copyright © TEAM International Services Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
