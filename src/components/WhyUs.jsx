import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  MessageSquare, 
  FileCheck2, 
  HeartHandshake, 
  ShieldCheck, 
  Headphones,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import meetingImg from '../assets/consultation_meeting.jpg';

export default function WhyUs({ onOpenContact }) {
  const highlights = [
    {
      id: '01',
      title: 'Expert Guidance',
      desc: 'Clear, reliable advisory from experienced corporate tax & legal consultants.',
      icon: UserCheck
    },
    {
      id: '02',
      title: 'Transparent Communication',
      desc: 'Straightforward procedural updates with zero ambiguous jargon or surprise costs.',
      icon: MessageSquare
    },
    {
      id: '03',
      title: 'Simplified Documentation',
      desc: 'Structured checklists designed to minimize paperwork and eliminate delays.',
      icon: FileCheck2
    },
    {
      id: '04',
      title: 'Customer-Focused Approach',
      desc: 'Attentive service customized to the unique scale and structure of your enterprise.',
      icon: HeartHandshake
    },
    {
      id: '05',
      title: 'Secure Document Handling',
      desc: 'Confidential handling protocols to safeguard your personal & commercial records.',
      icon: ShieldCheck
    },
    {
      id: '06',
      title: 'Dedicated Support',
      desc: 'Direct communication channels and prompt support throughout the filing lifecycle.',
      icon: Headphones
    }
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              THE SIMPLIFYL ADVANTAGE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Why Businesses Choose Us
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            We focus on precision, prompt communication, and complete transparency to provide dependable corporate compliance services.
          </p>
        </div>

        {/* Split Layout: Image on Left, 6 Highlights on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Professional Consultation Photograph in Luxury Double-Border Frame */}
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
                  src={meetingImg}
                  alt="Simplifyl Specialist Explaining Compliance Roadmap"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/80 via-[#142B4A]/20 to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Overlay Badge with Perpetual Levitation */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-5 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_25px_rgba(20,43,74,0.12)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#142B4A] to-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-500/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                        <h4 className="text-xs font-bold text-[#142B4A]">
                          1-on-1 Specialist Advisory
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tailored compliance roadmap for your specific business structure
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: 6 Elevated Highlights Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(20,43,74,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(37,99,235,0.18)] hover:border-blue-400 transition-all duration-300 overflow-hidden card-glow"
                >
                  {/* Subtle top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#142B4A] via-[#2563EB] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-extrabold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-blue-100 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                      Phase {item.id}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#142B4A] to-[#2563EB] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
