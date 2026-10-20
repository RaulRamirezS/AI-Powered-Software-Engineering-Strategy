import type { Metadata } from 'next';
import content from '@/content/healthcare-it-solutions.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/industries/healthcare-it-solutions/hero-section';
import AnswerSection from '@/components/industries/healthcare-it-solutions/answer-section';
import FocusSection from '@/components/industries/healthcare-it-solutions/focus-section';
import SolutionsSection from '@/components/industries/healthcare-it-solutions/solutions-section';
import StoriesSection from '@/components/industries/healthcare-it-solutions/stories-section';
import StepsSection from '@/components/industries/healthcare-it-solutions/steps-section';
import DeliverySection from '@/components/industries/healthcare-it-solutions/delivery-section';
import FaqSection from '@/components/industries/healthcare-it-solutions/faq-section';
import ContactSection from '@/components/industries/healthcare-it-solutions/contact-section';

// Same URL as the live page (teaminternational.com/en/industries/healthcare-it-solutions).
const PATH = '/industries/healthcare-it-solutions';

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

export default function HealthcareIndustryPage() {
  const c = content;
  const pageUrl = `${SITE_URL}${PATH}`;
  const org = 'https://www.teaminternational.com/#organization';

  // One @graph ties page, breadcrumb, service, HowTo and FAQ together by @id (GEO/AEO).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${c.hero.name}: ${c.hero.title}`,
        description: c.metadata.description,
        inLanguage: 'en',
        about: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        hasPart: [{ '@id': `${pageUrl}#howto` }, { '@id': `${pageUrl}#faq` }],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.breadcrumb.home, item: 'https://www.teaminternational.com/en/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: c.breadcrumb.industries,
            item: 'https://www.teaminternational.com/en/industries',
          },
          { '@type': 'ListItem', position: 3, name: c.breadcrumb.current },
        ],
      },
      {
        '@type': 'Organization',
        '@id': org,
        name: 'TEAM International',
        legalName: 'Team International Services Inc.',
        url: 'https://www.teaminternational.com/',
        logo: `${SITE_URL}/team-international-logo-light-bg.png`,
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO/IEC 27001:2022',
          credentialCategory: 'certification',
          identifier: '372-02-270-00301',
        },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: c.schema.serviceName,
        alternateName: c.schema.alternateNames,
        serviceType: c.schema.serviceType,
        description: c.schema.serviceDescription,
        provider: { '@id': org },
        audience: { '@type': 'BusinessAudience', audienceType: c.schema.audience },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Place', name: 'European Union' },
        ],
        isRelatedTo: c.solutions.items.map(s => ({ '@type': 'Service', name: s.name, url: `${SITE_URL}${s.href}` })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.focus.title,
          itemListElement: c.focus.items.map(item => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item.title, description: item.text },
          })),
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: c.steps.title,
        description: c.steps.intro,
        step: c.steps.items.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.title,
          text: `${step.text} ${c.steps.outcomeLabel}: ${step.outcome}.`,
          url: `${pageUrl}#${step.id}`,
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
      <FocusSection />
      <SolutionsSection />
      <StoriesSection />
      <StepsSection />
      <DeliverySection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
