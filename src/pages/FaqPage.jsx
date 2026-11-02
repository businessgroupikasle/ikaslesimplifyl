import React from 'react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import FAQSection, { FAQS } from '../components/FAQSection';
import CTABanner from '../components/CTABanner';

// FAQPage structured data so answers are eligible for rich results.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <SiteLayout
      seo={{
        title: 'Frequently Asked Questions (FAQ) | Business Compliance & GST | Simplifyl',
        description:
          'Find clear answers to common questions about GST registration, return filing due dates, Private Limited company incorporation, trademarks, and ROC annual compliance.',
        canonicalUrl: 'https://simplifyl.com/faq',
        schema,
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        eyebrow="Help & compliance guidance"
        title="Frequently asked questions"
        description="Everything you need to know about registering a company, filing GST returns, protecting your brand trademark, and maintaining statutory corporate compliance."
      />
      <FAQSection showHeader={false} tone="default" />
      <CTABanner
        eyebrow="Still have questions?"
        title="Talk to a compliance specialist"
        description="Our regulatory consultants are ready to provide clarification on your specific business queries."
        primaryLabel="Ask a consultant"
      />
    </SiteLayout>
  );
}
