import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Lightbulb, 
  Store, 
  Building2, 
  Layers, 
  User, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export default function WhoWeHelp({ onOpenContact }) {
  const segments = [
    {
      title: 'Startups',
      desc: 'Early-stage ventures needing incorporation, founder agreements, and Startup India tax recognition.',
      icon: Rocket,
      highlight: 'SPICe+ & DPIIT'
    },
    {
      title: 'Entrepreneurs',
      desc: 'Visionary founders converting novel concepts into formal, compliant legal business structures.',
      icon: Lightbulb,
      highlight: 'Entity Setup'
    },
    {
      title: 'Small Businesses',
      desc: 'Retailers, traders, and local enterprises requiring GST filings, MSME benefits, and routine renewals.',
      icon: Store,
      highlight: 'GST & Udyam'
    },
    {
      title: 'Private Limited Companies',
      desc: 'Corporations needing diligent ROC annual filings, board minutes, and secretarial compliance.',
      icon: Building2,
      highlight: 'ROC & Annual Filings'
    },
    {
      title: 'Limited Liability Partnerships',
      desc: 'LLP partners requiring annual Form 11 and Form 8 returns, partnership deed amendments, and tax audits.',
      icon: Layers,
      highlight: 'Form 8 & 11'
    },
    {
      title: 'Freelancers & Consultants',
      desc: 'Independent professionals requiring GST registration, LUT filing for export income, and tax filing.',
      icon: User,
      highlight: 'Export LUT & Tax'
    },
    {
      title: 'Growing Enterprises',
      desc: 'Scaling organizations expanding into multiple states, needing trademark security and compliance audits.',
      icon: TrendingUp,
      highlight: 'Multi-State GST'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
            <span className="text-xs font-bold text-[#1C6FA5] tracking-wider uppercase">
              CLIENT DIVERSITY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10364E] tracking-tight">
            Business Support for Every Stage of Growth
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Whether launching your first venture or managing an established corporate enterprise, our advisory scales with you.
          </p>
        </div>

        {/* 7 Segment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {segments.map((seg, idx) => {
            const Icon = seg.icon;
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1.5 glass-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Glowing Gradient Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10364E] via-[#1C6FA5] to-[#4FA2D8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1C6FA5] bg-[#F4F8FB] px-2.5 py-1 rounded-full border border-blue-100">
                      {seg.highlight}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#10364E] group-hover:text-[#1C6FA5] transition-colors">
                    {seg.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-normal">
                    {seg.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onOpenContact(seg.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C6FA5] group-hover:text-[#10364E] transition-colors"
                  >
                    <span>Get Advisory</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
