import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Loader2,
  Info,
  RotateCcw
} from 'lucide-react';
import deskImg from '../assets/desk_workspace.jpg';
import { validateFullName, validateEmail, validatePhone } from '../lib/validation';

export default function ContactSection({ preselectedService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || '',
    businessName: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'duplicate' | 'error'
  const [backendNotice, setBackendNotice] = useState(null);
  const [emailDelivered, setEmailDelivered] = useState(true);

  const validate = () => {
    const newErrors = {};

    const nameValidation = validateFullName(formData.fullName);
    if (!nameValidation.isValid) {
      newErrors.fullName = nameValidation.message;
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

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide details about your enquiry (min 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendNotice(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const submissionTime = new Date().toISOString();
    const enquiryPayload = {
      ...formData,
      submittedAt: submissionTime,
      id: `ENQ-${Date.now()}`
    };

    // 1. Prevent duplicate rapid submissions within 30 seconds
    try {
      const storedEnquiries = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      const isDuplicate = storedEnquiries.some(
        (enq) =>
          enq.email.toLowerCase() === formData.email.toLowerCase() &&
          enq.service === formData.service &&
          (enq.message || '').trim() === formData.message.trim() &&
          Date.now() - new Date(enq.submittedAt).getTime() < 30 * 1000
      );

      if (isDuplicate) {
        setIsSubmitting(false);
        setSubmitStatus('duplicate');
        return;
      }

      // Store in client persistent cache
      storedEnquiries.push(enquiryPayload);
      localStorage.setItem('simplifyl_enquiries', JSON.stringify(storedEnquiries));
    } catch {
      // Local storage disabled / error
    }

    // 2. Backend API integration attempt with guaranteed 2-second loading feedback
    try {
      const [response] = await Promise.all([
        fetch('/api/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(enquiryPayload)
        }).catch((err) => ({ ok: false, error: err })),
        new Promise((resolve) => setTimeout(resolve, 2000)) // 2-second loader
      ]);

      if (response && response.ok) {
        const result = await response.json().catch(() => ({}));
        setEmailDelivered(Boolean(result.delivered));
        setSubmitStatus('success');
        setBackendNotice({
          type: 'connected',
          text: result.delivered
            ? result.confirmationSent
              ? 'Your enquiry has been delivered to our advisory team, and a thank-you confirmation email has been sent to your email.'
              : 'Your enquiry has been emailed to our advisory team.'
            : 'Your enquiry is saved, but we could not confirm it reached our team. If you do not hear from us within 1 business day, please call +91 78451 32962.'
        });
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: preselectedService || '',
          businessName: '',
          message: ''
        });
      } else {
        // Backend API returned non-200
        setEmailDelivered(false);
        setSubmitStatus('success');
        setBackendNotice({
          type: 'missing_backend',
          text: 'Your enquiry is saved, but we could not confirm it reached our team. If you do not hear from us within 1 business day, please call +91 78451 32962.'
        });
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: preselectedService || '',
          businessName: '',
          message: ''
        });
      }
    } catch {
      // Network failure or pure frontend development server
      setEmailDelivered(false);
      setSubmitStatus('success');
      setBackendNotice({
        type: 'missing_backend',
        text: 'Your enquiry is saved, but we could not confirm it reached our team. If you do not hear from us within 1 business day, please call +91 78451 32962.'
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: preselectedService || '',
        businessName: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
            <span className="text-xs font-bold text-[#1C6FA5] tracking-wider uppercase">
              REACH OUR TEAM
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10364E] tracking-tight">
            Consult With Our Specialists
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Share your requirements below. Our regulatory advisory team will review your details and respond with a clear roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Side: Contact Information & Visual Image */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Workspace Image Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group bg-white">
              <div className="w-full aspect-[16/9] overflow-hidden relative">
                <img
                  src={deskImg}
                  alt="Simplifyl Advisory Workspace & Client Helpdesk"
                  width="600"
                  height="340"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-tight drop-shadow-xs">Coimbatore Advisory Desk</p>
                  <p className="text-[11px] text-blue-100 font-medium">Pan-India Regulatory Consultation</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-slate-200">
              <h3 className="text-lg font-bold text-[#10364E] mb-1">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Reach us directly for urgent compliance or filing support.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Phone Number
                    </span>
                    <a
                      href="tel:+917845132962"
                      className="text-sm font-semibold text-[#10364E] hover:text-[#1C6FA5] transition-colors"
                    >
                      +91 78451 32962
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      WhatsApp Business
                    </span>
                    <a
                      href="https://wa.me/917845132962"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#10364E] hover:text-[#1C6FA5] transition-colors"
                    >
                      Chat with Support
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href="mailto:businessgroupikasle@gmail.com"
                      className="text-sm font-semibold text-[#10364E] hover:text-[#1C6FA5] transition-colors"
                    >
                      businessgroupikasle@gmail.com
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Office Address
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      1639/ A, 2nd Floor, Hopes, Coimbatore, India- 641004
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Business Hours
                    </span>
                    <p className="text-xs text-slate-700">
                      Monday – Saturday: 9:30 AM – 6:30 PM IST<br />
                      Sunday: Closed (Emergency Filings Monitored)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-relaxed">
                All client enquiries are handled under strict confidentiality agreements. Your commercial information is never shared with third parties.
              </p>
            </div>
          </div>

          {/* Right Side: Functional Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-[#10364E] dark:text-white mb-1">
                Submit an Enquiry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill in the details below to receive a response from our advisory team.
              </p>

              {/* Duplicate Notice */}
              {submitStatus === 'duplicate' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Duplicate Enquiry Detected</p>
                    <p className="mt-0.5">
                      You have submitted an enquiry with these exact details just moments ago. Our advisory team is already reviewing your request.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus(null);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          service: preselectedService || '',
                          businessName: '',
                          message: ''
                        });
                        setErrors({});
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Start a Fresh Enquiry</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Success State Panel with "Submit Another Enquiry" Button */}
              {submitStatus === 'success' ? (
                <div className="py-8 px-6 rounded-2xl bg-[#F4F8FB] border border-[#C1DEF0] text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-[#E3EFF8] border border-[#C1DEF0] flex items-center justify-center mx-auto mb-4 text-[#1C6FA5]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-[#10364E]">
                    {emailDelivered ? 'Sent Successfully!' : 'Enquiry Saved'}
                  </h4>
                  {emailDelivered && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your enquiry has been sent successfully. Our compliance and tax advisory team will review your requirements and reach out within 1 business day.
                    </p>
                  )}

                  {backendNotice && (
                    <div className="mt-4 p-3 rounded-lg bg-white border border-[#C1DEF0] max-w-md mx-auto text-xs text-slate-600 flex items-start gap-2 text-left shadow-xs">
                      <Info className="w-4 h-4 text-[#1C6FA5] shrink-0 mt-0.5" />
                      <span>{backendNotice.text}</span>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus(null);
                        setBackendNotice(null);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          service: preselectedService || '',
                          businessName: '',
                          message: ''
                        });
                        setErrors({});
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#10364E] hover:bg-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Enquiry</span>
                    </button>

                    <a
                      href="https://wa.me/917845132962?text=Hello%20Simplifyl%20Team!%20I%20would%20like%20to%20consult%20with%20an%20expert."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#1C6FA5]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^a-zA-Z\s.'’-]/g, '');
                        setFormData({ ...formData, fullName: val });
                        if (errors.fullName) {
                          const check = validateFullName(val);
                          setErrors((prev) => ({ ...prev, fullName: check.isValid ? null : check.message }));
                        }
                      }}
                      onBlur={() => {
                        const check = validateFullName(formData.fullName);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, fullName: check.message }));
                        }
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors ${
                        errors.fullName ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        let raw = e.target.value.replace(/\D/g, '');
                        if (raw.length === 12 && raw.startsWith('91')) {
                          raw = raw.slice(2);
                        } else if (raw.length === 11 && raw.startsWith('0')) {
                          raw = raw.slice(1);
                        }
                        const isOverLimit = raw.length > 10;
                        const val = raw.slice(0, 10);
                        setFormData({ ...formData, phone: val });

                        if (isOverLimit) {
                          setErrors((prev) => ({ ...prev, phone: 'Phone number cannot exceed 10 digits.' }));
                        } else if (!val) {
                          setErrors((prev) => ({ ...prev, phone: null }));
                        } else if (!/^[6-9]/.test(val)) {
                          setErrors((prev) => ({ ...prev, phone: 'Mobile number must start with 6, 7, 8, or 9.' }));
                        } else if (val.length === 10) {
                          const check = validatePhone(val);
                          setErrors((prev) => ({ ...prev, phone: check.isValid ? null : check.message }));
                        } else {
                          setErrors((prev) => ({
                            ...prev,
                            phone: prev.phone && prev.phone.includes('must start with') ? null : prev.phone
                          }));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          /^\d$/.test(e.key) &&
                          formData.phone.length >= 10 &&
                          e.target.selectionStart === e.target.selectionEnd &&
                          !e.ctrlKey &&
                          !e.metaKey
                        ) {
                          e.preventDefault();
                          setErrors((prev) => ({
                            ...prev,
                            phone: 'Indian mobile number is limited to 10 digits.'
                          }));
                        }
                      }}
                      onBlur={() => {
                        const check = validatePhone(formData.phone);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, phone: check.message }));
                        } else {
                          setErrors((prev) => ({ ...prev, phone: null }));
                        }
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email Address & Select Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, email: val });
                        if (errors.email) {
                          const check = validateEmail(val);
                          setErrors((prev) => ({ ...prev, email: check.isValid ? null : check.message }));
                        }
                      }}
                      onBlur={() => {
                        const check = validateEmail(formData.email);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, email: check.message }));
                        }
                      }}
                      placeholder="e.g. rahul@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      Select Service *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, service: val });
                        if (errors.service) setErrors((prev) => ({ ...prev, service: val ? null : 'Please select a valid service.' }));
                      }}
                      onBlur={() => {
                        if (!formData.service || !formData.service.trim()) {
                          setErrors((prev) => ({ ...prev, service: 'Please select a valid service.' }));
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.service
                          ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20 focus:ring-red-400'
                          : 'border-slate-300 dark:border-slate-700 focus:border-[#1C6FA5]'
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
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.service}</p>
                    )}
                  </div>
                </div>

                {/* Business Name (Optional) */}
                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Business Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Enterprises Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#10364E] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Message / Requirements *
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    placeholder="Briefly describe your requirements or questions..."
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors resize-none ${
                      errors.message ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#10364E] hover:bg-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending... Please wait</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
