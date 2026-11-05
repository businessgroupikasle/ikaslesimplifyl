import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#091822] text-[#263445] dark:text-slate-200 flex flex-col font-sans transition-colors duration-200">
      <SEOHead
        title="Contact Us | Consultation & Support | Simplifyl Compliance Solutions"
        description="Get in touch with Simplifyl Compliance Solutions. Request a consultation for GST filing, company registrations, trademark security, and corporate compliance in India."
        canonicalUrl="https://simplifyl.com/contact"
        noIndex={false}
      />

      <Navbar />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#10364E] dark:bg-[#0C2332] text-white pt-8 pb-14 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: 'Contact Us' }]} />
            <div className="mt-9 lg:mt-12 max-w-3xl space-y-4">
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

        {/* Full Interactive Contact Section */}
        <ContactSection />

      </main>

      <Footer />
    </div>
  );
}
