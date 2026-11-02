import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Contact Us | Consultation & Support | Simplifyl Compliance Solutions"
        description="Get in touch with Simplifyl Compliance Solutions. Request a consultation for GST filing, company registrations, trademark security, and corporate compliance in India."
        canonicalUrl="https://simplifyl.com/contact"
        noIndex={false}
      />

      <Navbar />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>CONNECT WITH US</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Consult With Our Specialists
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Have questions regarding GST filing, company incorporation, or trademark registration? Our advisory team is available to assist your business.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-[#F5F7FA] border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-slate-500">
            <Link to="/" className="hover:text-[#142B4A]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#142B4A] font-semibold">Contact Us</span>
          </div>
        </div>

        {/* Full Interactive Contact Section */}
        <ContactSection />

      </main>

      <Footer />
    </div>
  );
}
