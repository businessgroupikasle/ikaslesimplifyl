import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link } from '../lib/router';

export default function CTA({ onOpenContact }) {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width corporate banner in Primary Navy #10364E */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-[#10364E] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800"
        >
          {/* Subtle animated background ambient glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#1C6FA5] rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#4FA2D8] rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              NEXT STEPS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
              Ready to Start or Grow Your Business?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Get professional assistance for GST filing, business registrations, trademark protection and compliance support.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenContact}
                className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#10364E] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 group"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Contact Our Team</span>
              </Link>
            </div>

            {/* 3 Value Points */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Transparent Statutory Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Fast & Orderly Processing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Dedicated Professional Support</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
