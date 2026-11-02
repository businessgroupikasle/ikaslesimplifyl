import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, MapPin, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: preselectedService || 'GST Filing',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please fill in your name, phone number, and email.');
      return;
    }

    try {
      const stored = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      stored.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        id: `ENQ-${Date.now()}`
      });
      localStorage.setItem('simplifyl_enquiries', JSON.stringify(stored));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Simplifyl Team! I would like to consult about ${formData.service} for my business.`
    );
    window.open(`https://wa.me/917845132962?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#142B4A]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                CONSULTATION REQUEST
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#142B4A]">
              Get Free Consultation
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Speak with our tax and corporate compliance advisory team.
            </p>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="my-6 p-6 rounded-xl bg-blue-50/70 border border-blue-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#2563EB] mx-auto mb-2" />
                <h4 className="text-base font-bold text-[#142B4A]">Enquiry Recorded</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your consultation request has been received. Our advisory desk will get in touch shortly.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={openWhatsApp}
                    className="px-4 py-2 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setError('');
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setError('');
                      }}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setError('');
                      }}
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="GST Filing">GST Filing</option>
                      <option value="Business Registration">Business Registration</option>
                      <option value="Trademark Registration">Trademark Registration</option>
                      <option value="Compliance Support">Compliance Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1">
                    Message / Requirements
                  </label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what service or advice you need..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-2.5 px-5 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Consultation Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Direct Call: +91 78451 32962</span>
              <span>business@ikasle.in</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
