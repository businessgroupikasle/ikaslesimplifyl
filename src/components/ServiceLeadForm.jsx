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

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
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

    // Keep a local copy and block rapid duplicate submissions (same as the main contact form)
    try {
      const stored = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      const duplicate = stored.some(
        (enq) =>
          (enq.email || '').toLowerCase() === form.email.toLowerCase() &&
          enq.service === service &&
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
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = res.ok ? await res.json().catch(() => ({})) : {};
      // Only claim success when the email was actually dispatched
      setStatus(result.delivered ? 'sent' : 'saved');
    } catch {
      setStatus('saved');
    } finally {
      setSubmitting(false);
      setForm(EMPTY);
    }
  };

  const fieldClass = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#10364E] placeholder:text-slate-400 outline-none transition-colors focus:border-[#1C6FA5] focus:ring-4 focus:ring-[#1C6FA5]/10 ${
      hasError ? 'border-red-400' : 'border-slate-300'
    }`;

  if (status === 'sent' || status === 'saved') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-8 shadow-[0_28px_60px_-28px_rgba(16,54,78,0.45)] text-center">
        <span className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </span>
        <h3 className="mt-5 text-xl font-extrabold text-[#10364E]">Thank you, we&apos;ve got your request</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {status === 'sent'
            ? `Our ${service} specialist will contact you shortly.`
            : 'Your details are saved. If you do not hear from us soon, please call us directly.'}
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
          onClick={() => setStatus(null)}
          className="mt-4 block mx-auto text-xs font-semibold text-slate-500 hover:text-[#1C6FA5] transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-[0_28px_60px_-28px_rgba(16,54,78,0.45)]"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1C6FA5]">Free consultation</p>
      <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-[#10364E] leading-snug">
        Talk to our experts
      </h3>
      <p className="mt-1.5 text-xs text-slate-500">
        Share your details for <span className="font-semibold text-[#175B87]">{service}</span> and we will call you back.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor="lead-name" className="sr-only">Full name</label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={form.fullName}
            onChange={update('fullName')}
            aria-invalid={!!errors.fullName}
            className={fieldClass(errors.fullName)}
          />
          {errors.fullName && <p className="mt-1 text-[11px] text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="lead-phone" className="sr-only">Mobile number</label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Mobile number"
            value={form.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            className={fieldClass(errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-[11px] text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="sr-only">Email address</label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={form.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            className={fieldClass(errors.email)}
          />
          {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-message" className="sr-only">Your requirement (optional)</label>
          <textarea
            id="lead-message"
            rows={2}
            placeholder="Your requirement (optional)"
            value={form.message}
            onChange={update('message')}
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
        className="btn-shimmer mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#10364E] hover:bg-[#175B87] disabled:opacity-70 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10364E]/25 transition-colors"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending…</span>
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
