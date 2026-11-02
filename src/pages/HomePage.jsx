import React, { useEffect } from 'react';
import SiteLayout from '../components/SiteLayout';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import About from '../components/About';
import Services from '../components/Services';
import DetailedServices from '../components/DetailedServices';
import WhyUs from '../components/WhyUs';
import HowItWorks from '../components/HowItWorks';
import WhoWeHelp from '../components/WhoWeHelp';
import DocumentationSection from '../components/DocumentationSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTA from '../components/CTA';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  // Honour deep links such as simplifyl.com/#pricing on first load.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 50);
  }, []);

  return (
    <SiteLayout
      seo={{
        title: 'Simplifyl | Business Registrations, GST Filing & Legal Compliance',
        description:
          'Simplifyl helps entrepreneurs, startups, and growing enterprises with professional GST filing, business registrations (Private Limited & LLP), trademark protection, and corporate compliance in India.',
        canonicalUrl: 'https://simplifyl.com/',
      }}
    >
      <Hero />
      <TrustSection />
      <About />
      <Services />
      <DetailedServices />
      <WhyUs />
      <HowItWorks />
      <WhoWeHelp />
      <DocumentationSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
      <ContactSection tone="sunken" />
    </SiteLayout>
  );
}
