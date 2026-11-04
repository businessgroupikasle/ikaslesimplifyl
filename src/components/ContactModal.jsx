import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageCircle, AlertCircle, RotateCcw, Phone, Mail, Loader2 } from 'lucide-react';
import { validateFullName, validateEmail, validatePhone } from '../lib/validation';

export default function ContactModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: preselectedService || '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState(true);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
      setErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        service: preselectedService || '',
        message: ''
      });
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, preselectedService]);

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      service: preselectedService || '',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    const nameValidation = validateFullName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message;
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    if (!formData.service || !formData.service.trim()) {
      newErrors.service = 'Please select a valid service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      setError('Please review the highlighted fields and correct the validation errors.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      stored.push({
        ...payload,
        id: `ENQ-${Date.now()}`
      });
      localStorage.setItem('simplifyl_enquiries', JSON.stringify(stored));
    } catch {
      // ignore
    }

    let delivered = false;
    try {
      const [res] = await Promise.all([
        fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => ({ ok: false })),
        new Promise((resolve) => setTimeout(resolve, 2000)) // 2-second loader
      ]);
      const result = res && res.ok ? await res.json().catch(() => ({})) : {};
      delivered = Boolean(result.delivered);
      setConfirmationSent(Boolean(result.confirmationSent));
    } catch {
      // network error; the local backup above is still saved
    } finally {
      setIsSubmitting(false);
      setEmailDelivered(delivered);
      setSubmitted(true);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Simplifyl Team! I would like to consult about ${formData.service} for my business.`
    );
    window.open(`https://wa.me/917845132962?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#10364E]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 relative my-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="p-5 sm:p-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5]">
                CONSULTATION REQUEST
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#10364E] tracking-tight">
              Get a free consultation
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Speak with our tax and corporate compliance advisory team.
            </p>

            {error && (
              <div className="mt-2.5 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="my-5 p-5 rounded-xl bg-[#F4F8FB] border border-[#C1DEF0] text-center animate-in fade-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-10 h-10 text-[#1C6FA5] mx-auto mb-2" />
                <h4 className="text-xl font-extrabold text-[#10364E]">
                  {emailDelivered ? 'Sent Successfully!' : 'Enquiry Saved'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  {emailDelivered
                    ? `Your enquiry has been sent successfully. Our advisory desk will get in touch shortly.${confirmationSent ? ' A confirmation email is on its way to you.' : ''}`
                    : 'Your request is saved, but we could not confirm it reached our team. If you do not hear from us soon, please call +91 78451 32962.'}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        businessName: '',
                        service: preselectedService || '',
                        message: ''
                      });
                      setErrors({});
                      setError('');
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#10364E] hover:bg-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Submit Another Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full sm:w-auto px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#1C6FA5]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto px-3 py-2 rounded-full text-slate-500 hover:text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-3.5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^a-zA-Z\s.'’-]/g, '');
                        setFormData({ ...formData, name: val });
                        if (errors.name) {
                          const check = validateFullName(val);
                          setErrors((prev) => ({ ...prev, name: check.isValid ? undefined : check.message }));
                        }
                        if (error) setError('');
                      }}
                      onBlur={() => {
                        const check = validateFullName(formData.name);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, name: check.message }));
                        }
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:ring-[#1C6FA5]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        let raw = e.target.value.replace(/\D/g, '');
                        if (raw.length === 12 && raw.startsWith('91')) {
                          raw = raw.slice(2);
                        }
                        const val = raw.slice(0, 10);
                        setFormData({ ...formData, phone: val });
                        if (errors.phone) {
                          const check = validatePhone(val);
                          setErrors((prev) => ({ ...prev, phone: check.isValid ? undefined : check.message }));
                        }
                        if (error) setError('');
                      }}
                      onBlur={() => {
                        const check = validatePhone(formData.phone);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, phone: check.message }));
                        }
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:ring-[#1C6FA5]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, email: val });
                        if (errors.email) {
                          const check = validateEmail(val);
                          setErrors((prev) => ({ ...prev, email: check.isValid ? undefined : check.message }));
                        }
                        if (error) setError('');
                      }}
                      onBlur={() => {
                        const check = validateEmail(formData.email);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, email: check.message }));
                        }
                      }}
                      placeholder="you@company.com"
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:ring-[#1C6FA5]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-700 mb-1">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="modal-service"
                      value={formData.service}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, service: val });
                        if (errors.service) setErrors((prev) => ({ ...prev, service: val ? undefined : 'Please select a valid service.' }));
                        if (error) setError('');
                      }}
                      onBlur={() => {
                        if (!formData.service || !formData.service.trim()) {
                          setErrors((prev) => ({ ...prev, service: 'Please select a valid service.' }));
                        }
                      }}
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.service
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:ring-[#1C6FA5]'
                      }`}
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="GST Filing">GST Filing</option>
                      <option value="Business Registration">Business Registration</option>
                      <option value="Trademark Registration">Trademark Registration</option>
                      <option value="Compliance Support">Compliance Support</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    id="modal-message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you need help with..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] resize-none h-16"
                  />
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-5 rounded-xl bg-[#10364E] hover:bg-[#1C6FA5] text-white font-bold text-sm tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending... Please wait</span>
                      </>
                    ) : (
                      <>
                        <span>Submit enquiry</span>
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 mt-4">
              <a
                href="tel:+917845132962"
                className="flex items-center justify-center gap-1.5 py-2.5 hover:text-[#10364E] hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Call</span>
              </a>
              <button
                type="button"
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-1.5 border-x border-slate-200 py-2.5 hover:text-[#10364E] hover:bg-slate-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>WhatsApp</span>
              </button>
              <a
                href="mailto:businessgroupikasle@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2.5 hover:text-[#10364E] hover:bg-slate-100 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
