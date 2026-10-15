import type { Metadata } from 'next';
import content from '@/content/data-readiness.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/solutions/data-readiness/hero-section';
import AnswerSection from '@/components/solutions/data-readiness/answer-section';
import WorkstreamsSection from '@/components/solutions/data-readiness/workstreams-section';
import StepsSection from '@/components/solutions/data-readiness/steps-section';
import FastTrackSection from '@/components/solutions/data-readiness/fast-track-section';
import WhySection from '@/components/solutions/data-readiness/why-section';
import AnswersSection from '@/components/solutions/data-readiness/answers-section';
import FaqSection from '@/components/solutions/data-readiness/faq-section';
import ContactSection from '@/components/solutions/data-readiness/contact-section';

const PATH = '/solutions/data-readiness';

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

export default function DataReadinessPage() {
  const c = content;
  const pageUrl = `${SITE_URL}${PATH}`;
  const org = 'https://www.teaminternational.com/#organization';
  const v = c.videos.main;

  // One @graph ties page, breadcrumb, service, HowTo, FAQ and video together by @id (GEO/AEO).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: c.hero.title,
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
          {
            '@type': 'ListItem',
            position: 1,
            name: c.breadcrumb.home,
            item: 'https://www.teaminternational.com/en/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: c.breadcrumb.solutions,
            item: 'https://www.teaminternational.com/en/solutions',
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
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.workstreams.title,
          itemListElement: [
            ...c.workstreams.items.map(item => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: item.title,
                description: `${item.text} Outcome: ${item.outcome}.`,
              },
            })),
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Fast Track platform option',
                description: c.fastTrack.text,
              },
            },
          ],
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
          text: `${step.text} ${c.steps.outcomeLabel}: ${step.outcome}`,
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
      {
        '@type': 'VideoObject',
        '@id': `${pageUrl}#video`,
        name: v.title,
        description: v.description,
        thumbnailUrl: `${SITE_URL}${v.poster}`,
        uploadDate: c.videos.uploadDate,
        duration: v.duration,
        contentUrl: v.youtubeId
          ? `https://www.youtube.com/watch?v=${v.youtubeId}`
          : `${SITE_URL}${v.src}`,
        ...(v.youtubeId ? { embedUrl: `https://www.youtube.com/embed/${v.youtubeId}` } : {}),
        publisher: { '@id': org },
        isPartOf: { '@id': `${pageUrl}#webpage` },
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
      <WorkstreamsSection />
      <StepsSection />
      <FastTrackSection />
      <WhySection />
      <AnswersSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
