import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Building2, ShieldCheck, FileText, Rocket, ArrowUpRight, Check } from 'lucide-react';
import { Link } from '../lib/router';

const STAGES = [
  {
    id: 'ideate',
    label: 'Ideate',
    title: 'Pick the right structure',
    icon: Lightbulb,
    href: '/tools#structure-finder',
    cta: 'Take the quiz',
    items: ['Entity comparison', 'Founder agreements', 'Tax planning call'],
    glow: 'from-amber-300 to-orange-400',
  },
  {
    id: 'register',
    label: 'Register',
    title: 'Incorporate your business',
    icon: Building2,
    href: '/business-registration',
    cta: 'Registration services',
    items: ['Pvt Ltd · LLP · OPC', 'PAN, TAN & DSC', 'Udyam MSME'],
    glow: 'from-sky-300 to-blue-500',
  },
  {
    id: 'protect',
    label: 'Protect',
    title: 'Secure your brand',
    icon: ShieldCheck,
    href: '/trademark-registration',
    cta: 'Trademark services',
    items: ['Trademark search', 'TM application', 'Objection replies'],
    glow: 'from-violet-300 to-indigo-500',
  },
  {
    id: 'operate',
    label: 'Operate',
    title: 'Stay tax compliant',
    icon: FileText,
    href: '/gst-filing',
    cta: 'GST services',
    items: ['GST registration', 'Monthly returns', 'ITC reconciliation'],
    glow: 'from-teal-300 to-emerald-500',
  },
  {
    id: 'scale',
    label: 'Scale',
    title: 'Grow with confidence',
    icon: Rocket,
    href: '/compliance-support',
    cta: 'Compliance support',
    items: ['ROC annual filings', 'Board & AGM support', 'Director KYC'],
    glow: 'from-rose-300 to-pink-500',
  },
];

export default function GrowthJourney() {
  const [active, setActive] = useState(1);
  const trackRef = useRef(null);
  const trackInView = useInView(trackRef, { once: true, margin: '-120px' });

  return (
    <section id="journey" className="relative py-20 lg:py-28 bg-[#0C1C32] text-white overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-[#2563EB] rounded-full blur-[140px] opacity-25 pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[460px] h-[460px] bg-indigo-500 rounded-full blur-[140px] opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
            Your Growth Journey
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            From first idea to{' '}
            <span className="font-script text-5xl sm:text-6xl bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
              enterprise
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            One partner for every stage of the business lifecycle. Tap a stage to see how we help.
          </p>
        </motion.div>

        {/* Desktop: horizontal track */}
        <div className="hidden lg:block mt-20">
          <div className="relative" ref={trackRef}>
            {/* track */}
            <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/10 rounded-full" />
            <motion.div
              className="absolute top-8 left-[10%] h-[2px] rounded-full bg-gradient-to-r from-amber-300 via-sky-400 to-pink-400 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
              initial={{ width: 0 }}
              animate={{ width: trackInView ? `${(active / (STAGES.length - 1)) * 80}%` : 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            />

            <div className="grid grid-cols-5 gap-4">
              {STAGES.map((s, i) => {
                const Icon = s.icon;
                const reached = i <= active;
                const isActive = i === active;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className="relative z-10 group"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="journey-halo"
                          className={`absolute -inset-3 rounded-[22px] bg-gradient-to-br ${s.glow} opacity-30 blur-md`}
                        />
                      )}
                      <span
                        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                          reached
                            ? `bg-gradient-to-br ${s.glow} border-white/20 text-[#0C1C32] shadow-xl`
                            : 'bg-[#142B4A] border-white/10 text-blue-200'
                        } ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                      >
                        <Icon className="w-7 h-7" />
                      </span>
                    </button>

                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
                      0{i + 1} · {s.label}
                    </p>

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.55,
                        y: isActive ? 0 : 6,
                      }}
                      transition={{ duration: 0.25 }}
                      className={`mt-4 w-full rounded-2xl p-5 border transition-colors ${
                        isActive ? 'bg-white/[0.08] border-white/20 backdrop-blur-sm' : 'bg-transparent border-transparent'
                      }`}
                    >
                      <p className="text-base font-extrabold text-white text-center">{s.title}</p>
                      <ul className="mt-3 space-y-1.5">
                        {s.items.map((it) => (
                          <li key={it} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" /> {it}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={s.href}
                        tabIndex={isActive ? 0 : -1}
                        className={`mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-300 hover:text-white transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {s.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="lg:hidden mt-12 relative border-l-2 border-white/10 ml-4 space-y-8">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="relative pl-10"
              >
                <span className={`absolute -left-[21px] top-0 w-10 h-10 rounded-xl bg-gradient-to-br ${s.glow} text-[#0C1C32] flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">0{i + 1} · {s.label}</p>
                <p className="mt-1 text-lg font-extrabold text-white">{s.title}</p>
                <p className="mt-1 text-xs text-slate-300">{s.items.join(' · ')}</p>
                <Link to={s.href} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-sky-300">
                  {s.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
