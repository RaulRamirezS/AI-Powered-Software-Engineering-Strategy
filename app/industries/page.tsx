import type { Metadata } from 'next';
import content from '@/content/industries-hub.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/industries/hub/hero-section';
import AnswerSection from '@/components/industries/hub/answer-section';
import IndustriesGrid from '@/components/industries/hub/industries-grid';
import SolutionsSection from '@/components/industries/hub/solutions-section';
import ResultsSection from '@/components/industries/hub/results-section';
import StepsSection from '@/components/industries/hub/steps-section';
import DeliverySection from '@/components/industries/hub/delivery-section';
import FaqSection from '@/components/industries/hub/faq-section';
import ContactSection from '@/components/industries/hub/contact-section';

// Same URL as the live page (teaminternational.com/en/industries).
const PATH = '/industries';

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: { canonical: PATH },
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    url: PATH,
    type: 'website',
  },
};

export default function IndustriesHubPage() {
  const c = content;
  const pageUrl = `${SITE_URL}${PATH}`;
  const org = 'https://www.teaminternational.com/#organization';

  // Hub graph: CollectionPage + ItemList pointing at each industry page's Service node (same @id),
  // so search and AI engines see one organization with connected industry services.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${c.hero.name}: ${c.hero.title}`,
        description: c.metadata.description,
        inLanguage: 'en',
        isPartOf: { '@id': 'https://www.teaminternational.com/#website' },
        about: { '@id': org },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#industries` },
        hasPart: [{ '@id': `${pageUrl}#howto` }, { '@id': `${pageUrl}#faq` }],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.breadcrumb.home, item: 'https://www.teaminternational.com/en/' },
          { '@type': 'ListItem', position: 2, name: c.breadcrumb.current },
        ],
      },
      {
        '@type': 'Organization',
        '@id': org,
        name: 'TEAM International',
        legalName: 'Team International Services Inc.',
        url: 'https://www.teaminternational.com/',
        logo: `${SITE_URL}/team-international-logo-light-bg.png`,
        description: c.answer.text,
        knowsAbout: c.grid.items.map(i => i.name),
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO/IEC 27001:2022',
          credentialCategory: 'certification',
          identifier: '372-02-270-00301',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#industries`,
        name: c.schema.name,
        description: c.schema.description,
        numberOfItems: c.grid.items.length + 1,
        itemListElement: [
          ...c.grid.items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              '@id': `${SITE_URL}${item.href}#service`,
              name: item.name,
              description: item.text,
              url: `${SITE_URL}${item.href}`,
              provider: { '@id': org },
            },
          })),
          {
            '@type': 'ListItem',
            position: c.grid.items.length + 1,
            name: c.grid.external.name,
            url: c.grid.external.href,
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: c.steps.title,
        description: c.steps.intro,
        step: c.steps.items.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: `${s.text} ${c.steps.outcomeLabel}: ${s.outcome}.`,
          url: `${pageUrl}#${s.id}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: c.faq.items.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AnswerSection />
      <IndustriesGrid />
      <SolutionsSection />
      <ResultsSection />
      <StepsSection />
      <DeliverySection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
