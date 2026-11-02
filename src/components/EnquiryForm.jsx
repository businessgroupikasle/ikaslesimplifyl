import React from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react';
import { Button, Field } from './ui';
import { useEnquiryForm } from '../lib/useEnquiryForm';
import { SERVICE_OPTIONS } from '../data/site';
import { cn } from '../lib/utils';
import { Link } from '../lib/router';

function StatusPanel({ status, fallback, onReset, onDone }) {
  if (status === 'success') {
    return (
      <div className="rounded-xl border border-line bg-sunken p-6 text-center sm:p-8" role="status">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h4 className="mt-4 text-lg font-semibold">Enquiry received</h4>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-fg-muted">
          Thank you for contacting Simplifyl. Our specialists will review your requirements and get in touch within 1 business day.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          {onDone && <Button onClick={onDone}>Done</Button>}
          <Button variant="secondary" onClick={onReset}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'offline' && fallback) {
    return (
      <div className="rounded-xl border border-warn-line bg-warn-soft p-6 sm:p-7" role="alert">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
          <div>
            <h4 className="text-base font-semibold text-warn-ink">One more step to reach us</h4>
            <p className="mt-1.5 text-sm leading-6 text-warn-ink/90">
              Our online form couldn't deliver your enquiry right now. Your details are ready to send — choose WhatsApp or email and
              press send.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button href={fallback.whatsapp}>
            <MessageCircle className="h-4 w-4" /> Send on WhatsApp
          </Button>
          <Button variant="secondary" href={fallback.email}>
            <Mail className="h-4 w-4" /> Send by email
          </Button>
        </div>
        <button type="button" onClick={onReset} className="mt-4 text-sm font-medium text-warn-ink underline underline-offset-4">
          Edit my details
        </button>
      </div>
    );
  }

  return null;
}

export default function EnquiryForm({ preselectedService, compact = false, onDone }) {
  const { errors, status, fallback, field, submit, reset, setStatus } = useEnquiryForm({
    preselectedService,
    requireMessage: !compact,
  });

  if (status === 'success' || status === 'offline') {
    return <StatusPanel status={status} fallback={fallback} onReset={status === 'offline' ? () => setStatus(null) : reset} onDone={onDone} />;
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {status === 'duplicate' && (
        <div className="flex items-start gap-3 rounded-lg border border-warn-line bg-warn-soft p-4 text-sm leading-6 text-warn-ink" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
          <p>
            <strong className="font-semibold">You've already sent this enquiry.</strong> Our team is reviewing your details. For urgent
            updates, please call our advisory line directly.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="enq-fullName" error={errors.fullName}>
          <input type="text" autoComplete="name" placeholder="e.g. Rahul Sharma" className="field-input" {...field('fullName')} />
        </Field>
        <Field label="Phone number" htmlFor="enq-phone" error={errors.phone}>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 98765 43210" className="field-input" {...field('phone')} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email address" htmlFor="enq-email" error={errors.email}>
          <input type="email" autoComplete="email" placeholder="you@company.com" className="field-input" {...field('email')} />
        </Field>
        <Field label="Service" htmlFor="enq-service" error={errors.service}>
          <div className="relative">
            <select className="field-input appearance-none pr-9" {...field('service')}>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-current text-fg-subtle"
            >
              <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
            </svg>
          </div>
        </Field>
      </div>

      {!compact && (
        <Field label="Business name" optional htmlFor="enq-businessName">
          <input type="text" autoComplete="organization" placeholder="e.g. Apex Enterprises Pvt Ltd" className="field-input" {...field('businessName')} />
        </Field>
      )}

      <Field label={compact ? 'Message' : 'Your requirement'} optional={compact} htmlFor="enq-message" error={errors.message}>
        <textarea
          rows={compact ? 3 : 4}
          placeholder="Briefly describe what you need help with…"
          className="field-input resize-none"
          {...field('message')}
        />
      </Field>

      <div className={cn('flex flex-col gap-3 pt-1', !compact && 'sm:flex-row sm:items-center sm:justify-between')}>
        {!compact && (
          <p className="text-xs leading-5 text-fg-subtle sm:max-w-xs">
            We use these details only to respond to your enquiry. See our{' '}
            <Link to="/privacy-policy" className="link">
              privacy policy
            </Link>
            .
          </p>
        )}
        <Button type="submit" size="lg" disabled={submitting} className={cn(compact ? 'w-full' : 'w-full sm:w-auto')}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Submit enquiry <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
