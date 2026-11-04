import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, Shield, CheckCircle2 } from 'lucide-react';
import receptionImg from '../assets/office_reception.jpg';
import { Link } from '../lib/router';

export default function About({ onOpenContact }) {
  const pillars = [
    {
      title: 'Who We Are',
      desc: 'A dedicated business consultancy facilitating registrations, tax filings, and legal compliances across India.',
      icon: Compass
    },
    {
      title: 'Our Mission',
      desc: 'To remove bureaucratic friction so entrepreneurs can focus completely on growing their commercial ventures.',
      icon: Target
    },
    {
      title: 'Our Vision',
      desc: 'To be the most reliable, transparent, and approachable corporate compliance partner for businesses of all sizes.',
      icon: Shield
    }
  ];

  return (
    <section id="about" className="py-10 lg:py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image with Luxury Double-Border Frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-tr from-slate-200 via-blue-100/70 to-indigo-100 shadow-xl">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-inner">
                <img
                  src={receptionImg}
                  alt="Simplifyl Professional Consultancy Workspace"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[390px] sm:h-[470px] object-cover hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/80 via-[#10364E]/20 to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_25px_rgba(16,54,78,0.12)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#1C6FA5]" />
                    <p className="text-xs font-extrabold text-[#10364E] uppercase tracking-wider">
                      Corporate Advisory & Practice
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Assisting entrepreneurs, startups, and growing enterprises with dependable statutory guidance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Headings & Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F8FB] border border-[#E3EFF8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
                <span className="text-xs font-bold text-[#1C6FA5] tracking-wider uppercase">
                  ABOUT COMPANY
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10364E] tracking-tight leading-tight">
                Your Trusted Partner for Business Growth & Compliance
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                We help entrepreneurs, startups and growing businesses navigate important business registrations, taxation and compliance requirements. Our goal is to simplify complex processes through professional guidance, clear communication and reliable assistance.
              </p>
            </div>

            {/* 3 Core Blocks: Who We Are, Our Mission, Our Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1 glass-hover transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] flex items-center justify-center text-white mb-3.5 shadow-sm shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-[#10364E] group-hover:text-[#1C6FA5] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Why Choose Us Bullet Highlights */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Why Choose Us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] shrink-0" />
                  <span className="text-xs font-semibold text-[#10364E]">
                    Transparent fee structure with zero ambiguity
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] shrink-0" />
                  <span className="text-xs font-semibold text-[#10364E]">
                    Dedicated professional assigned to your filing
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] shrink-0" />
                  <span className="text-xs font-semibold text-[#10364E]">
                    End-to-end guidance from start to completion
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] shrink-0" />
                  <span className="text-xs font-semibold text-[#10364E]">
                    Confidential and encrypted document handling
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#10364E] hover:bg-[#174E72] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm group"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenContact}
                className="text-xs font-bold text-[#1C6FA5] hover:text-[#10364E] transition-colors"
              >
                Schedule a Consultation →
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
