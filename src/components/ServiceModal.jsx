import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServiceModal({ service, isOpen, onClose, onSelectForInquiry }) {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 relative"
        >
          {/* Header - Theme #091923 */}
          <div className="bg-[#091923] text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold uppercase tracking-wider inline-block mb-3 border border-blue-700/50">
              {service.badge}
            </span>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                What We Deliver
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.details}
              </p>
            </div>

            {service.keyPoints && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                  Scope & Compliance Coverage
                </h4>
                <ul className="space-y-2.5">
                  {service.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectForInquiry(service.title);
                }}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-navy-900 hover:bg-[#0E3046] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Get Started with {service.title}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
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
