import { useEffect, useState } from 'react';
import { CONTACT, normalizeService, whatsappLink } from '../data/site';

const EMPTY = { fullName: '', phone: '', email: '', service: 'GST Filing', businessName: '', message: '' };
const STORAGE_KEY = 'simplifyl_enquiries';
const ENDPOINT = '/api/enquiries';

export function validateEnquiry(data, { requireMessage = true } = {}) {
  const errors = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  const phone = data.phone.replace(/[\s-]/g, '');
  if (!phone) errors.phone = 'Phone number is required.';
  else if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a valid 10-digit mobile number.';

  if (!data.email.trim()) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.';

  if (!data.service) errors.service = 'Please choose a service.';
  if (requireMessage && data.message.trim().length < 10) {
    errors.message = 'Tell us a little about your requirement (at least 10 characters).';
  }
  return errors;
}

function summary(data) {
  return [
    `Hello Simplifyl team, I'd like a consultation about ${data.service}.`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    data.businessName && `Business: ${data.businessName}`,
    data.message && `Requirement: ${data.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Shared state + submission logic for the contact page form and the modal.
 *
 * status: null | 'submitting' | 'success' | 'duplicate' | 'offline'
 * 'offline' means the enquiry API is not reachable. Rather than pretending the
 * enquiry was received, we hand the visitor pre-filled WhatsApp / email links.
 */
export function useEnquiryForm({ preselectedService = '', requireMessage = true } = {}) {
  const [data, setData] = useState(() => ({ ...EMPTY, service: normalizeService(preselectedService) }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [fallback, setFallback] = useState(null);

  // Keep the service in sync when a CTA re-opens the form with a new context.
  useEffect(() => {
    if (preselectedService) setData((d) => ({ ...d, service: normalizeService(preselectedService) }));
  }, [preselectedService]);

  const field = (name) => ({
    id: `enq-${name}`,
    name,
    value: data[name],
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `enq-${name}-error` : undefined,
    onChange: (e) => {
      setData((d) => ({ ...d, [name]: e.target.value }));
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    },
  });

  const reset = () => {
    setData({ ...EMPTY, service: normalizeService(preselectedService) });
    setErrors({});
    setStatus(null);
    setFallback(null);
  };

  const submit = async (e) => {
    e?.preventDefault();
    const found = validateEnquiry(data, { requireMessage });
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }

    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      stored = [];
    }
    const isDuplicate = stored.some(
      (enq) =>
        enq.email?.toLowerCase() === data.email.toLowerCase() &&
        enq.service === data.service &&
        Date.now() - new Date(enq.submittedAt).getTime() < 5 * 60 * 1000,
    );
    if (isDuplicate) {
      setStatus('duplicate');
      return;
    }

    setStatus('submitting');
    const payload = { ...data, submittedAt: new Date().toISOString(), id: `ENQ-${Date.now()}` };

    let delivered = false;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      // An SPA rewrite can answer a POST with index.html and a 200, so only
      // trust a JSON response from a real endpoint.
      delivered = res.ok && (res.headers.get('content-type') || '').includes('application/json');
    } catch {
      delivered = false;
    }

    if (delivered) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, payload].slice(-20)));
      } catch {
        /* storage unavailable */
      }
      setStatus('success');
      setData({ ...EMPTY, service: data.service });
      return;
    }

    const text = summary(data);
    setFallback({
      whatsapp: whatsappLink(text),
      email: `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Consultation enquiry: ${data.service}`)}&body=${encodeURIComponent(text)}`,
    });
    setStatus('offline');
  };

  return { data, errors, status, fallback, field, submit, reset, setStatus };
}
