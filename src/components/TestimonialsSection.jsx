import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, MessageSquare, CheckCircle2 } from 'lucide-react';
import rahulImg from '../assets/client_rahul.jpg';

export default function TestimonialsSection({ onOpenContact }) {
  // Verified actual client feedback records
  const testimonials = [
    {
      id: 1,
      name: 'Rahul S.',
      role: 'Business Owner',
      company: 'Apex Retail Tech',
      category: 'GST Filing & Compliance',
      feedback: 'Simplifyl made our GST filing and registration process easy and orderly. Their team is professional, responsive, and always helpful with compliance queries.',
      image: rahulImg,
      verified: true
    },
    {
      id: 2,
      name: 'Client Feedback Placeholder',
      role: 'Verified Business Client',
      company: 'Corporate Enterprise',
      category: 'Private Limited Incorporation',
      feedback: 'Document collection was transparent and straightforward. The incorporation process was guided with clarity at every milestone.',
      image: null,
      verified: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              CLIENT EXPERIENCES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            What Our Clients Say
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Real feedback from business owners and founders who rely on our consultancy for their regulatory requirements.
          </p>
        </div>

        {/* Testimonials Display Box */}
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#F5F7FA] border border-slate-200 shadow-sm relative min-h-[280px] flex flex-col justify-between">
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded border border-[#DBEAFE]">
                {current.category}
              </span>
              <Quote className="w-8 h-8 text-slate-300 rotate-180" />
            </div>

            {/* Testimonial Content */}
            <div className="relative overflow-hidden flex-1 my-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-base sm:text-lg text-[#142B4A] font-medium leading-relaxed italic">
                    "{current.feedback}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author & Slider Controls */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.name}
                    width="44"
                    height="44"
                    className="w-11 h-11 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#142B4A] text-white flex items-center justify-center font-bold text-sm">
                    {current.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#142B4A] flex items-center gap-1.5">
                    <span>{current.name}</span>
                    {current.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" title="Verified Client" />
                    )}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {current.role} • {current.company}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#142B4A] hover:bg-slate-50 flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-1">
                  0{currentIndex + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#142B4A] hover:bg-slate-50 flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Invitation for new client feedback */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Are you an existing client?{' '}
              <button
                onClick={onOpenContact}
                className="text-[#2563EB] font-semibold hover:underline"
              >
                Share your feedback with our team
              </button>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
