import type { Metadata } from 'next';
import content from '@/content/insights-hub.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/insights/hero-section';
import AnswerSection from '@/components/insights/answer-section';
import ReportSection from '@/components/insights/report-section';
import BlogSection from '@/components/insights/blog-section';
import StoriesSection from '@/components/insights/stories-section';
import IntelSection from '@/components/insights/intel-section';
import ExploreSection from '@/components/insights/explore-section';
import AuthorsSection from '@/components/insights/authors-section';
import FaqSection from '@/components/insights/faq-section';
import ContactSection from '@/components/insights/contact-section';

// Same URL as the live page (teaminternational.com/en/insights).
const PATH = '/insights';

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

export default function InsightsHubPage() {
  const c = content;
  const pageUrl = `${SITE_URL}${PATH}`;
  const org = 'https://www.teaminternational.com/#organization';

  // Content graph: CollectionPage → ItemList of the report, blog posts, success stories and white paper,
  // all authored by the same Organization (GEO/AEO).
  const items = [
    {
      '@type': 'Report',
      name: c.report.title,
      url: c.report.href,
      image: c.report.image,
      author: { '@id': org },
      publisher: { '@id': org },
    },
    ...c.blog.items.map(b => ({
      '@type': 'BlogPosting',
      headline: b.title,
      description: b.text,
      url: b.href,
      image: b.image,
      datePublished: b.date,
      author: { '@id': org },
      publisher: { '@id': org },
    })),
    ...c.stories.items.map(s => ({
      '@type': 'Article',
      headline: s.text,
      url: s.href,
      image: s.image,
      about: { '@type': 'Organization', name: s.client },
      author: { '@id': org },
      publisher: { '@id': org },
    })),
    {
      '@type': 'DigitalDocument',
      name: c.intel.featured.title,
      url: c.intel.featured.href,
      author: { '@id': org },
    },
  ];

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
        mainEntity: { '@id': `${pageUrl}#content` },
        hasPart: [{ '@id': `${pageUrl}#faq` }],
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
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#content`,
        name: c.schema.name,
        description: c.schema.description,
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
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
      <ReportSection />
      <BlogSection />
      <StoriesSection />
      <IntelSection />
      <ExploreSection />
      <AuthorsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
