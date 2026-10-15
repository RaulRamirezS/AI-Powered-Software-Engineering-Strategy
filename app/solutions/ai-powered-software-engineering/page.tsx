import type { Metadata } from 'next';
import content from '@/content/ai-powered-software-engineering.json';
import { SITE_URL } from '@/lib/site';
import HeroSection from '@/components/solutions/ai-powered-software-engineering/hero-section';
import AnswerSection from '@/components/solutions/ai-powered-software-engineering/answer-section';
import BuildSection from '@/components/solutions/ai-powered-software-engineering/build-section';
import ModernizeStepper from '@/components/solutions/ai-powered-software-engineering/modernize-stepper';
import AnswersSection from '@/components/solutions/ai-powered-software-engineering/answers-section';
import WhySection from '@/components/solutions/ai-powered-software-engineering/why-section';
import FaqSection from '@/components/solutions/ai-powered-software-engineering/faq-section';
import ContactSection from '@/components/solutions/ai-powered-software-engineering/contact-section';

const PATH = '/solutions/ai-powered-software-engineering';

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

export default function AiPoweredSoftwareEngineeringPage() {
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
        name: c.hero.title,
        description: c.metadata.description,
        inLanguage: 'en',
        about: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        hasPart: [{ '@id': `${pageUrl}#howto-modernize` }, { '@id': `${pageUrl}#faq` }],
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
        email: 'sales@teaminternational.com',
        sameAs: [
          'https://www.linkedin.com/company/team-international',
          'https://www.youtube.com/@teaminternationalglobal',
        ],
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
          name: c.build.title,
          itemListElement: [
            ...c.build.items.map(item => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: item.title, description: item.text },
            })),
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: c.build.mvp.title,
                description: c.build.mvp.text,
              },
            },
          ],
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto-modernize`,
        name: c.modernize.title,
        description: c.modernize.intro,
        step: c.modernize.steps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.title,
          text: `${step.text} ${c.modernize.outcomeLabel}: ${step.outcome}`,
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
      ...(['build', 'modernize'] as const).map(key => {
        const v = c.videos[key];
        return {
          '@type': 'VideoObject',
          '@id': `${pageUrl}#video-${key}`,
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
        };
      }),
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
      <BuildSection />
      <ModernizeStepper />
      <AnswersSection />
      <WhySection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
