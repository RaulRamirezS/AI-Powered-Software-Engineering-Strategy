import { LIVE_SITE } from '@/lib/site';

// Industry pages, in the same order as the main site's Industries dropdown.
// `internal: true` = the refactored page lives in this project; others link to the live site.
export type Industry = { label: string; href: string; internal: boolean };

export const industries: Industry[] = [
  {
    label: 'Technology, Media, and Telecommunications',
    href: '/industries/telecom-it-solutions',
    internal: true,
  },
  { label: 'Healthcare & Wellness', href: '/industries/healthcare-it-solutions', internal: true },
  { label: 'Finances & Banking', href: '/industries/finance-it-solutions', internal: true },
  { label: 'Travel & Hospitality', href: `${LIVE_SITE}/industries/it-solutions-travel-hospitality`, internal: false },
  { label: 'Retail & Distribution', href: '/industries/retail-managed-it', internal: true },
  { label: 'Logistics and Transportation', href: '/industries/logistics-it-solutions', internal: true },
  { label: 'Business Services', href: '/industries/business-services', internal: true },
  { label: 'Engineering Staffing', href: `${LIVE_SITE}/industries/engineering-staffing`, internal: false },
  { label: 'Oil and Gas Digital Solutions', href: 'https://digitaloilandgas.solutions/', internal: false },
];
