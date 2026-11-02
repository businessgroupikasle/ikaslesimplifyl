import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CheckCircle2, Building2 } from 'lucide-react';
import heroImg from '../assets/hero_businesswoman.jpg';

const TYPEWRITER_SERVICES = [
  'GST Filing',
  'Trademark Protection',
  'ROC Annual Filings',
  'Tax & Audit Advisory',
  'Private Limited Setup'
];

export default function Hero({ onOpenContact, onExploreServices }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = TYPEWRITER_SERVICES[wordIndex % TYPEWRITER_SERVICES.length];

    if (!isDeleting && currentText === targetWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPEWRITER_SERVICES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? targetWord.substring(0, prev.length - 1)
          : targetWord.substring(0, prev.length + 1)
      );
    }, isDeleting ? 40 : 85);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section id="home" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white overflow-hidden border-b border-slate-100">
      
      {/* Subtle modern corporate grid & ambient glowing orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-slate-100 via-blue-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Value Prop, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Animated Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50/80 border border-blue-200/80 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
              </span>
              <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
                BUSINESS REGISTRATION • TAX • COMPLIANCE
              </span>
            </div>

            {/* Main H1 with multi-tone gradient highlight & Typewriter Effect */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#142B4A] tracking-tight leading-[1.32] sm:leading-[1.28] py-1">
              <span className="block mb-2 sm:mb-3">
                Simplifying Business Registrations,
              </span>
              <span className="inline-flex items-center flex-wrap gap-x-2.5 gap-y-1 mr-3 py-1">
                <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent underline decoration-[#2563EB]/30 underline-offset-[10px] pb-1">
                  {currentText || '\u00A0'}
                </span>
                <span className="inline-block w-[3.5px] h-7 sm:h-9 lg:h-10 bg-[#2563EB] animate-cursor rounded-full shrink-0 align-middle" />
              </span>
              <span className="inline-block text-[#142B4A]">
                & Legal Compliance
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Start, manage, and grow your enterprise with complete peace of mind. Get expert end-to-end assistance for GST filing, company incorporation, trademark security, and statutory ROC corporate compliance.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenContact}
                className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#142B4A] via-[#1E3E6B] to-[#142B4A] hover:from-[#1E3E6B] hover:to-[#2563EB] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-navy-950/20 hover:shadow-xl hover:shadow-blue-600/25 active:scale-95 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#142B4A] border border-slate-300/90 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:border-[#2563EB]/60 hover:text-[#2563EB]"
              >
                <MessageSquare className="w-4 h-4 text-[#2563EB]" />
                <span>Talk to an Expert</span>
              </button>
            </div>

            {/* Supporting Highlights */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
                <span className="text-xs font-semibold text-[#142B4A]">
                  Business Registration Support
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
                <span className="text-xs font-semibold text-[#142B4A]">
                  GST Filing Assistance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
                <span className="text-xs font-semibold text-[#142B4A]">
                  Trademark & Compliance
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Premium Photography Frame with 3 Continuous Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              
              {/* Luxury Frame Container with subtle gradient border */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-tr from-slate-200 via-blue-100/70 to-indigo-100 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-inner">
                  <img
                    src={heroImg}
                    alt="Professional Corporate Compliance Advisor"
                    width="800"
                    height="1000"
                    fetchPriority="high"
                    className="w-full h-[410px] sm:h-[490px] object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Highlight 1: Business Setup Card (Bottom Left - Continuous Levitation) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -8, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.3 },
                  x: { duration: 0.5, delay: 0.3 },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_30px_rgba(20,43,74,0.12)] flex items-center gap-3.5 z-20 max-w-[270px] hover:shadow-xl transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#142B4A] to-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-500/25">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#142B4A]">Company Registration</p>
                  <p className="text-[11px] text-slate-500 font-medium">Pvt Ltd, LLP, MSME & OPC</p>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-[#2563EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>MCA Digital Portal</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
