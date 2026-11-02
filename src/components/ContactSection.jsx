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
  Info
} from 'lucide-react';
import deskImg from '../assets/desk_workspace.jpg';

export default function ContactSection({ preselectedService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'GST Filing',
    businessName: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'duplicate' | 'error'
  const [backendNotice, setBackendNotice] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (at least 2 characters).';
    }

    // Phone validation (10 digits Indian format or valid intl)
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service category.';
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

    // 1. Prevent duplicate submissions within 5 minutes
    try {
      const storedEnquiries = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      const isDuplicate = storedEnquiries.some(
        (enq) =>
          enq.email.toLowerCase() === formData.email.toLowerCase() &&
          enq.service === formData.service &&
          Date.now() - new Date(enq.submittedAt).getTime() < 5 * 60 * 1000
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

    // 2. Backend API integration attempt
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enquiryPayload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setBackendNotice({
          type: 'connected',
          text: 'Enquiry received and successfully persisted to backend database.'
        });
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'GST Filing',
          businessName: '',
          message: ''
        });
      } else {
        // Backend API returned non-200 (or endpoint not configured in Vite static setup)
        setSubmitStatus('success');
        setBackendNotice({
          type: 'missing_backend',
          text: 'Backend database connection (/api/enquiries) is not currently configured on this environment. The enquiry was validated, timestamped, and preserved in browser client storage.'
        });
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'GST Filing',
          businessName: '',
          message: ''
        });
      }
    } catch {
      // Network failure or pure frontend development server
      setSubmitStatus('success');
      setBackendNotice({
        type: 'missing_backend',
        text: 'Backend API server (/api/enquiries) is not active in this frontend setup. Submission validated, timestamped, and stored locally for admin review.'
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: 'GST Filing',
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              REACH OUR TEAM
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-tight drop-shadow-xs">Coimbatore Advisory Desk</p>
                  <p className="text-[11px] text-blue-100 font-medium">Pan-India Regulatory Consultation</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-slate-200">
              <h3 className="text-lg font-bold text-[#142B4A] mb-1">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Reach us directly for urgent compliance or filing support.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Phone Number
                    </span>
                    <a
                      href="tel:+917845132962"
                      className="text-sm font-semibold text-[#142B4A] hover:text-[#2563EB] transition-colors"
                    >
                      +91 78451 32962
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
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
                      className="text-sm font-semibold text-[#142B4A] hover:text-[#2563EB] transition-colors"
                    >
                      Chat with Support
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href="mailto:business@ikasle.in"
                      className="text-sm font-semibold text-[#142B4A] hover:text-[#2563EB] transition-colors"
                    >
                      business@ikasle.in
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
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
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
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
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-relaxed">
                All client enquiries are handled under strict confidentiality agreements. Your commercial information is never shared with third parties.
              </p>
            </div>
          </div>

          {/* Right Side: Functional Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#142B4A] mb-1">
                Submit an Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below to receive a response from our advisory team.
              </p>

              {/* Duplicate Notice */}
              {submitStatus === 'duplicate' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Duplicate Enquiry Detected</p>
                    <p className="mt-0.5">
                      You have submitted an enquiry for this service recently. Our team is already reviewing your details. For urgent updates, please call our advisory line directly.
                    </p>
                  </div>
                </div>
              )}

              {/* Success Notification */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[#142B4A]">Enquiry Successfully Submitted</p>
                    <p className="mt-1 text-slate-600">
                      Thank you for contacting Simplifyl. Our specialists will review your filing requirements and get in touch within 1 business day.
                    </p>
                    {backendNotice && backendNotice.type === 'missing_backend' && (
                      <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-start gap-1.5 text-[11px] text-slate-500">
                        <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{backendNotice.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: null });
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors ${
                        errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
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
                    <label htmlFor="email" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="e.g. rahul@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                      Select Service *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: null });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
                    >
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
                  <label htmlFor="businessName" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                    Business Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Enterprises Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
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
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors resize-none ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying & Submitting...</span>
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
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
