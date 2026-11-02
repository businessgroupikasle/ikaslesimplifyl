import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Building2, Check } from 'lucide-react';
import { Button, Container, Eyebrow } from './ui';
import { Link } from '../lib/router';
import { useContact } from '../lib/contact';
import { SERVICES } from '../data/site';
import heroImg from '../assets/hero_businesswoman.jpg';

const ROTATING = ['GST Filing', 'Trademark Protection', 'ROC Annual Filings', 'Tax & Audit Advisory', 'Private Limited Setup'];

function RotatingWord() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative block h-[1.12em] overflow-hidden text-brand" aria-live="off">
      <span className="sr-only">{ROTATING.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING[i]}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 whitespace-nowrap"
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { openContact } = useContact();

  const scrollToServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <Eyebrow className="mb-6">Business registration · Tax · Compliance</Eyebrow>

          <h1 className="text-display font-semibold">
            Simplifying business registrations,
            <RotatingWord />
            <span className="block">&amp; legal compliance</span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-7 text-fg-muted sm:text-lg sm:leading-8">
            Start, manage, and grow your enterprise with complete peace of mind. Get expert end-to-end assistance for GST filing, company
            incorporation, trademark security, and statutory ROC corporate compliance.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openContact()}>
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" onClick={scrollToServices}>
              Explore services <ArrowDown className="h-4 w-4 text-fg-subtle" />
            </Button>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="mb-3 text-xs text-fg-subtle">Jump to a practice area</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <Link key={s.href} to={s.href} className="chip transition-colors hover:border-line-strong hover:text-fg">
                    <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} /> {s.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-lg">
              <img
                src={heroImg}
                alt="Professional corporate compliance advisor"
                width="800"
                height="1000"
                fetchPriority="high"
                className="h-[420px] w-full rounded-xl object-cover object-top sm:h-[500px]"
              />
            </div>

            <div className="absolute -bottom-6 -left-3 w-[260px] rounded-xl border border-line bg-surface/95 p-4 shadow-lg backdrop-blur sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile h-10 w-10">
                  <Building2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Company Registration</p>
                  <p className="text-xs text-fg-subtle">Pvt Ltd, LLP, MSME &amp; OPC</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                {['Business registration support', 'GST filing assistance', 'Trademark & compliance'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-fg-muted">
                    <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
