// The 5 solution offerings. Flip `live` to true as each page is built.
export type Solution = { label: string; href: string; live: boolean };

export const solutions: Solution[] = [
  {
    label: 'AI-Powered Product & Software Engineering',
    href: '/solutions/ai-powered-software-engineering',
    live: true,
  },
  { label: 'Data Readiness', href: '/solutions/data-readiness', live: true },
  {
    label: 'Customer Care & Technical Support Managed Services',
    href: '/solutions/customer-care-technical-support',
    live: true,
  },
  {
    label: 'AI Transformation & Value Realization',
    href: '/solutions/ai-transformation',
    live: true,
  },
  {
    label: 'AI Discovery & Agent Experience Services (AXP)',
    href: '/solutions/ai-discovery-agent-experience',
    live: true,
  },
];
