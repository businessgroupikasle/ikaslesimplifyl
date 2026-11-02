import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  FileCheck2, 
  AlertCircle,
  Phone
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function TrademarkRegistrationPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const services = [
    {
      title: 'Trademark Search & Class Audit',
      desc: 'Rigorous investigation across 45 Nice classes on the official IP India registry to detect phonetic, visual, or semantic similarities before application.'
    },
    {
      title: 'Filing Form TM-A Application',
      desc: 'Preparation and filing of wordmark, device, or logo trademark applications with the Controller General of Patents, Designs and Trademarks.'
    },
    {
      title: '™ Symbol Legal Authorization',
      desc: 'Receive immediate government acknowledgement number and guidance allowing lawful commercial display of the ™ symbol on your products and branding.'
    },
    {
      title: 'Examination Objection Replies',
      desc: 'Drafting structured legal responses to Section 9 (Absolute Grounds) and Section 11 (Relative Grounds) objections issued by trademark examiners.'
    },
    {
      title: 'Opposition & Hearing Support',
      desc: 'Preparation of counter-statements to third-party opposition notices and advocate coordination for Registry show-cause hearings.'
    },
    {
      title: 'Trademark Renewal & Portfolio Watch',
      desc: 'Timely filing of renewal applications every 10 years to preserve legal monopoly and ongoing brand watch to flag infringing marks.'
    }
  ];

  const steps = [
    { num: '01', title: 'Public Search Report', desc: 'Evaluating similarity risks and confirming Nice classification.' },
    { num: '02', title: 'Filing Form TM-A', desc: 'Official submission with application number allowing ™ symbol usage.' },
    { num: '03', title: 'Registry Examination', desc: 'Handling examination reports, formalities, and objection replies.' },
    { num: '04', title: 'Journal Publication & ®', desc: '4-month journal advertisement followed by final registration certificate.' }
  ];

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Trademark Registration Online India | Brand & Logo Protection | Simplifyl"
        description="Protect your brand name, logo and identity with Simplifyl: trademark search, Form TM-A application filing, examination objection handling, and trademark renewal in India."
        canonicalUrl="https://simplifyl.com/trademark-registration"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>INTELLECTUAL PROPERTY PRACTICE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Trademark Registration & Brand Protection
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Shield your brand identity, business name, and logo across India. Establish nationwide legal exclusivity and deter copycat competitors from day one.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#142B4A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Request Trademark Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-[#F5F7FA] border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-slate-500">
            <Link to="/" className="hover:text-[#142B4A]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-[#142B4A]">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-[#142B4A] font-semibold">Trademark Registration</span>
          </div>
        </div>

        {/* Services */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                TRADEMARK SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
                Comprehensive Brand Protection Lifecycle
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                From pre-filing risk assessment to final certificate issuance and ongoing surveillance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-4">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#142B4A]">{srv.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="py-16 bg-[#F5F7FA] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
                The Trademark Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                How an application moves from filing to official registration under the Trade Marks Act, 1999.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((st) => (
                <div key={st.num} className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold font-mono text-white bg-[#142B4A] px-2 py-0.5 rounded">
                    STEP {st.num}
                  </span>
                  <h3 className="text-base font-bold text-[#142B4A] mt-4">{st.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-3xl mx-auto flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Trademark registration is subject to statutory examination and third-party opposition periods mandated by the Trade Marks Registry. We guide you proactively through every query.</span>
            </div>
          </div>
        </section>

        {/* Contact Advisory CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-[#F5F7FA] to-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                INTELLECTUAL PROPERTY DESK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
              Protect Your Brand Identity Today
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our dedicated Contact Page to consult with our trademark attorneys, conduct class audits, and file Form TM-A with IP India.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#142B4A] to-[#1E3E6B] hover:from-[#1E3E6B] hover:to-[#2563EB] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-navy-950/20 active:scale-95"
              >
                <span>Go to Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+917845132962"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#142B4A] border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Call +91 78451 32962</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService="Trademark Registration" />
      )}
    </div>
  );
}
