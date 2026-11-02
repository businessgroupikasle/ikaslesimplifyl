import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS, ARTICLES } from '../data/mockData';

export default function TestimonialsInsights({ onSelectArticle, onOpenContact }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = TESTIMONIALS[currentTestimonial];

  return (
    <section id="insights" className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Client Testimonials */}
          <div className="lg:col-span-5 flex flex-col h-full justify-between">
            <div className="mb-4">
              <span className="neo-badge neo-badge-navy mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                CLIENT TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Trusted by 5,000+ <br />
                <span className="text-gradient-blue">Founders & CFOs</span>
              </h2>
            </div>

            {/* Testimonial Card - Elevated Neo-Corporate Card */}
            <div className="neo-card p-7 sm:p-8 relative flex flex-col justify-between min-h-[320px]">
              {/* Star Rating & Quote Mark Watermark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-500">5.0 Verified</span>
                </div>
                <Quote className="w-8 h-8 text-blue-700/20 rotate-180" />
              </div>

              <div className="relative overflow-hidden flex-1 my-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-base sm:text-lg text-navy-900 font-medium leading-relaxed italic">
                      "{activeReview.quote}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author & Slider Controls */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeReview.image}
                    alt={activeReview.name}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 leading-tight">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5 font-medium">
                      {activeReview.role} • {activeReview.company}
                    </p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-navy-900 hover:text-white border border-slate-200 text-navy-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-navy-900 hover:text-white border border-slate-200 text-navy-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Latest Insights */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Header */}
            <div>
              <span className="neo-badge neo-badge-blue mb-3">
                REGULATORY INTELLIGENCE
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    Read Our Latest Articles
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Stay informed with expert insights on compliance, taxation, and statutory growth.
                  </p>
                </div>

                <button
                  onClick={() => onSelectArticle(ARTICLES[0])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-blue-700 transition-colors whitespace-nowrap group self-start sm:self-auto"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 3 Articles Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {ARTICLES.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  onClick={() => onSelectArticle(article)}
                  className="neo-card p-3.5 group cursor-pointer flex flex-col hover:border-blue-400 hover:shadow-[0_20px_35px_-10px_rgba(37,99,235,0.18)] transition-all duration-300 card-glow"
                >
                  {/* Article Thumbnail */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      width="600"
                      height="448"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Date & Read Time */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <span className="neo-badge neo-badge-blue text-[10px] px-2 py-0.5">
                      {article.date}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-sm font-bold text-navy-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Read More Link */}
                  <div className="mt-3.5 pt-2 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:gap-2 transition-all">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
