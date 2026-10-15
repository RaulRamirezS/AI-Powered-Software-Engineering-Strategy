import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { solutions } from '@/lib/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = solutions
    .filter(s => s.live)
    .map(s => ({ url: `${SITE_URL}${s.href}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }));
  return [{ url: `${SITE_URL}/solutions`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 }, ...pages];
}
