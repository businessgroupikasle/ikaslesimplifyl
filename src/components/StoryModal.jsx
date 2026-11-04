import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Target, HeartHandshake, ArrowRight } from 'lucide-react';
import receptionImg from '../assets/office_reception.jpg';

export default function StoryModal({ isOpen, onClose, onOpenContact }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-48 sm:h-56 flex-shrink-0 bg-slate-100">
            <img
              src={receptionImg}
              alt="Simplifyl Corporate Headquarters Reception and Office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091923]/90 via-[#091923]/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
                OUR JOURNEY & VISION
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                The Story Behind Simplifyl
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Simplifyl Compliance Solutions was founded with a singular purpose: to remove the friction, anxiety, and confusion that entrepreneurs face when dealing with regulatory filings, corporate law, and statutory compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <Target className="w-6 h-6 text-navy-900 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-navy-900">Zero Complexity</h4>
                <p className="text-[11px] text-slate-500 mt-1">Demystifying tax and corporate law into clear steps.</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <ShieldCheck className="w-6 h-6 text-navy-900 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-navy-900">Ironclad Trust</h4>
                <p className="text-[11px] text-slate-500 mt-1">Rigorous adherence to Ministry & tax guidelines.</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <HeartHandshake className="w-6 h-6 text-navy-900 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-navy-900">Founder First</h4>
                <p className="text-[11px] text-slate-500 mt-1">Empowering businesses to focus on expansion.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Today, our nationwide network of senior Chartered Accountants, Company Secretaries, and Trademark Attorneys partners with high-growth startups, established SMEs, and sole proprietors to ensure 100% timely filings and flawless compliance.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-navy-900 hover:bg-[#0E3046] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Partner with Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
