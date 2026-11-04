import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Building2,
  ShieldCheck,
  FileCheck2,
  Landmark,
  Receipt,
  Phone,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import ContactModal from './ContactModal';
import ServiceLeadForm from './ServiceLeadForm';
import { Link } from '../lib/router';
import { IMPACT_STATS } from '../data/mockData';

// Registry used for the "other practice areas" cards.
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

// Same promises the About section already makes
const WHY_US = [
  'Transparent fee structure with zero ambiguity',
  'Dedicated professional assigned to your filing',
  'End-to-end guidance from start to completion',
  'Confidential and encrypted document handling',
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

function SectionHead({ eyebrow, title, accent, intro, light = false, center = false }) {
  return (
    <div className={`mb-8 lg:mb-10 ${center ? 'text-center mx-auto max-w-2xl' : ''}`}>
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <span className={`h-px w-8 ${light ? 'bg-[#4FA2D8]' : 'bg-[#1C6FA5]'}`} />
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.18em] ${light ? 'text-blue-200' : 'text-[#1C6FA5]'}`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-3 text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-[#10364E]'
        }`}
      >
        {title}
        {accent && (
          <>
            {' '}
            <span className={light ? 'text-sky-300' : 'text-[#1C6FA5]'}>{accent}</span>
          </>
        )}
      </h2>
      {intro && (
        <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${light ? 'text-slate-300' : 'text-slate-600'} ${center ? 'mx-auto' : ''}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * Shared layout for the four service detail pages. Structure follows the
 * conventions of established compliance-service sites: hero with an enquiry
 * form, sticky section tabs, overview, inclusions, fee structure, process,
 * documents, FAQs and cross-links.
 */
export default function ServiceDetailLayout({ config }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeId, setActiveId] = useState('overview');
  const [openFaq, setOpenFaq] = useState(0);
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
    overview,
    scope,
    fees,
    steps,
    documents,
    notice,
    faqs,
    finalCta,
    currentHref,
  } = config;

  const ScopeIcon = scope.icon || HeroIcon;
  const related = PRACTICE_AREAS.filter((p) => p.href !== currentHref);

  const tabs = useMemo(
    () =>
      [
        { id: 'overview', label: 'Overview' },
        { id: 'services', label: "What's included" },
        fees && { id: 'fees', label: 'Fees' },
        steps && { id: 'process', label: 'Process' },
        documents && { id: 'documents', label: 'Documents' },
        faqs && { id: 'faqs', label: 'FAQs' },
      ].filter(Boolean),
    [fees, steps, documents, faqs]
  );

  const faqSchema = useMemo(
    () =>
      faqs
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }
        : null,
    [faqs]
  );

  // Scroll-spy for the sticky tab bar
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        noIndex={false}
        schema={faqSchema}
      />

      <Navbar onOpenContact={openContact} />

      <main className="flex-grow">
        {/* ───────────── Hero with enquiry form ───────────── */}
        <section className="relative bg-gradient-to-b from-[#F4F8FB] via-white to-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C1DEF0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] pointer-events-none" />
          <div className="absolute -top-28 -right-24 w-[520px] h-[520px] rounded-full bg-[#4FA2D8]/15 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pb-20">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#1C6FA5] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/services" className="hover:text-[#1C6FA5] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-[#10364E] font-semibold">{breadcrumb}</span>
            </nav>

            <div className="mt-9 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-7"
              >
                <div className="inline-flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#10364E] text-white flex items-center justify-center shadow-md shadow-[#10364E]/20">
                    <HeroIcon className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1C6FA5]">{practice}</span>
                </div>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold text-[#10364E] tracking-tight leading-[1.1]">
                  {titleMain} <span className="text-[#1C6FA5]">{titleAccent}</span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">{intro}</p>

                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
                  {WHY_US.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm font-semibold text-[#10364E]">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href="tel:+917845132962"
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-[#10364E] hover:text-[#1C6FA5] transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1C6FA5] shadow-sm">
                      <Phone className="w-4 h-4" />
                    </span>
                    +91 78451 32962
                  </a>
                  <span className="text-xs text-slate-500">Mon – Sat, 9:30 AM – 6:30 PM IST</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="lg:col-span-5"
              >
                <ServiceLeadForm service={preselectedService} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Sticky section tabs ───────────── */}
        <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-200/80 shadow-[0_6px_20px_-16px_rgba(16,54,78,0.35)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <nav
              aria-label="Page sections"
              className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mb-px"
            >
              {tabs.map((t) => {
                const active = activeId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => scrollToId(t.id)}
                    className={`shrink-0 px-4 py-4 text-sm font-semibold border-b-2 transition-colors ${
                      active
                        ? 'border-[#1C6FA5] text-[#1C6FA5]'
                        : 'border-transparent text-slate-600 hover:text-[#10364E]'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={openContact}
              className="hidden md:inline-flex shrink-0 items-center gap-2 px-5 py-2 rounded-full bg-[#1C6FA5] hover:bg-[#175B87] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Free consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ───────────── Overview ───────────── */}
        <section id="overview" className="scroll-mt-32 py-14 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <SectionHead eyebrow="Overview" title={overview.title} accent={overview.accent} />
              <div className="space-y-4 -mt-2">
                {overview.paragraphs.map((p) => (
                  <p key={p} className="text-sm sm:text-base text-slate-600 leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Ideal for</span>
                {overview.idealFor.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] text-xs font-semibold text-[#175B87]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_24px_50px_-26px_rgba(16,54,78,0.5)]">
                <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/50 via-transparent to-transparent" />
              </div>
              <div className="relative -mt-9 mx-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_18px_40px_-18px_rgba(16,54,78,0.35)] grid grid-cols-3 divide-x divide-slate-100">
                {highlights.map((h) => (
                  <div key={h.label} className="px-3 py-4 text-center">
                    <p className="text-lg sm:text-xl font-extrabold text-[#1C6FA5] leading-none">{h.value}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 leading-tight">
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────── What's included ───────────── */}
        <section id="services" className="scroll-mt-32 py-14 lg:py-20 bg-[#F4F8FB] border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead eyebrow={scope.eyebrow} title={scope.title} accent={scope.accent} intro={scope.intro} />
            <motion.div
              {...fadeUp}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {scope.items.map((item, i) => (
                <div
                  key={item.title}
                  className="group glass-hover transition-all duration-300 flex gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)]"
                >
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-[#F4F8FB] border border-[#E3EFF8] text-[#1C6FA5] flex items-center justify-center group-hover:bg-[#1C6FA5] group-hover:border-[#1C6FA5] group-hover:text-white transition-colors">
                    <ScopeIcon className="w-5 h-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[11px] font-bold text-slate-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#10364E] leading-snug">{item.title}</h3>
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] bg-[#F4F8FB] px-2.5 py-1 rounded-full border border-[#E3EFF8]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.desc}</p>

                    {item.features && (
                      <>
                        <ul className="mt-4 space-y-2">
                          {item.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5" strokeWidth={3} />
                              </span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={openContact}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#10364E] hover:text-[#1C6FA5] transition-colors"
                        >
                          <span>Inquire about {item.title.split('(')[0].trim()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───────────── Fee structure ───────────── */}
        {fees && (
          <section id="fees" className="scroll-mt-32 py-14 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div {...fadeUp} className="lg:col-span-5">
                <SectionHead
                  eyebrow="Fee structure"
                  title="Transparent pricing,"
                  accent="no surprises"
                  intro={fees.note}
                />
                <button
                  type="button"
                  onClick={openContact}
                  className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#10364E] hover:bg-[#175B87] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10364E]/20 transition-colors"
                >
                  <span>Get a free quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <motion.div {...fadeUp} className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_-18px_rgba(16,54,78,0.35)]">
                    <span className="w-10 h-10 rounded-xl bg-[#F4F8FB] border border-[#E3EFF8] text-[#1C6FA5] flex items-center justify-center">
                      <Receipt className="w-5 h-5" />
                    </span>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Professional fee</p>
                    <p className="mt-1.5 text-base font-extrabold text-[#10364E] leading-snug">{fees.professionalFee}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_-18px_rgba(16,54,78,0.35)]">
                    <span className="w-10 h-10 rounded-xl bg-[#F4F8FB] border border-[#E3EFF8] text-[#1C6FA5] flex items-center justify-center">
                      <Landmark className="w-5 h-5" />
                    </span>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Government fee</p>
                    <p className="mt-1.5 text-base font-extrabold text-[#10364E] leading-snug">{fees.governmentFee}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#C1DEF0]/70 bg-[#F4F8FB] p-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Included in your package
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fees.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ───────────── Process ───────────── */}
        {steps && (
          <section id="process" className="scroll-mt-32 py-14 lg:py-20 bg-[#F4F8FB] border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHead eyebrow={steps.eyebrow} title={steps.title} accent={steps.accent} intro={steps.intro} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {steps.items.map((st, i) => (
                  <motion.div
                    key={st.num}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group glass-hover transition-all duration-300 relative rounded-2xl bg-white border border-slate-200/90 p-6 pt-7 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#1C6FA5] to-[#4FA2D8]" />
                    <p className="text-5xl font-extrabold leading-none text-[#E3EFF8] group-hover:text-[#C1DEF0] transition-colors">
                      {st.num}
                    </p>
                    <p className="mt-4 text-[10px] font-mono font-bold tracking-[0.18em] text-[#1C6FA5]">
                      {steps.label} {st.num}
                    </p>
                    <h3 className="mt-1.5 text-base font-extrabold text-[#10364E] leading-snug">{st.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{st.desc}</p>
                    {i < steps.items.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute -right-[18px] top-1/2 -translate-y-1/2 w-5 h-5 text-[#92C6E7] z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───────────── Documents ───────────── */}
        {documents && (
          <section id="documents" className="scroll-mt-32 py-14 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHead
                eyebrow={documents.eyebrow}
                title={documents.title}
                accent={documents.accent}
                intro={documents.intro}
              />
              <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.items.map((doc, i) => (
                  <div
                    key={doc}
                    className="glass-hover transition-all duration-300 flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)]"
                  >
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold shadow-md shadow-[#1C6FA5]/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-slate-700 leading-relaxed pt-1.5">{doc}</span>
                  </div>
                ))}
              </motion.div>
              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed max-w-3xl">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{documents.note}</span>
              </div>
            </div>
          </section>
        )}

        {/* ───────────── Notice / risk callout ───────────── */}
        {notice && (
          <section className="py-12 lg:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                {...fadeUp}
                className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </span>
                  <div>
                    {notice.title && <h3 className="text-lg font-extrabold text-amber-950">{notice.title}</h3>}
                    <p className={`text-sm text-amber-900 leading-relaxed ${notice.title ? 'mt-1.5' : 'pt-2'}`}>
                      {notice.text}
                    </p>
                  </div>
                </div>
                {notice.stats && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notice.stats.map((s) => (
                      <div key={s.label} className="rounded-xl bg-white border border-amber-200/80 px-5 py-4">
                        <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-tight">{s.value}</p>
                        <p className="mt-1 text-xs font-semibold text-amber-900 leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* ───────────── Why Simplifyl (dark band) ───────────── */}
        <section className="relative py-16 lg:py-20 bg-[#0C2332] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] bg-[#1C6FA5] rounded-full blur-[140px] opacity-25 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <SectionHead
                light
                eyebrow="Why Simplifyl"
                title="Why businesses trust"
                accent="Simplifyl"
                intro="An independent consultancy for GST, registrations, trademarks and corporate compliance across India."
              />
              <ul className="space-y-3.5">
                {WHY_US.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {IMPACT_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md p-6 hover:bg-white/[0.09] transition-colors"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{s.value}</p>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── FAQs ───────────── */}
        {faqs && (
          <section id="faqs" className="scroll-mt-32 py-14 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-36">
                <SectionHead
                  eyebrow="FAQs"
                  title="Frequently asked"
                  accent="questions"
                  intro={`Quick answers about ${breadcrumb.toLowerCase()}. Can't find what you need? Talk to our team.`}
                />
                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#10364E] hover:bg-[#175B87] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Ask an expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="lg:col-span-8 space-y-3">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={f.q}
                      className={`rounded-2xl border bg-white transition-colors ${
                        open ? 'border-[#92C6E7] shadow-[0_10px_30px_-20px_rgba(28,111,165,0.5)]' : 'border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                      >
                        <span className={`text-sm sm:text-base font-bold ${open ? 'text-[#1C6FA5]' : 'text-[#10364E]'}`}>
                          {f.q}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            open ? 'bg-[#1C6FA5] text-white' : 'bg-[#F4F8FB] text-[#1C6FA5]'
                          }`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ───────────── Closing CTA ───────────── */}
        <section className="pb-14 lg:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#10364E] to-[#175B87] p-8 sm:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-[#4FA2D8]/25 blur-3xl pointer-events-none" />
              <div className="relative max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">{finalCta.eyebrow}</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {finalCta.title} {finalCta.accent}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{finalCta.text}</p>
              </div>
              <div className="relative flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={openContact}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#10364E] hover:bg-blue-50 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+917845132962"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4FA2D8]" />
                  <span>Call +91 78451 32962</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────── Other practice areas ───────────── */}
        <section className="py-14 lg:py-20 bg-[#F4F8FB] border-t border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Explore more"
              title="Other"
              accent="practice areas"
              intro="Most businesses need more than one service. Here is everything else we handle under one roof."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.href} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.07 }}>
                    <Link
                      to={p.href}
                      className="group glass-hover transition-all duration-300 flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1"
                    >
                      <span className="w-11 h-11 rounded-xl bg-[#F4F8FB] border border-[#E3EFF8] text-[#1C6FA5] flex items-center justify-center group-hover:bg-[#1C6FA5] group-hover:text-white group-hover:border-[#1C6FA5] transition-colors">
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
