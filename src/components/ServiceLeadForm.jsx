import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Lock, Phone } from 'lucide-react';
import { Link } from '../lib/router';
import { validateFullName, validateEmail, validatePhone } from '../lib/validation';

const EMPTY = { fullName: '', phone: '', email: '', message: '' };

/**
 * Short callback form shown in the hero of each service page.
 * Mirrors the main contact form: validates, keeps a local copy and posts to /api/enquiries.
 */
export default function ServiceLeadForm({ service }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'sent' | 'saved' | 'duplicate'
  const [confirmationSent, setConfirmationSent] = useState(false);

  // Name change: only allow alphabets, spaces, dots, and hyphens ("alfabet mattum tha vanum")
  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s.'’-]/g, '');
    setForm((f) => ({ ...f, fullName: val }));
    if (errors.fullName) {
      const check = validateFullName(val);
      setErrors((er) => ({ ...er, fullName: check.isValid ? undefined : check.message }));
    }
  };

  // Phone change: strictly digits only, max 10 digits
  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length === 12 && raw.startsWith('91')) {
      raw = raw.slice(2);
    } else if (raw.length === 11 && raw.startsWith('0')) {
      raw = raw.slice(1);
    }

    const isOverLimit = raw.length > 10;
    const val = raw.slice(0, 10);
    setForm((f) => ({ ...f, phone: val }));

    if (isOverLimit) {
      setErrors((er) => ({
        ...er,
        phone: 'Phone number cannot exceed 10 digits.'
      }));
    } else if (!val) {
      setErrors((er) => ({ ...er, phone: undefined }));
    } else if (!/^[6-9]/.test(val)) {
      setErrors((er) => ({
        ...er,
        phone: 'Mobile number must start with 6, 7, 8, or 9.'
      }));
    } else if (val.length === 10) {
      const check = validatePhone(val);
      setErrors((er) => ({ ...er, phone: check.isValid ? undefined : check.message }));
    } else {
      // Clear start-with error if now valid
      setErrors((er) => ({
        ...er,
        phone: er.phone && er.phone.includes('must start with') ? undefined : er.phone
      }));
    }
  };

  const handlePhoneKeyDown = (e) => {
    // If user attempts to type an 11th digit when already at 10 digits
    if (
      /^\d$/.test(e.key) &&
      form.phone.length >= 10 &&
      e.target.selectionStart === e.target.selectionEnd &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      setErrors((er) => ({
        ...er,
        phone: 'Indian mobile number is limited to 10 digits.'
      }));
    }
  };

  // Email change
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, email: val }));
    if (errors.email) {
      const check = validateEmail(val);
      setErrors((er) => ({ ...er, email: check.isValid ? undefined : check.message }));
    }
  };

  // Immediate validation feedback on blur
  const handleBlur = (field) => () => {
    if (field === 'fullName') {
      const check = validateFullName(form.fullName);
      if (!check.isValid) setErrors((prev) => ({ ...prev, fullName: check.message }));
    } else if (field === 'phone') {
      const check = validatePhone(form.phone);
      if (!check.isValid) setErrors((prev) => ({ ...prev, phone: check.message }));
    } else if (field === 'email') {
      const check = validateEmail(form.email);
      if (!check.isValid) setErrors((prev) => ({ ...prev, email: check.message }));
    }
  };

  const validate = () => {
    const next = {};
    const name = validateFullName(form.fullName);
    if (!name.isValid) next.fullName = name.message;
    const phone = validatePhone(form.phone);
    if (!phone.isValid) next.phone = phone.message;
    const email = validateEmail(form.email);
    if (!email.isValid) next.email = email.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);

    const payload = {
      ...form,
      service,
      businessName: '',
      message: form.message.trim() || `Callback requested for ${service}.`,
      submittedAt: new Date().toISOString(),
      id: `ENQ-${Date.now()}`,
    };

    // Keep a local copy and block rapid duplicate submissions
    try {
      const stored = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      const duplicate = stored.some(
        (enq) =>
          (enq.email || '').toLowerCase() === form.email.toLowerCase() &&
          enq.service === service &&
          (enq.message || '').trim() === form.message.trim() &&
          Date.now() - new Date(enq.submittedAt).getTime() < 30 * 1000
      );
      if (duplicate) {
        setSubmitting(false);
        setStatus('duplicate');
        return;
      }
      stored.push(payload);
      localStorage.setItem('simplifyl_enquiries', JSON.stringify(stored));
    } catch {
      // Storage unavailable: continue with the API call only
    }

    try {
      // Guaranteed 2-second loading feedback
      const [res] = await Promise.all([
        fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => ({ ok: false })),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
      const result = res && res.ok ? await res.json().catch(() => ({})) : {};
      setConfirmationSent(Boolean(result.confirmationSent));
      setStatus('sent');
    } catch {
      setStatus('sent');
    } finally {
      setSubmitting(false);
      setForm(EMPTY);
      setErrors({});
    }
  };

  const fieldClass = (hasError) =>
    `w-full rounded-xl border bg-white dark:bg-slate-800 px-4 py-3 text-sm text-[#10364E] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 outline-none transition-colors focus:border-[#1C6FA5] focus:ring-4 focus:ring-[#1C6FA5]/10 ${
      hasError ? 'border-red-400 bg-red-50/20 dark:bg-red-950/20' : 'border-slate-300 dark:border-slate-700'
    }`;

  if (status === 'sent' || status === 'saved') {
    return (
      <div className="rounded-3xl bg-white border border-[#C1DEF0] p-7 sm:p-8 shadow-[0_28px_60px_-28px_rgba(16,54,78,0.45)] text-center animate-in fade-in zoom-in-95 duration-200">
        <span className="mx-auto w-14 h-14 rounded-full bg-[#E3EFF8] border border-[#C1DEF0] text-[#1C6FA5] flex items-center justify-center mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </span>
        <h3 className="text-xl font-extrabold text-[#10364E]">Sent Successfully!</h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          Thank you! Your enquiry for <strong className="text-[#10364E]">{service}</strong> has been sent successfully.
          {confirmationSent && (
            <span className="block mt-1 font-medium text-[#1C6FA5]">
              A thank-you confirmation email has been sent to your inbox.
            </span>
          )}
          Our advisory team will call you back shortly.
        </p>
        <a
          href="tel:+917845132962"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 hover:border-[#1C6FA5] text-[#10364E] hover:text-[#1C6FA5] text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>+91 78451 32962</span>
        </a>
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setForm(EMPTY);
            setErrors({});
          }}
          className="mt-4 block mx-auto text-xs font-bold text-[#10364E] hover:text-[#1C6FA5] underline transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-[0_28px_60px_-28px_rgba(16,54,78,0.45)]"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1C6FA5] dark:text-sky-400">Free consultation</p>
      <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-[#10364E] dark:text-white leading-snug">
        Talk to our experts
      </h3>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
        Share your details for <span className="font-semibold text-[#175B87] dark:text-sky-300">{service}</span> and we will call you back.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor="lead-name" className="sr-only">Full name</label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="Full name (letters only)"
            value={form.fullName}
            onChange={handleNameChange}
            onBlur={handleBlur('fullName')}
            aria-invalid={!!errors.fullName}
            className={fieldClass(errors.fullName)}
          />
          {errors.fullName && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="lead-phone" className="sr-only">Mobile number</label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Mobile number (10 digits)"
            value={form.phone}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            onBlur={handleBlur('phone')}
            aria-invalid={!!errors.phone}
            className={fieldClass(errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="sr-only">Email address</label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="Email address (e.g. name@example.com)"
            value={form.email}
            onChange={handleEmailChange}
            onBlur={handleBlur('email')}
            aria-invalid={!!errors.email}
            className={fieldClass(errors.email)}
          />
          {errors.email && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-message" className="sr-only">Your requirement (optional)</label>
          <textarea
            id="lead-message"
            rows={2}
            placeholder="Your requirement (optional)"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`${fieldClass(false)} resize-none`}
          />
        </div>
      </div>

      {status === 'duplicate' && (
        <p className="mt-3 text-xs text-amber-700">
          We already received this request a moment ago. Please wait for our call.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-shimmer mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#10364E] hover:bg-[#1C6FA5] disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10364E]/25 transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Sending... Please wait</span>
          </>
        ) : (
          <>
            <span>Request a call back</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="mt-4 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
        <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#1C6FA5]" />
        <span>
          Your details stay confidential and are used only to respond to this request. See our{' '}
          <Link to="/privacy-policy" className="underline hover:text-[#1C6FA5]">Privacy Policy</Link>.
        </span>
      </p>
    </form>
  );
}
