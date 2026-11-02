import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Phone
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function GstFilingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const inclusions = [
    {
      title: 'New GST Registration',
      desc: 'End-to-end registration on the GST common portal with ARN generation and GSTIN certificate issuance.'
    },
    {
      title: 'GSTR-1 Monthly / Quarterly Filing',
      desc: 'Preparation and filing of outward supplies, B2B invoice reporting, export declarations, and HSN summary tables.'
    },
    {
      title: 'GSTR-3B Summary Return',
      desc: 'Calculation of monthly output liability, optimization of eligible Input Tax Credit (ITC), and challan generation.'
    },
    {
      title: 'Automated 2A/2B Reconciliation',
      desc: 'Matching supplier invoice uploads against purchase books to recover missed credits and identify defaulting vendors.'
    },
    {
      title: 'GSTR-9 Annual Return & 9C',
      desc: 'Annual consolidated compliance, balance sheet reconciliation, and statutory disclosure reports.'
    },
    {
      title: 'GST Notice Response & Amendments',
      desc: 'Drafting legal replies for ASMT-10 scrutiny, DRC-01 notices, and processing core/non-core field amendments.'
    }
  ];

  const documents = [
    'PAN Card of Business entity and Directors / Proprietor',
    'Aadhaar Card of Primary Authorized Signatory',
    'Principal Place of Business Proof (Electricity Bill, Rent Agreement & Owner NOC)',
    'Cancelled Cheque / Bank Statement with IFSC and Account details',
    'Constitutional documents (Partnership Deed, MOA/AOA, or Incorporation Certificate)'
  ];

  const steps = [
    { num: '01', title: 'Data Upload', desc: 'Securely upload sales, purchase register, and invoice summaries.' },
    { num: '02', title: 'Tax Audit & Reconciliation', desc: 'Our tax specialist audits ITC eligibility and reconciles GSTR-2B.' },
    { num: '03', title: 'Review & Tax Challan', desc: 'You receive computation summary and tax challan for validation.' },
    { num: '04', title: 'Filing & ARN Acknowledgement', desc: 'Official portal submission with ARN confirmation delivered.' }
  ];

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="GST Filing Services & Registration Online | Simplifyl"
        description="Get expert GST filing assistance in India: new GST registration, monthly GSTR-1 & GSTR-3B filings, annual GSTR-9 returns, 2B ITC reconciliation, and notice support."
        canonicalUrl="https://simplifyl.com/gst-filing"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Hero Banner */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>GOODS & SERVICES TAX PRACTICE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                GST Filing & Registration Services
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Avoid penalty notices, optimize your Input Tax Credit, and maintain an exemplary GST compliance rating with our expert tax filing assistance.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#142B4A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Request GST Consultation</span>
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
            <span className="text-[#142B4A] font-semibold">GST Filing</span>
          </div>
        </div>

        {/* In-Scope Services Grid */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                WHAT WE PROVIDE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] mt-1">
                End-to-End GST Advisory & Filings
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Tailored for manufacturers, traders, e-commerce sellers, and service exporters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-4">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#142B4A]">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents & Process Section */}
        <section className="py-16 bg-[#F5F7FA] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Documents Checklist */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  CHECKLIST
                </span>
                <h3 className="text-xl font-extrabold text-[#142B4A] mt-1 mb-4">
                  Documents Required for GST Filing
                </h3>
                <ul className="space-y-3">
                  {documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Document requirements may differ according to your entity type (Pvt Ltd, LLP, Proprietorship).</span>
                </div>
              </div>

              {/* 4-Step Process */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  WORKFLOW
                </span>
                <h3 className="text-xl font-extrabold text-[#142B4A]">
                  How We Manage Your Monthly Filings
                </h3>
                <div className="space-y-3 pt-2">
                  {steps.map((st) => (
                    <div key={st.num} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#142B4A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {st.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#142B4A]">{st.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                EXPERT TAX ASSISTANCE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
              Need Professional Assistance for GST Filing?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our dedicated Contact Page to consult with our GST advisory team, share your business requirements, and review filing deadlines.
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
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService="GST Filing" />
      )}
    </div>
  );
}
