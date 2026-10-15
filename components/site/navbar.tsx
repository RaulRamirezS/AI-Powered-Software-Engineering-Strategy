'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import TeamLogo from '@/components/site/team-logo';
import { LIVE_SITE } from '@/lib/site';
import { solutions } from '@/lib/solutions';
import { cn } from '@/lib/utils';

// Mirrors TINavbarNew from the main site: sticky dark bar, uppercase Anybody links,
// yellow active underline, white "Contact" button that turns yellow on hover.
type NavItem = { label: string; href: string; external?: boolean; dropdown?: 'solutions' };

const navItems: NavItem[] = [
  { label: 'Home', href: `${LIVE_SITE}/`, external: true },
  { label: 'Solutions', href: '/solutions', dropdown: 'solutions' },
  { label: 'Industries', href: `${LIVE_SITE}/industries`, external: true },
  { label: 'Careers', href: `${LIVE_SITE}/careers`, external: true },
  { label: 'About', href: `${LIVE_SITE}/about-us`, external: true },
  { label: 'Insights', href: `${LIVE_SITE}/insights`, external: true },
  { label: 'Ecosystem', href: `${LIVE_SITE}/ecosystem`, external: true },
];

function SolutionsDropdown({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className='w-[420px] rounded-b-xl border border-white/10 bg-primary-dark-3 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)]'>
      <p className='text-overline mb-4 font-inconsolata text-secondary'>Solutions</p>
      <Link
        href='/solutions'
        onClick={onNavigate}
        className='mb-2 block rounded-md border border-white/10 px-3 py-2 font-public text-sm font-semibold text-secondary transition-colors hover:bg-white/10'
      >
        All solutions →
      </Link>
      <ul className='flex flex-col gap-1'>
        {solutions.map(s => (
          <li key={s.href}>
            {s.live ? (
              <Link
                href={s.href}
                onClick={onNavigate}
                className='block rounded-md px-3 py-2 font-public text-sm text-white transition-colors hover:bg-white/10 hover:text-secondary'
              >
                {s.label}
              </Link>
            ) : (
              <span className='flex items-center justify-between gap-3 rounded-md px-3 py-2 font-public text-sm text-white/40'>
                {s.label}
                <span className='rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider'>
                  Soon
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (item: NavItem) => !item.external && pathname.startsWith('/solutions');

  return (
    <header className='sticky top-0 z-40 w-full bg-primary-dark-3 text-white'>
      <div className='px-section mx-auto flex h-16 w-full max-w-screen-2xl flex-nowrap items-center justify-between gap-4'>
        <button
          type='button'
          className='flex-shrink-0 lg:hidden'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <a href={`${LIVE_SITE}/`} className='flex-shrink-0 leading-[0]' title='Home'>
          <TeamLogo className='h-9 w-auto md:h-12' />
        </a>

        <nav className='hidden flex-1 items-center justify-end gap-4 lg:flex' aria-label='Main'>
          {navItems.map(item => {
            const active = isActive(item);
            const linkClass = 'text-sm uppercase';
            return (
              <div
                key={item.label}
                className={cn(
                  'relative flex h-16 items-center font-anybody',
                  active &&
                    'text-secondary after:absolute after:bottom-3 after:left-0 after:right-0 after:h-[2px] after:bg-secondary'
                )}
                onMouseEnter={item.dropdown ? () => setDropdownOpen(true) : undefined}
                onMouseLeave={item.dropdown ? () => setDropdownOpen(false) : undefined}
              >
                {item.dropdown ? (
                  <>
                    <button
                      type='button'
                      className={cn('flex items-center gap-2 py-4', linkClass)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup='true'
                      onClick={() => setDropdownOpen(prev => !prev)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')}
                      />
                    </button>
                    <div
                      className={cn(
                        'absolute left-1/2 top-16 -translate-x-1/2',
                        dropdownOpen ? 'block' : 'hidden'
                      )}
                    >
                      <SolutionsDropdown onNavigate={() => setDropdownOpen(false)} />
                    </div>
                  </>
                ) : (
                  <a className={cn('w-full px-2 py-4 xl:p-4', linkClass)} href={item.href}>
                    {item.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <span className='hidden font-anybody text-sm uppercase text-white/70 lg:inline'>EN</span>
        <a
          href='#contact'
          className='ti-button inline-flex h-10 items-center justify-center bg-white px-3 py-2 text-black transition-colors hover:bg-secondary active:bg-secondary-dark-1 md:px-6 lg:px-8'
        >
          Contact
        </a>
      </div>

      {menuOpen && (
        <div className='fixed inset-0 top-16 z-30 w-full overflow-y-auto bg-primary-dark-3 lg:hidden'>
          <nav className='px-section flex flex-col py-4' aria-label='Mobile'>
            {navItems.map(item =>
              item.dropdown ? (
                <div key={item.label} className='border-b border-white/10 py-3'>
                  <p className='mb-2 font-anybody text-lg uppercase text-secondary'>{item.label}</p>
                  <Link
                    href='/solutions'
                    onClick={() => setMenuOpen(false)}
                    className='block py-2 font-public text-sm font-semibold text-secondary'
                  >
                    All solutions →
                  </Link>
                  <ul className='flex flex-col gap-1'>
                    {solutions.map(s => (
                      <li key={s.href}>
                        {s.live ? (
                          <Link
                            href={s.href}
                            onClick={() => setMenuOpen(false)}
                            className='block py-2 font-public text-sm text-white'
                          >
                            {s.label}
                          </Link>
                        ) : (
                          <span className='block py-2 font-public text-sm text-white/40'>
                            {s.label} · Soon
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className='border-b border-white/10 py-4 font-anybody text-lg uppercase text-white'
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
