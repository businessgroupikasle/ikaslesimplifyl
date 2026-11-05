import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Compass, AlarmClock, CalendarDays, ArrowRight, ArrowDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import Breadcrumb from '../components/Breadcrumb';
import GstCalculator from '../components/tools/GstCalculator';
import StructureFinder from '../components/tools/StructureFinder';
import LateFeeEstimator from '../components/tools/LateFeeEstimator';

const ContactModal = lazy(() => import('../components/ContactModal'));

const TOOLS = [
  {
    id: 'gst-calculator',
    num: '01',
    icon: Calculator,
    title: 'GST Calculator',
    blurb: 'Add or remove GST, with an instant CGST / SGST / IGST split.',
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'structure-finder',
    num: '02',
    icon: Compass,
    title: 'Business Structure Finder',
    blurb: 'Five questions to find your ideal entity: Pvt Ltd, LLP, OPC & more.',
    accent: 'from-sky-400 to-blue-600',
  },
  {
    id: 'late-fee',
    num: '03',
    icon: AlarmClock,
    title: 'GST Late Fee Estimator',
    blurb: 'See exactly what a missed GSTR-3B deadline will cost you.',
    accent: 'from-amber-400 to-orange-500',
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top, behavior: 'smooth' });
}

function ToolSection({ tool, children, tinted }) {
  const Icon = tool.icon;
  return (
    <section id={tool.id} className={`py-16 lg:py-24 border-b border-slate-100 dark:border-slate-800 ${tinted ? 'bg-[#F5F7FA] dark:bg-[#0c1c28]' : 'bg-white dark:bg-[#091822]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end gap-5 mb-10"
        >
          <div className="flex items-center gap-4">
            <span className="text-6xl sm:text-7xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_#CBD5E1] dark:[-webkit-text-stroke:1.5px_#334155] leading-none select-none">
              {tool.num}
            </span>
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.accent} flex items-center justify-center text-white shadow-lg`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10364E] dark:text-white">{tool.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">{tool.blurb}</p>
          </div>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export default function ToolsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preselected, setPreselected] = useState('');

  const openContact = (svc = '') => {
    setPreselected(typeof svc === 'string' ? svc : '');
    setIsContactOpen(true);
  };

  // Support deep links such as /tools#structure-finder
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (id) setTimeout(() => scrollToId(id), 150);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#091822] text-[#263445] dark:text-slate-200 flex flex-col font-sans">
      <SEOHead
        title="Free Business Tools: GST Calculator & Structure Finder | Simplifyl"
        description="Free tools for Indian businesses: GST calculator with CGST/SGST/IGST split, business structure finder quiz, and GST late fee & interest estimator."
        canonicalUrl="https://simplifyl.com/tools"
        noIndex={false}
      />

      <Navbar onOpenContact={() => openContact()} />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-[#10364E] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] pointer-events-none" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1C6FA5] rounded-full blur-[120px] opacity-40 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pb-28">
            <Breadcrumb items={[{ label: 'Business Toolkit' }]} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-10 lg:mt-14 text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% free · No sign-up
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                The Business{' '}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">Toolkit</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed">
                Smart calculators and guided tools that answer the questions founders ask us every day, in seconds.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {TOOLS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => scrollToId(t.id)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="group text-left p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 backdrop-blur-sm transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ArrowDown className="w-4 h-4 text-blue-300 group-hover:translate-y-1 transition-transform" />
                    </div>
                    <p className="mt-4 text-base font-extrabold text-white">{t.title}</p>
                    <p className="mt-1 text-xs text-blue-100/80 leading-relaxed">{t.blurb}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <ToolSection tool={TOOLS[0]}>
          <GstCalculator />
        </ToolSection>

        <ToolSection tool={TOOLS[1]} tinted>
          <StructureFinder onOpenContact={openContact} />
        </ToolSection>

        <ToolSection tool={TOOLS[2]}>
          <LateFeeEstimator />
        </ToolSection>

        {/* Cross-link to calendar */}
        <section className="py-16 lg:py-20 bg-white dark:bg-[#091822]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#10364E] via-[#174E72] to-[#1C6FA5] dark:from-[#0b2131] dark:via-[#11324a] dark:to-[#174e72] dark:border dark:border-slate-700/60 p-8 sm:p-12 overflow-hidden text-white shadow-xl">
              <CalendarDays className="absolute -right-6 -bottom-6 w-48 h-48 text-white/10 rotate-12" />
              <div className="relative max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Never pay a late fee again.</h2>
                <p className="mt-3 text-sm sm:text-base text-blue-100">
                  Track every GST, TDS, ROC and LLP due date on our interactive compliance calendar, or let our team file them for you.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/compliance-calendar"
                    className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#10364E] font-bold text-xs uppercase tracking-wider hover:bg-slate-100"
                  >
                    Open Calendar <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openContact('Compliance Support')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10"
                  >
                    Hand it to our experts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => openContact()} />

      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService={preselected} />
        </Suspense>
      )}
    </div>
  );
}
