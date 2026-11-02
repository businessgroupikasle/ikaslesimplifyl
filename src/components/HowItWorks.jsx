import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Headphones, UploadCloud, FileCheck2 } from 'lucide-react';

export default function HowItWorks({ onOpenContact }) {
  const steps = [
    {
      num: '01',
      title: 'Share Your Requirements',
      desc: 'Tell us about your business and specific service requirements through our enquiry form or consultation call.',
      icon: MessageSquare
    },
    {
      num: '02',
      title: 'Get Consultation',
      desc: 'Understand the applicable regulatory process, eligibility criteria, document checklists, and estimated fee costs.',
      icon: Headphones
    },
    {
      num: '03',
      title: 'Submit Documents',
      desc: 'Share the required information and statutory documents securely for preliminary review by our specialists.',
      icon: UploadCloud
    },
    {
      num: '04',
      title: 'Application & Assistance',
      desc: 'Receive hands-on guidance throughout the applicable registration or filing process until successful completion.',
      icon: FileCheck2
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              PROCEDURAL TIMELINE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            A Simple Process. Professional Support.
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            We guide you step-by-step through registrations and compliance with clarity and structured timelines.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="relative">
          
          {/* Subtle Horizontal Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 -translate-y-12 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(20,43,74,0.04)] hover:shadow-[0_16px_32px_rgba(37,99,235,0.1)] hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Glowing Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#142B4A] via-[#2563EB] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-mono font-extrabold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-blue-100">
                        STEP {step.num}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#142B4A] to-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>Phase 0{idx + 1} of 04</span>
                    <span className="text-[#2563EB] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 group"
          >
            <span>Start Step 01 Today</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
