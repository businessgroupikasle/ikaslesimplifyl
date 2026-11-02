import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  FileText, 
  Building2, 
  ShieldCheck, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Check,
  Phone
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function ServicesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const services = [
    {
      id: 'gst-filing',
      title: 'GST Filing & Taxation Services',
      subtitle: 'Complete GST management, return preparation & notice advisory',
      icon: FileText,
      pageLink: '/gst-filing',
      desc: 'Simplify your Goods and Services Tax obligations with structured support for registrations, periodic return filings (GSTR-1, GSTR-3B), annual reconciliations (GSTR-9/9C), and departmental response drafting.',
      inclusions: [
        'New GST Registration & Field Amendments',
        'Monthly GSTR-1 & GSTR-3B Return Preparation',
        'Automated 2A / 2B Input Tax Credit Reconciliation',
        'Annual Return (GSTR-9) & Reconciliation (GSTR-9C)',
        'E-Way Bill Generation & Export LUT Filing',
        'Assistance for GST ASMT-10 & DRC-01 Department Notices'
      ]
    },
    {
      id: 'business-registration',
      title: 'Business Registration & Incorporation',
      subtitle: 'Structured company formation with statutory authorities',
      icon: Building2,
      pageLink: '/business-registration',
      desc: 'Incorporate your venture with complete legal standing under the Ministry of Corporate Affairs (MCA). We guide you through naming guidelines, digital signatures, charter drafting, and certificate of incorporation issuance.',
      inclusions: [
        'Private Limited Company Incorporation (SPICe+ Part A & B)',
        'Limited Liability Partnership (LLP) Registration',
        'One Person Company (OPC) Registration',
        'Partnership Firm Deed Drafting & Registration',
        'Sole Proprietorship & Udyam MSME Setup',
        'Startup India (DPIIT) Recognition Advisory'
      ]
    },
    {
      id: 'trademark-registration',
      title: 'Trademark Registration & Brand Security',
      subtitle: 'Protect your brand identity, logo, and commercial reputation',
      icon: ShieldCheck,
      pageLink: '/trademark-registration',
      desc: 'Secure exclusive nationwide rights over your brand name, logo, or tagline. Our trademark specialists conduct exhaustive preliminary availability searches, file Form TM-A with IP India, and handle examination objections.',
      inclusions: [
        'Comprehensive 45-Class Trademark Search Report',
        'Filing Form TM-A for Word Marks & Logo Device Marks',
        'Immediate ™ Symbol Usage Guidance & Tracking',
        'Drafting Formal Replies to Examination Objections',
        'Representation for Trademark Registry Show-Cause Hearings',
        'Trademark Renewal (Every 10 Years) & License Recording'
      ]
    },
    {
      id: 'compliance-support',
      title: 'Compliance Support & Annual ROC Filings',
      subtitle: 'Prevent statutory penalties and maintain active corporate status',
      icon: FileCheck2,
      pageLink: '/compliance-support',
      desc: 'Keep your company compliant with the Companies Act, 2013 and avoid director disqualification. We manage annual financial filings (AOC-4), annual returns (MGT-7/7A), Director KYC (DIR-3 KYC), and board resolutions.',
      inclusions: [
        'Annual ROC Financial Statement Filing (Form AOC-4)',
        'Annual Company Return Filing (Form MGT-7 / MGT-7A)',
        'Annual LLP Returns (Form 11 & Form 8)',
        'Director Identification KYC (DIR-3 KYC Web & e-Form)',
        'Drafting Board Meeting & Annual General Meeting (AGM) Minutes',
        'Filing Form INC-20A Commencement of Business'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Our Services | GST Filing, Business Registrations & Trademarks | Simplifyl"
        description="Explore Simplifyl's complete business consultancy services: GST registration & monthly return filing, company incorporation (Pvt Ltd & LLP), trademark protection, and annual ROC compliance in India."
        canonicalUrl="https://simplifyl.com/services"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>PRACTICE OVERVIEW</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Our Corporate Practice Areas
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Professional documentation and advisory solutions structured to simplify statutory registrations, ongoing tax filings, and legal compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-[#F5F7FA] border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-slate-500">
            <Link to="/" className="hover:text-[#142B4A]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#142B4A] font-semibold">Services</span>
          </div>
        </div>

        {/* 4 Deep Service Blocks */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="p-8 sm:p-10 rounded-2xl bg-[#F5F7FA] border border-slate-200 shadow-sm hover:border-blue-200 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                            {svc.subtitle}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[#142B4A]">
                            {svc.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {svc.desc}
                      </p>

                      <div className="pt-3">
                        <Link
                          to={svc.pageLink}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <span>Explore Full Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                        Key Inclusions & In-Scope Activities:
                      </p>
                      <ul className="space-y-2.5">
                        {svc.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Advisory CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-[#F5F7FA] to-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                CONSULTATION & ENQUIRIES
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
              Have Questions Regarding Our Services?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our dedicated Contact Page to consult with our advisory team, request custom service quotations, and get clarity on statutory steps.
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
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
