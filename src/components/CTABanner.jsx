import React from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Container, Reveal } from './ui';
import { Button } from './ui';
import { useContact } from '../lib/contact';
import { CONTACT } from '../data/site';

/** Closing call-to-action used at the bottom of the home page and every inner page. */
export default function CTABanner({
  eyebrow = 'Next steps',
  title = 'Ready to start or grow your business?',
  description = 'Get professional assistance for GST filing, business registrations, trademark protection and compliance support.',
  service,
  points = ['Transparent statutory fees', 'Fast & orderly processing', 'Dedicated professional support'],
  primaryLabel = 'Get free consultation',
}) {
  const { openContact } = useContact();

  return (
    <section className="section">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-2xl bg-inverse px-6 py-12 text-inverse-fg sm:px-12 sm:py-16 lg:px-16">
          {/* Decorative lines + glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 70% 90% at 85% 10%, #000 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 85% 10%, #000 20%, transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand/40 blur-3xl"
          />

          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-inverse-muted">
                <span className="h-px w-5 bg-inverse-muted/60" />
                {eyebrow}
              </span>
              <h2 className="mt-4 text-h2 font-semibold text-white">{title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-inverse-muted sm:text-[17px]">{description}</p>
              {points?.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {points.map((p) => (
                    <li key={p} className="inline-flex items-center gap-2 text-sm text-white/85">
                      <Check className="h-4 w-4 text-[#8FA8FF]" strokeWidth={2.5} /> {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <Button variant="inverse" size="lg" onClick={() => openContact(service)}>
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="inverse-outline" size="lg" href={CONTACT.phoneHref}>
                <Phone className="h-4 w-4" /> Call {CONTACT.phoneDisplay}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
