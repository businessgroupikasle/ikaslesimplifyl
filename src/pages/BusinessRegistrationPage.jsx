import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Award,
  AlertCircle,
  Phone
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function BusinessRegistrationPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const structures = [
    {
      title: 'Private Limited Company (Pvt Ltd)',
      badge: 'Most Popular',
      desc: 'The gold standard for startups and scaling businesses seeking limited liability, foreign investment, and venture capital.',
      features: ['2+ Directors & Shareholders', 'Distinct Legal Entity & Perpetual Succession', 'Eligible for Startup India 80-IAC Tax Exemption']
    },
    {
      title: 'Limited Liability Partnership (LLP)',
      badge: 'Low Compliance',
      desc: 'Blends limited liability protection with internal partnership operational flexibility. Lower annual audit requirements for early revenue stages.',
      features: ['2+ Designated Partners', 'No Minimum Capital Requirement', 'Governed by Mutual LLP Agreement']
    },
    {
      title: 'One Person Company (OPC)',
      badge: 'Solo Founder',
      desc: 'Allows a single entrepreneur to operate an incorporated corporate company with limited liability while appointing a nominee.',
      features: ['1 Sole Director & Shareholder', 'Nominee Director Required', 'Limited Liability for Solo Ventures']
    },
    {
      title: 'MSME / Udyam & Startup India',
      badge: 'Govt Benefits',
      desc: 'Official registration with the Ministry of MSME granting priority bank lending, collateral-free credit, and 50% discount on government trademark fees.',
      features: ['Lifetime Valid Udyam Certificate', 'DPIIT Recognition for Startups', 'Exemption from Public Tender EMD Fees']
    }
  ];

  const documents = [
    'PAN Card of all Directors / Partners / Shareholders',
    'Voter ID / Passport / Driving License (Government Identity Proof)',
    'Latest Bank Statement / Utility Bill (Address Proof not older than 2 months)',
    'Passport-size photographs of all proposed promoters',
    'Registered Office Proof (Electricity Bill + NOC signed by Property Owner)'
  ];

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Business Registration Services | Private Limited, LLP, OPC | Simplifyl"
        description="Register your business in India with expert assistance: Private Limited company incorporation, LLP registration, One Person Company (OPC), and MSME Udyam setup."
        canonicalUrl="https://simplifyl.com/business-registration"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>CORPORATE INCORPORATION PRACTICE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Business & Company Registration Services
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Set up your business with full regulatory compliance. We handle naming reservation (RUN), SPICe+ drafting, PAN/TAN generation, and Certificate of Incorporation issuance.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#142B4A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Start Incorporation Consultation</span>
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
            <span className="text-[#142B4A] font-semibold">Business Registrations</span>
          </div>
        </div>

        {/* Legal Structures */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                ENTITY OPTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
                Choose the Right Entity Structure
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Our consultants evaluate your capital needs, founder shareholding, and risk exposure to recommend the optimal legal form.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {structures.map((st, i) => (
                <div key={i} className="p-6 sm:p-8 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded border border-[#DBEAFE]">
                        {st.badge}
                      </span>
                      <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-[#142B4A]">{st.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5">
                      {st.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="text-xs font-bold text-[#142B4A] hover:text-[#2563EB] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Inquire About {st.title.split('(')[0].trim()}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Checklist */}
        <section className="py-16 bg-[#F5F7FA] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                DOCUMENTATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#142B4A] mt-1 mb-4">
                What You Need for Company Incorporation
              </h3>
              <ul className="space-y-3">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Incorporation approvals are granted solely by the Registrar of Companies (MCA). Simplifyl manages end-to-end documentation, filing, and defect resolution.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Advisory CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-[#F5F7FA] to-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                COMPANY INCORPORATION DESK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
              Ready to Register Your Business Entity?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our dedicated Contact Page to consult with our company formation specialists, verify business names, and initiate SPICe+ MCA filing.
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
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService="Business Registration" />
      )}
    </div>
  );
}
