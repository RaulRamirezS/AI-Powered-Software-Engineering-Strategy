import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Anybody, Inconsolata, Public_Sans } from 'next/font/google';
import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';
import { ALLOW_INDEXING, SITE_URL } from '@/lib/site';
import './globals.css';

const anybody = Anybody({ subsets: ['latin'], variable: '--font-anybody', display: 'swap' });
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans', display: 'swap' });
const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TEAM International | Solutions',
    template: '%s',
  },
  description: 'TEAM International solution offerings.',
  icons: { icon: '/favicon.ico' },
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark scroll-smooth'>
      <body
        className={`bg-background font-anybody text-foreground antialiased ${anybody.variable} ${publicSans.variable} ${inconsolata.variable}`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
