// Public URL of this deployment. Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://team-solutions.vercel.app).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.teaminternational.com').replace(/\/$/, '');

// Live TEAM International site, used for navbar/footer links to existing pages.
export const LIVE_SITE = 'https://www.teaminternational.com/en';

// Keep test deployments out of Google until you're ready (avoids duplicate content with the live site).
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
