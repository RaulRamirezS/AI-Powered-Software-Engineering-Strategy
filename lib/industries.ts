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
  { label: 'Healthcare & Wellness', href: `${LIVE_SITE}/industries/healthcare-it-solutions`, internal: false },
  { label: 'Finances & Banking', href: `${LIVE_SITE}/industries/finance-it-solutions`, internal: false },
  { label: 'Travel & Hospitality', href: `${LIVE_SITE}/industries/it-solutions-travel-hospitality`, internal: false },
  { label: 'Retail & Distribution', href: `${LIVE_SITE}/industries/retail-managed-it`, internal: false },
  { label: 'Logistics and Transportation', href: `${LIVE_SITE}/industries/logistics-it-solutions`, internal: false },
  { label: 'Business Services', href: `${LIVE_SITE}/industries/business-services`, internal: false },
  { label: 'Engineering Staffing', href: `${LIVE_SITE}/industries/engineering-staffing`, internal: false },
  { label: 'Oil and Gas Digital Solutions', href: 'https://digitaloilandgas.solutions/', internal: false },
];
