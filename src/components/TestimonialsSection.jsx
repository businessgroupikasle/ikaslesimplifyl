import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, Section, SectionHeader } from './ui';
import { useContact } from '../lib/contact';
import rahulImg from '../assets/client_rahul.jpg';

// NOTE: the second entry is a placeholder carried over from the original site.
// Replace it with a real, consented client testimonial before launch.
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul S.',
    role: 'Business Owner',
    company: 'Apex Retail Tech',
    category: 'GST Filing & Compliance',
    feedback:
      'Simplifyl made our GST filing and registration process easy and orderly. Their team is professional, responsive, and always helpful with compliance queries.',
    image: rahulImg,
    verified: true,
  },
  {
    id: 2,
    name: 'Client Feedback Placeholder',
    role: 'Verified Business Client',
    company: 'Corporate Enterprise',
    category: 'Private Limited Incorporation',
    feedback: 'Document collection was transparent and straightforward. The incorporation process was guided with clarity at every milestone.',
    image: null,
    verified: true,
  },
];

export default function TestimonialsSection() {
  const { openContact } = useContact();
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];
  const go = (dir) => setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <Section>
      <SectionHeader
        align="center"
        eyebrow="Client experiences"
        title="What our clients say"
        description="Real feedback from business owners and founders who rely on our consultancy for their regulatory requirements."
      />

      <div className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden p-8 shadow-sm sm:p-12">
          <Quote className="absolute right-8 top-8 h-12 w-12 text-line-strong" aria-hidden="true" />
          <span className="chip chip-brand">{current.category}</span>

          <div className="mt-6 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-xl font-medium leading-relaxed tracking-tight text-fg sm:text-2xl"
              >
                “{current.feedback}”
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {current.image ? (
                <img src={current.image} alt="" width="44" height="44" className="h-11 w-11 rounded-full border border-line object-cover" />
              ) : (
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand-ink">
                  {current.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-fg">
                  {current.name}
                  {current.verified && <BadgeCheck className="h-4 w-4 text-brand" aria-label="Verified client" />}
                </p>
                <p className="text-xs text-fg-subtle">
                  {current.role} · {current.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="btn btn-secondary h-9 w-9 p-0">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-mono text-xs text-fg-subtle">
                {String(index + 1).padStart(2, '0')}/{String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="btn btn-secondary h-9 w-9 p-0">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-fg-subtle">
          Are you an existing client?{' '}
          <button type="button" onClick={() => openContact()} className="link">
            Share your feedback with our team
          </button>
        </p>
      </div>
    </Section>
  );
}
