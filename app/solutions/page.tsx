import type { Metadata } from 'next';
import content from '@/content/solutions-hub.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/solutions/hub/hero-section';
import AnswerSection from '@/components/solutions/hub/answer-section';
import SolutionsGrid from '@/components/solutions/hub/solutions-grid';
import StartSection from '@/components/solutions/hub/start-section';
import ResultsSection from '@/components/solutions/hub/results-section';
import FaqSection from '@/components/solutions/hub/faq-section';
import ContactSection from '@/components/solutions/hub/contact-section';

const PATH = '/solutions';

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

export default function SolutionsHubPage() {
  const c = content;
  const pageUrl = `${SITE_URL}${PATH}`;
  const org = 'https://www.teaminternational.com/#organization';

  // Hub graph: CollectionPage + ItemList pointing at each solution page's Service node (same @id),
  // so search and AI engines see one organization with five connected services.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: c.hero.title,
        description: c.metadata.description,
        inLanguage: 'en',
        isPartOf: { '@id': 'https://www.teaminternational.com/#website' },
        about: { '@id': org },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#solutions` },
        hasPart: [{ '@id': `${pageUrl}#faq` }],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: c.breadcrumb.home,
            item: 'https://www.teaminternational.com/en/',
          },
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
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO/IEC 27001:2022',
          credentialCategory: 'certification',
          identifier: '372-02-270-00301',
        },
        makesOffer: c.grid.items.map(item => ({
          '@type': 'Offer',
          itemOffered: { '@id': `${SITE_URL}/solutions/${item.slug}#service` },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#solutions`,
        name: c.schema.name,
        description: c.schema.description,
        numberOfItems: c.grid.items.length,
        itemListElement: c.grid.items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            '@id': `${SITE_URL}/solutions/${item.slug}#service`,
            name: item.title,
            description: item.text,
            url: `${SITE_URL}/solutions/${item.slug}`,
            provider: { '@id': org },
          },
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
      <SolutionsGrid />
      <StartSection />
      <ResultsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
