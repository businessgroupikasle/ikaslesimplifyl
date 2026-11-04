import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ContactModal from '../components/ContactModal';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from '../lib/router';
import {
  FileText,
  Building2,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  MessageSquare,
  Rocket,
  Sparkles,
} from 'lucide-react';
import gstImg from '../assets/article_gst.jpg';
import bizImg from '../assets/article_business.jpg';
import tmImg from '../assets/article_trademark.jpg';
import compImg from '../assets/compliance_team.jpg';

const SERVICES = [
  {
    id: 'gst-filing',
    no: '01',
    short: 'GST Filing',
    name: 'GST Filing',
    title: 'GST Filing & Taxation Services',
    subtitle: 'Complete GST management, return preparation & notice advisory',
    icon: FileText,
    image: gstImg,
    pageLink: '/gst-filing',
    cta: 'Explore GST Filing',
    desc: 'Simplify your Goods and Services Tax obligations with structured support for registrations, periodic return filings (GSTR-1, GSTR-3B), annual reconciliations (GSTR-9/9C), and departmental response drafting.',
    idealFor: ['Traders & retailers', 'Service providers', 'E-commerce sellers'],
    inclusions: [
      'New GST Registration & Field Amendments',
      'Monthly GSTR-1 & GSTR-3B Return Preparation',
      'Automated 2A / 2B Input Tax Credit Reconciliation',
      'Annual Return (GSTR-9) & Reconciliation (GSTR-9C)',
      'E-Way Bill Generation & Export LUT Filing',
      'Assistance for GST ASMT-10 & DRC-01 Department Notices',
    ],
  },
  {
    id: 'business-registration',
    no: '02',
    short: 'Registrations',
    name: 'Business Registrations',
    title: 'Business Registration & Incorporation',
    subtitle: 'Structured company formation with statutory authorities',
    icon: Building2,
    image: bizImg,
    pageLink: '/business-registration',
    cta: 'Explore Registrations',
    desc: 'Incorporate your venture with complete legal standing under the Ministry of Corporate Affairs (MCA). We guide you through naming guidelines, digital signatures, charter drafting, and certificate of incorporation issuance.',
    idealFor: ['First-time founders', 'Startups', 'Family businesses'],
    inclusions: [
      'Private Limited Company Incorporation (SPICe+ Part A & B)',
      'Limited Liability Partnership (LLP) Registration',
      'One Person Company (OPC) Registration',
      'Partnership Firm Deed Drafting & Registration',
      'Sole Proprietorship & Udyam MSME Setup',
      'Startup India (DPIIT) Recognition Advisory',
    ],
  },
  {
    id: 'trademark-registration',
    no: '03',
    short: 'Trademark',
    name: 'Trademark Services',
    title: 'Trademark Registration & Brand Security',
    subtitle: 'Protect your brand identity, logo, and commercial reputation',
    icon: ShieldCheck,
    image: tmImg,
    pageLink: '/trademark-registration',
    cta: 'Explore Trademark Services',
    desc: 'Secure exclusive nationwide rights over your brand name, logo, or tagline. Our trademark specialists conduct exhaustive preliminary availability searches, file Form TM-A with IP India, and handle examination objections.',
    idealFor: ['New brands', 'Growing D2C labels', 'Logo & name owners'],
    inclusions: [
      'Comprehensive 45-Class Trademark Search Report',
      'Filing Form TM-A for Word Marks & Logo Device Marks',
      'Immediate ™ Symbol Usage Guidance & Tracking',
      'Drafting Formal Replies to Examination Objections',
      'Representation for Trademark Registry Show-Cause Hearings',
      'Trademark Renewal (Every 10 Years) & License Recording',
    ],
  },
  {
    id: 'compliance-support',
    no: '04',
    short: 'Compliance',
    name: 'Compliance Support',
    title: 'Compliance Support & Annual ROC Filings',
    subtitle: 'Prevent statutory penalties and maintain active corporate status',
    icon: FileCheck2,
    image: compImg,
    pageLink: '/compliance-support',
    cta: 'Explore Compliance Support',
    desc: 'Keep your company compliant with the Companies Act, 2013 and avoid director disqualification. We manage annual financial filings (AOC-4), annual returns (MGT-7/7A), Director KYC (DIR-3 KYC), and board resolutions.',
    idealFor: ['Private Limited companies', 'LLPs', 'Directors & promoters'],
    inclusions: [
      'Annual ROC Financial Statement Filing (Form AOC-4)',
      'Annual Company Return Filing (Form MGT-7 / MGT-7A)',
      'Annual LLP Returns (Form 11 & Form 8)',
      'Director Identification KYC (DIR-3 KYC Web & e-Form)',
      'Drafting Board Meeting & Annual General Meeting (AGM) Minutes',
      'Filing Form INC-20A Commencement of Business',
    ],
  },
];

const QUICK_MATCH = [
  { intent: "I'm starting a business", to: 'Business Registration', href: '/business-registration', icon: Rocket },
  { intent: 'I need to file GST returns', to: 'GST Filing', href: '/gst-filing', icon: FileText },
  { intent: 'I want to protect my brand', to: 'Trademark Services', href: '/trademark-registration', icon: ShieldCheck },
  { intent: 'I need to stay ROC compliant', to: 'Compliance Support', href: '/compliance-support', icon: FileCheck2 },
];

const STATS = [
  { value: '4', label: 'Practice areas' },
  { value: '24', label: 'In-scope services' },
  { value: '100%', label: 'Digital documentation' },
  { value: 'India', label: 'Wide support' },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function ServicesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const heroRef = useRef(null);

  // Reveal the sticky service switcher once the hero has scrolled out of view
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSubNav(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: highlight the service currently in the middle of the viewport
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    SERVICES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Our Services | GST Filing, Business Registrations & Trademarks | Simplifyl"
        description="Explore Simplifyl's complete business consultancy services: GST registration & monthly return filing, company incorporation (Pvt Ltd & LLP), trademark protection, and annual ROC compliance in India."
        canonicalUrl="https://simplifyl.com/services"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Sticky service switcher (appears after the hero) */}
      <div
        className={`fixed top-16 inset-x-0 z-40 transition-all duration-300 ${
          showSubNav ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!showSubNav}
      >
        <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_6px_20px_-12px_rgba(16,54,78,0.25)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const active = activeId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  tabIndex={showSubNav ? 0 : -1}
                  onClick={() => scrollToId(s.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    active
                      ? 'bg-[#10364E] text-white shadow-md shadow-[#10364E]/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-[#4FA2D8] hover:text-[#1C6FA5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-mono opacity-70">{s.no}</span>
                  <span>{s.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {/* ───────────── Hero ───────────── */}
        <section ref={heroRef} className="relative bg-[#0C2332] text-white overflow-hidden">
          {/* Atmosphere */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] bg-[#1C6FA5] rounded-full blur-[150px] opacity-30 pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[480px] h-[480px] bg-[#4FA2D8] rounded-full blur-[160px] opacity-15 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-24">
            {/* Breadcrumb */}
            <Breadcrumb items={[{ label: 'Services' }]} />

            <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left: headline */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#4FA2D8]" />
                  Practice Overview
                </span>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  Services built to keep your business{' '}
                  <span className="inline-block whitespace-nowrap font-script text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent pb-3 pr-2">
                    compliant &amp; growing
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                  Professional documentation and advisory solutions structured to simplify statutory registrations, ongoing tax filings, and legal compliance.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1C6FA5] hover:bg-[#2686C5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#1C6FA5]/30 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Free consultation</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToId('gst-filing')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Browse services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Stats */}
                <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-xl">
                  {STATS.map((s, i) => (
                    <div key={s.label} className={`${i > 0 ? 'sm:pl-5 sm:border-l sm:border-white/15' : ''}`}>
                      <dt className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{s.value}</dt>
                      <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              {/* Right: glass service index */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-[28px] p-3 bg-white/[0.06] border border-white/15 backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                  <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-white/20 via-transparent to-[#4FA2D8]/20 pointer-events-none" />
                  <p className="relative px-4 pt-3 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                    Service Index
                  </p>
                  <ul className="relative space-y-1.5">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => scrollToId(s.id)}
                            className="group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left hover:bg-white/10 transition-colors"
                          >
                            <span className="font-mono text-xs font-bold text-[#4FA2D8] w-6">{s.no}</span>
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C6FA5] to-[#175B87] flex items-center justify-center shadow-lg shadow-[#1C6FA5]/25 group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-white" />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-sm font-extrabold text-white truncate">{s.name}</span>
                              <span className="block text-[11px] text-slate-400">{s.inclusions.length} in-scope services</span>
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Service showcase ───────────── */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-[#F4F8FB] to-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C1DEF0_1px,transparent_1px)] [background-size:26px_26px] opacity-40 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EFF8] text-[#1C6FA5] text-xs font-bold uppercase tracking-wider">
                What we do
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#10364E] tracking-tight">
                Four practice areas,{' '}
                <span className="font-script text-4xl sm:text-5xl text-[#1C6FA5]">one trusted partner</span>
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                From the day you incorporate to every filing that follows, each practice area is handled by a dedicated specialist.
              </p>
            </div>

            <div className="space-y-12 lg:space-y-20">
              {SERVICES.map((svc, idx) => {
                const Icon = svc.icon;
                const flip = idx % 2 === 1;
                return (
                  <motion.article
                    key={svc.id}
                    id={svc.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55 }}
                    className="group/svc scroll-mt-32 relative grid grid-cols-1 lg:grid-cols-12 rounded-[28px] overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_50px_-24px_rgba(16,54,78,0.25)]"
                  >
                    {/* Visual column */}
                    <div className={`relative lg:col-span-5 min-h-[280px] lg:min-h-full overflow-hidden ${flip ? 'lg:order-2' : ''}`}>
                      <img
                        src={svc.image}
                        alt={svc.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover/svc:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2332] via-[#10364E]/55 to-[#1C6FA5]/25" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] opacity-60" />

                      {/* Big outlined numeral */}
                      <span className="absolute top-3 left-6 text-[110px] sm:text-[140px] leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.65)] select-none pointer-events-none">
                        {svc.no}
                      </span>

                      {/* Icon badge */}
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover/svc:bg-[#1C6FA5] group-hover/svc:rotate-6 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Glass caption */}
                      <div className="absolute bottom-5 left-5 right-5 rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/25">
                        <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-blue-200">SERVICE {svc.no}</p>
                        <p className="mt-1 text-base font-extrabold text-white leading-snug">{svc.name}</p>
                        <p className="mt-1 text-[11px] text-slate-200">{svc.inclusions.length} in-scope services · Digital documentation</p>
                      </div>
                    </div>

                    {/* Content column */}
                    <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1C6FA5]">
                        {svc.subtitle}
                      </p>
                      <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#10364E] tracking-tight leading-tight">
                        {svc.title}
                      </h3>
                      <p className="mt-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        {svc.desc}
                      </p>

                      {/* Ideal for */}
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Ideal for</span>
                        {svc.idealFor.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] text-[11px] font-semibold text-[#175B87]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Inclusions */}
                      <div className="mt-7">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Key inclusions &amp; in-scope activities
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {svc.inclusions.map((inc) => (
                            <li
                              key={inc}
                              className="glass-hover transition-all duration-300 flex items-start gap-2.5 p-3 rounded-xl bg-[#F4F8FB]/70 border border-slate-200/70 text-xs text-slate-700 leading-snug"
                            >
                              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5" strokeWidth={3} />
                              </span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTAs */}
                      <div className="mt-auto pt-8">
                      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
                        <Link
                          to={svc.pageLink}
                          className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#10364E] to-[#175B87] hover:from-[#175B87] hover:to-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#10364E]/20 transition-all duration-300 active:scale-95"
                        >
                          <span>{svc.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/svc:translate-x-0.5 transition-transform" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsContactOpen(true)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#10364E] border border-slate-300 hover:border-[#1C6FA5] hover:text-[#1C6FA5] text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <span>Talk to an expert</span>
                        </button>
                      </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Not sure where to start? ───────────── */}
        <section className="py-16 lg:py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EFF8] text-[#1C6FA5] text-xs font-bold uppercase tracking-wider">
                Quick match
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#10364E] tracking-tight">
                Not sure where to start?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Tell us what you&apos;re trying to do and we&apos;ll point you to the right service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_MATCH.map((q, i) => {
                const Icon = q.icon;
                return (
                  <motion.div
                    key={q.href}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link
                      to={q.href}
                      className="group glass-hover transition-all duration-300 relative flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)] hover:-translate-y-1"
                    >
                      <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shadow-md shadow-[#1C6FA5]/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className="mt-5 text-base font-extrabold text-[#10364E] leading-snug">{q.intent}</p>
                      <p className="mt-1 text-xs text-slate-500">We recommend</p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1C6FA5]">
                        {q.to}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </p>
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
                  Consultation &amp; enquiries
                </span>

                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Have questions about our{' '}
                  <span className="inline-block font-script text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent pb-2 pr-2">
                    services?
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Consult with our advisory team, request a custom service quotation, and get clarity on every statutory step.
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

                <p className="mt-8 text-[11px] text-slate-400 leading-relaxed max-w-xl mx-auto">
                  Simplifyl is an independent business consultancy and does not represent any government authority, Ministry, or Registrar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
