import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  Check,
  ChevronRight,
  FileText,
  Building2,
  ShieldCheck,
  FileCheck2,
  MessageSquare,
  Phone,
  Sparkles,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import ContactModal from './ContactModal';
import { Link } from '../lib/router';

// Registry used for the "explore other practice areas" cards.
const PRACTICE_AREAS = [
  {
    href: '/gst-filing',
    name: 'GST Filing',
    icon: FileText,
    blurb: 'Registration, GSTR-1 / 3B returns, annual filings and notice support.',
  },
  {
    href: '/business-registration',
    name: 'Business Registrations',
    icon: Building2,
    blurb: 'Private Limited, LLP, OPC, Partnership, Proprietorship and MSME setup.',
  },
  {
    href: '/trademark-registration',
    name: 'Trademark Services',
    icon: ShieldCheck,
    blurb: 'Brand search, Form TM-A filing, objection replies and renewals.',
  },
  {
    href: '/compliance-support',
    name: 'Compliance Support',
    icon: FileCheck2,
    blurb: 'Annual ROC filings, Director KYC, AGM minutes and secretarial support.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

function SectionHeading({ eyebrow, title, accent, intro, light = false, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          light ? 'bg-white/10 border border-white/10 text-blue-200' : 'bg-[#E3EFF8] text-[#1C6FA5]'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-[#10364E]'
        }`}
      >
        {title}
        {accent && (
          <>
            {' '}
            <span
              className={`font-script text-4xl sm:text-5xl ${
                light
                  ? 'bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent'
                  : 'text-[#1C6FA5]'
              }`}
            >
              {accent}
            </span>
          </>
        )}
      </h2>
      {intro && (
        <p className={`mt-4 text-sm sm:text-base leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * Shared premium layout for the four service detail pages.
 * Each page passes a `config` object (see the page files for the shape).
 */
export default function ServiceDetailLayout({ config }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);

  const {
    seo,
    preselectedService,
    icon: HeroIcon,
    image,
    imageAlt,
    practice,
    titleMain,
    titleAccent,
    intro,
    ctaLabel,
    breadcrumb,
    highlights,
    scope,
    steps,
    documents,
    notice,
    finalCta,
    currentHref,
  } = config;

  const ScopeIcon = scope.icon || HeroIcon;
  const related = PRACTICE_AREAS.filter((p) => p.href !== currentHref);
  const structured = scope.items.some((it) => it.features);

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        noIndex={false}
      />

      <Navbar onOpenContact={openContact} />

      <main className="flex-grow">
        {/* ───────────── Hero ───────────── */}
        <section className="relative bg-[#0C2332] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] bg-[#1C6FA5] rounded-full blur-[150px] opacity-30 pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[480px] h-[480px] bg-[#4FA2D8] rounded-full blur-[160px] opacity-15 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-24">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-white font-semibold">{breadcrumb}</span>
            </nav>

            <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#4FA2D8]" />
                  {practice}
                </span>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  {titleMain}{' '}
                  <span className="font-script text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">{intro}</p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={openContact}
                    className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1C6FA5] hover:bg-[#2686C5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#1C6FA5]/30 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{ctaLabel}</span>
                  </button>
                  <a
                    href="tel:+917845132962"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#4FA2D8]" />
                    <span>+91 78451 32962</span>
                  </a>
                </div>
              </motion.div>

              {/* Visual card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[36px] bg-[#1C6FA5]/25 blur-3xl pointer-events-none" />
                  <div className="relative aspect-[4/3.2] rounded-[28px] overflow-hidden border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                    <img
                      src={image}
                      alt={imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2332] via-[#10364E]/50 to-[#1C6FA5]/20" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] opacity-60" />

                    <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                      <HeroIcon className="w-6 h-6" />
                    </div>

                    <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 grid grid-cols-3 divide-x divide-white/15">
                      {highlights.map((h) => (
                        <div key={h.label} className="px-3 py-3.5 text-center">
                          <p className="text-base sm:text-lg font-extrabold text-white leading-none">{h.value}</p>
                          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 leading-tight">
                            {h.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Scope ───────────── */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-[#F4F8FB] to-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C1DEF0_1px,transparent_1px)] [background-size:26px_26px] opacity-40 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={scope.eyebrow}
              title={scope.title}
              accent={scope.accent}
              intro={scope.intro}
            />

            <div
              className={`mt-12 lg:mt-16 grid grid-cols-1 gap-5 lg:gap-6 ${
                structured ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {scope.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                  className="group glass-hover transition-all duration-300 relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute -top-3 right-4 text-7xl font-extrabold text-[#E3EFF8] group-hover:text-[#C1DEF0] transition-colors select-none pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shadow-md shadow-[#1C6FA5]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <ScopeIcon className="w-5 h-5" />
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] bg-[#F4F8FB] px-2.5 py-1 rounded-full border border-[#E3EFF8]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold text-[#10364E] leading-snug group-hover:text-[#1C6FA5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>

                    {item.features && (
                      <ul className="mt-5 pt-4 border-t border-slate-200/70 space-y-2">
                        {item.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {item.features && (
                    <button
                      type="button"
                      onClick={openContact}
                      className="relative mt-6 pt-4 border-t border-slate-200/70 inline-flex items-center gap-1.5 text-xs font-bold text-[#10364E] group-hover:text-[#1C6FA5] transition-colors"
                    >
                      <span>Inquire about {item.title.split('(')[0].trim()}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Process timeline (dark band) ───────────── */}
        {steps && (
          <section className="relative py-16 lg:py-24 bg-[#0C2332] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-[#1C6FA5] rounded-full blur-[140px] opacity-25 pointer-events-none" />
            <div className="absolute -bottom-40 -right-20 w-[460px] h-[460px] bg-[#4FA2D8] rounded-full blur-[140px] opacity-15 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                light
                eyebrow={steps.eyebrow}
                title={steps.title}
                accent={steps.accent}
                intro={steps.intro}
              />

              <div className="relative mt-14 lg:mt-20">
                <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#4FA2D8]/70 to-transparent" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {steps.items.map((st, i) => (
                    <motion.div
                      key={st.num}
                      {...fadeUp}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="relative pt-7"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4FA2D8] to-[#1C6FA5] text-white flex items-center justify-center font-mono font-extrabold text-lg shadow-[0_0_24px_rgba(79,162,216,0.45)] ring-4 ring-[#0C2332] z-10">
                        {st.num}
                      </div>
                      <div className="h-full pt-11 pb-6 px-5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md text-center hover:bg-white/[0.09] hover:border-white/20 transition-colors">
                        <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-blue-300">
                          {steps.label} {st.num}
                        </p>
                        <h3 className="mt-2 text-base font-extrabold text-white leading-snug">{st.title}</h3>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ───────────── Documents ───────────── */}
        {documents && (
          <section className="py-16 lg:py-24 bg-[#F4F8FB] border-y border-slate-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <SectionHeading
                  center={false}
                  eyebrow={documents.eyebrow}
                  title={documents.title}
                  accent={documents.accent}
                  intro={documents.intro}
                />
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{documents.note}</span>
                </div>
              </div>

              <ul className="lg:col-span-7 space-y-3">
                {documents.items.map((doc, i) => (
                  <motion.li
                    key={doc}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="glass-hover transition-all duration-300 flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)]"
                  >
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#1C6FA5]/20 font-mono text-xs font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-slate-700 leading-relaxed pt-1.5">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ───────────── Notice / risk callout ───────────── */}
        {notice && (
          <section className="py-14 lg:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    {notice.title && (
                      <h3 className="text-lg font-extrabold text-amber-950">{notice.title}</h3>
                    )}
                    <p className={`text-sm text-amber-900 leading-relaxed ${notice.title ? 'mt-2' : 'pt-2'}`}>
                      {notice.text}
                    </p>
                  </div>
                </div>

                {notice.stats && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notice.stats.map((s) => (
                      <div key={s.label} className="rounded-2xl bg-white/80 border border-amber-200/80 px-5 py-4">
                        <p className="text-3xl font-extrabold text-amber-700 tracking-tight">{s.value}</p>
                        <p className="mt-1 text-xs font-semibold text-amber-900 leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* ───────────── Other practice areas ───────────── */}
        <section className="py-16 lg:py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Explore more"
              title="Other"
              accent="practice areas"
              intro="Most businesses need more than one service. Here is everything else we handle under one roof."
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.href} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }}>
                    <Link
                      to={p.href}
                      className="group glass-hover transition-all duration-300 flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1"
                    >
                      <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shadow-md shadow-[#1C6FA5]/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="mt-5 text-lg font-extrabold text-[#10364E] group-hover:text-[#1C6FA5] transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed flex-1">{p.blurb}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1C6FA5]">
                        Learn more
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Closing CTA ───────────── */}
        <section className="pb-16 lg:pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0C2332] via-[#10364E] to-[#175B87] px-6 sm:px-12 py-14 lg:py-16 text-center text-white shadow-[0_30px_70px_-30px_rgba(16,54,78,0.6)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />
              <div className="absolute -top-24 -right-16 w-[380px] h-[380px] bg-[#4FA2D8] rounded-full blur-[130px] opacity-30 pointer-events-none" />
              <div className="absolute -bottom-28 -left-16 w-[340px] h-[340px] bg-[#1C6FA5] rounded-full blur-[120px] opacity-40 pointer-events-none" />

              <div className="relative max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4FA2D8] animate-pulse" />
                  {finalCta.eyebrow}
                </span>

                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {finalCta.title}{' '}
                  <span className="font-script text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                    {finalCta.accent}
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  {finalCta.text}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/contact"
                    className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#10364E] hover:bg-blue-50 text-xs font-bold uppercase tracking-wider shadow-lg transition-colors active:scale-95"
                  >
                    <span>Go to Contact Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+917845132962"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#4FA2D8]" />
                    <span>Call +91 78451 32962</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={openContact} />

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          preselectedService={preselectedService}
        />
      )}
    </div>
  );
}
