import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  AlertCircle,
  Phone
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function ComplianceSupportPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const complianceList = [
    {
      title: 'Form AOC-4 (Financial Statements Filing)',
      desc: 'Annual mandatory filing of balance sheet, profit and loss account, auditor’s report, and directors’ report with the ROC within 30 days of AGM.'
    },
    {
      title: 'Form MGT-7 / MGT-7A (Annual Return)',
      desc: 'Statutory annual return capturing shareholder lists, share transfers, promoter holding, and meeting details within 60 days of AGM.'
    },
    {
      title: 'Annual Director KYC (DIR-3 KYC)',
      desc: 'Mandatory verification for every individual allocated a DIN (Director Identification Number) to prevent deactivation and severe late penalties.'
    },
    {
      title: 'LLP Form 11 & Form 8 Filings',
      desc: 'Annual Statement of Account & Solvency (Form 8) and Annual Return of LLP (Form 11) filed with the Registrar of Companies.'
    },
    {
      title: 'Board & AGM Secretarial Minutes',
      desc: 'Preparation of statutory notices, board meeting minutes, AGM resolutions, and maintaining statutory registers under Companies Act norms.'
    },
    {
      title: 'Commencement of Business (INC-20A)',
      desc: 'Filing verification of paid-up capital and bank account within 180 days of incorporation to allow commencement of commercial operations.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Annual ROC Compliance & Corporate Secretarial Support | Simplifyl"
        description="Ensure your Private Limited company and LLP remain in good standing: AOC-4, MGT-7 annual filings, Director KYC (DIR-3), AGM documentation, and statutory compliance in India."
        canonicalUrl="https://simplifyl.com/compliance-support"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Hero */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>CORPORATE SECRETARIAL PRACTICE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Corporate Compliance & Annual ROC Filings
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Protect your directors from disqualification and eliminate compounding MCA late penalties. We manage complete secretarial compliance for Private Limited and LLP entities.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#142B4A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Request Compliance Audit</span>
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
            <span className="text-[#142B4A] font-semibold">Compliance Support</span>
          </div>
        </div>

        {/* Mandatory Filings Grid */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                STATUTORY SCOPE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
                Mandatory Annual Filings We Handle
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Every registered Indian corporate entity must fulfill periodic secretarial requirements regardless of business activity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceList.map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-4">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#142B4A]">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Late Fee Warning */}
        <section className="py-12 bg-amber-50/60 border-b border-amber-200/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Late Fee Risks Under Companies Act, 2013
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed mt-1">
                  Delay in filing Form AOC-4 or MGT-7 incurs compounding statutory late fees of ₹100 per day per form with no maximum ceiling. In addition, persistent default risks director disqualification for a period of up to 5 years under Section 164(2).
                </p>
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
                CORPORATE SECRETARIAL DESK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
              Maintain Active Standing & Avoid ROC Penalties
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our dedicated Contact Page to consult with our company secretaries, review statutory registers, and schedule annual MCA filings.
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
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService="Compliance Support" />
      )}
    </div>
  );
}
