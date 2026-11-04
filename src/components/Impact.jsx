import React from 'react';
import { motion } from 'framer-motion';
import { IMPACT_STATS } from '../data/mockData';

export default function Impact() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-[#091923] via-[#0D2C40] to-[#123C57] text-white overflow-hidden border-y border-blue-900/40">
      {/* Decorative Neo Mesh & Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Heading */}
          <div className="lg:col-span-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-[11px] font-extrabold uppercase tracking-[0.2em]">
              PROVEN TRACK RECORD
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Numbers that Define<br className="hidden sm:inline" />
              <span className="text-gradient-blue">Our Excellence.</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Trusted by tech startups, manufacturing units, and professional enterprises nationwide.
            </p>
          </div>

          {/* Right: 4 Elevated Metric Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {IMPACT_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_0_16px_rgba(79,162,216,0.14)]"
              >
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-sky-300 rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm text-blue-200 font-semibold leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
