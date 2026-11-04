import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function ArticleModal({ article, isOpen, onClose, onOpenContact }) {
  if (!isOpen || !article) return null;

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

          {/* Article Banner Image */}
          <div className="relative w-full h-56 sm:h-64 flex-shrink-0 bg-slate-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="px-3 py-1 rounded-full bg-navy-900/90 text-blue-200 text-[11px] font-semibold uppercase tracking-wider inline-block mb-2 border border-blue-500/30">
                {article.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold leading-tight text-white">
                {article.title}
              </h3>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
            <div className="flex items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1.5 font-semibold text-blue-700">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {article.summary}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {article.content}
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 my-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Professional Compliance Takeaway
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need guidance tailored to your company's turnover and industry? Our compliance advisory desk assists with GST registrations, entity structuring, and IP protection.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-navy-900 hover:bg-[#0E3046] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Consult Our Specialist</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
