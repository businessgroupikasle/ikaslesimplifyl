import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import FAQSection from '../components/FAQSection';
import ContactModal from '../components/ContactModal';

export default function FaqPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Business Compliance & GST | Simplifyl"
        description="Find clear answers to common questions about GST registration, return filing due dates, Private Limited company incorporation, trademarks, and ROC annual compliance."
        canonicalUrl="https://simplifyl.com/faq"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#10364E] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>HELP & COMPLIANCE GUIDANCE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Everything you need to know about registering a company, filing GST returns, protecting your brand trademark, and maintaining statutory corporate compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-[#F5F7FA] border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end text-xs text-slate-500">
            <Link to="/" className="hover:text-[#10364E]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10364E] font-semibold">FAQ</span>
          </div>
        </div>

        {/* FAQ Accordion Component */}
        <FAQSection onOpenContact={() => setIsContactOpen(true)} />

      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
