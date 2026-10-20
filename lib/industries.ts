import { LIVE_SITE } from '@/lib/site';

// Industry pages, in the same order as the main site's Industries dropdown.
// `internal: true` = the refactored page lives in this project; others link to the live site.
export type Industry = { label: string; href: string; internal: boolean; newTab?: boolean };

export const industries: Industry[] = [
  {
    label: 'Technology, Media, and Telecommunications',
    href: '/industries/telecom-it-solutions',
    internal: true,
  },
  { label: 'Healthcare & Wellness', href: '/industries/healthcare-it-solutions', internal: true },
  { label: 'Finances & Banking', href: '/industries/finance-it-solutions', internal: true },
  { label: 'Travel & Hospitality', href: '/industries/it-solutions-travel-hospitality', internal: true },
  { label: 'Retail & Distribution', href: '/industries/retail-managed-it', internal: true },
  { label: 'Logistics and Transportation', href: '/industries/logistics-it-solutions', internal: true },
  { label: 'Business Services', href: '/industries/business-services', internal: true },
  { label: 'Engineering Staffing', href: '/industries/engineering-staffing', internal: true },
  {
    label: 'Oil and Gas Digital Solutions',
    href: 'https://www.digitaloilandgas.solutions/en',
    internal: false,
    newTab: true,
  },
];
