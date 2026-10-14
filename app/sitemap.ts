import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { solutions } from '@/lib/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  return solutions
    .filter(s => s.live)
    .map(s => ({ url: `${SITE_URL}${s.href}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }));
}
