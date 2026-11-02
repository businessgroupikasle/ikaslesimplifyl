import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import { 
  Compass, 
  Target, 
  Shield, 
  CheckCircle2, 
  Users, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck2
} from 'lucide-react';
import receptionImg from '../assets/office_reception.jpg';
import ContactModal from '../components/ContactModal';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="About Us | Simplifyl Business & Compliance Solutions"
        description="Learn about Simplifyl Compliance Solutions, our mission, vision, and core values. We provide dependable GST filing, company registrations, and statutory compliance assistance across India."
        canonicalUrl="https://simplifyl.com/about"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        
        {/* Page Hero Banner */}
        <section className="bg-[#142B4A] text-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span>OUR STORY & PHILOSOPHY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                About Simplifyl Compliance Solutions
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                An independent business consultancy committed to making company registration, GST compliance, and trademark protection straightforward, transparent, and dependable.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <div className="bg-[#F5F7FA] border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-slate-500">
            <Link to="/" className="hover:text-[#142B4A]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#142B4A] font-semibold">About Us</span>
          </div>
        </div>

        {/* Narrative & Photo Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  WHO WE ARE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
                  Demystifying Corporate Regulatory Frameworks
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Simplifyl was founded on a simple principle: regulatory compliance should not be an impediment to enterprise growth. While Indian statutory frameworks provide robust legal protections, the operational complexities of GST returns, ROC annual filings, and intellectual property registrations can distract founders from core business objectives.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our consultancy operates as a strategic execution bridge between growing businesses and statutory requirements. We translate dense procedural directives into clear, actionable checklists, ensuring zero missed due dates and complete transparency at every stage.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>Connect With Our Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src={receptionImg}
                    alt="Simplifyl Advisory Workspace"
                    width="800"
                    height="500"
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission, Vision, and Values */}
        <section className="py-16 bg-[#F5F7FA] border-t border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
                Our Guiding Foundations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Core principles driving every document we draft and client relationship we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#142B4A]">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  To provide structured, dependable, and affordable business registration and statutory compliance advisory that empowers Indian enterprises to operate with confidence.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#142B4A]">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  To be recognized as India's most client-centric and transparent business consultancy, distinguished by accuracy, responsiveness, and ethical practice.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#142B4A]">Our Core Values</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Uncompromising integrity, statutory accuracy, upfront fee transparency with zero hidden charges, and absolute confidentiality of all commercial documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Simplifyl */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
                The Simplifyl Difference
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                What clients experience when partnering with our professional consultancy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#142B4A]">Fee Clarity</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Government statutory fees and professional charges are clearly distinguished upfront with zero surprises.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#142B4A]">Dedicated Point of Contact</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  You work directly with an assigned compliance professional familiar with your operational context.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#142B4A]">Proactive Due Dates</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Automated intimation of GST return dates, annual ROC timelines, and Director KYC deadlines.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#142B4A]">Encrypted Data Vault</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  All incorporation records, PAN details, and financial files are handled under strict confidentiality protocols.
                </p>
              </div>
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
