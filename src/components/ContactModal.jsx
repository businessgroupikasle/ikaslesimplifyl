import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import EnquiryForm from './EnquiryForm';
import { CONTACT, whatsappLink } from '../data/site';

export default function ContactModal({ isOpen, onClose, preselectedService = '' }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        // Keep keyboard focus inside the dialog.
        const nodes = panelRef.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.querySelector('input')?.focus(), 60);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-modal"
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-[#0A0F1A]/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-line bg-surface shadow-lg sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/95 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">Consultation request</p>
                <h2 id="contact-modal-title" className="mt-2 text-xl font-semibold tracking-tight">
                  Get a free consultation
                </h2>
                <p className="mt-1 text-sm text-fg-muted">Speak with our tax and corporate compliance advisory team.</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close dialog" className="btn btn-ghost -mr-2 h-9 w-9 shrink-0 p-0">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <EnquiryForm compact preselectedService={preselectedService} onDone={onClose} />
            </div>

            <div className="grid grid-cols-3 border-t border-line bg-sunken text-xs font-medium text-fg-muted">
              <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-1.5 py-3.5 transition-colors hover:text-fg">
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a
                href={whatsappLink(`Hello Simplifyl Team! I would like to consult about ${preselectedService || 'your services'} for my business.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 border-x border-line py-3.5 transition-colors hover:text-fg"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-1.5 py-3.5 transition-colors hover:text-fg">
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
