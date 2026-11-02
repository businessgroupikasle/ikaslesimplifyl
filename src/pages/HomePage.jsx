import React, { useState, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
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
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

// Lazy-load contact modal if triggered from header / buttons
const ContactModal = lazy(() => import('../components/ContactModal'));

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const handleOpenContact = (serviceName = '') => {
    setPreselectedService(typeof serviceName === 'string' ? serviceName : '');
    setIsContactOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#263445] antialiased font-sans flex flex-col selection:bg-blue-100 selection:text-[#142B4A]">
      
      {/* Dynamic SEO Head Management for Homepage */}
      <SEOHead
        title="Simplifyl | Business Registrations, GST Filing & Legal Compliance"
        description="Simplifyl helps entrepreneurs, startups, and growing enterprises with professional GST filing, business registrations (Private Limited & LLP), trademark protection, and corporate compliance in India."
        canonicalUrl="https://simplifyl.com/"
        noIndex={false}
      />

      {/* SECTION 03 – Sticky Navigation Header */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main id="main-content" className="flex-grow">
        
        {/* SECTION 04 – Hero Banner */}
        <Hero
          onOpenContact={() => handleOpenContact()}
          onExploreServices={handleExploreServices}
        />

        {/* SECTION 05 – Trust Highlights (No fabricated stats) */}
        <TrustSection />

        {/* SECTION 06 – About Us Section */}
        <About onOpenContact={() => handleOpenContact()} />

        {/* SECTION 07 – Main Services Section (4 Core Services) */}
        <Services onOpenContact={(svc) => handleOpenContact(svc)} />

        {/* SECTION 08 – Detailed Service Categories (Accordions) */}
        <DetailedServices onOpenContact={(svc) => handleOpenContact(svc)} />

        {/* SECTION 09 – Why Businesses Choose Us (6 Highlights) */}
        <WhyUs onOpenContact={() => handleOpenContact()} />

        {/* SECTION 10 – How It Works (4-Step Timeline) */}
        <HowItWorks onOpenContact={() => handleOpenContact()} />

        {/* SECTION 11 – Who We Help (7 Growth Stages) */}
        <WhoWeHelp onOpenContact={(seg) => handleOpenContact(seg)} />

        {/* SECTION 12 – Documentation Section (3 Categories) */}
        <DocumentationSection onOpenContact={(cat) => handleOpenContact(cat)} />

        {/* SECTION 13 – Transparent Pricing Section */}
        <PricingSection onOpenContact={(cat) => handleOpenContact(cat)} />

        {/* SECTION 14 – Customer Testimonials */}
        <TestimonialsSection onOpenContact={() => handleOpenContact()} />

        {/* SECTION 15 – Frequently Asked Questions (12 Questions) */}
        <FAQSection onOpenContact={() => handleOpenContact()} />

        {/* SECTION 16 – Final CTA Section */}
        <CTA onOpenContact={() => handleOpenContact()} />

        {/* SECTION 17 – Professional Contact & Functional Enquiry Section */}
        <ContactSection preselectedService={preselectedService} />

      </main>

      {/* SECTION 18 – Premium Footer */}
      <Footer onOpenContact={() => handleOpenContact()} />

      {/* Interactive Contact Modal on demand */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            preselectedService={preselectedService}
          />
        </Suspense>
      )}

    </div>
  );
}
