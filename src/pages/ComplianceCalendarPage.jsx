import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Filter, Info, ArrowRight, BellRing, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';
import Breadcrumb from '../components/Breadcrumb';
import {
  CATEGORIES,
  MONTH_NAMES,
  getDeadlinesForMonth,
  getUpcomingDeadlines,
  daysUntil,
  startOfDay,
} from '../data/compliance';

const ContactModal = lazy(() => import('../components/ContactModal'));
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function Countdown({ target }) {
  const now = useNow();
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate(), 23, 59, 59);
  const diff = Math.max(0, end - now);
  const parts = [
    { k: 'Days', v: Math.floor(diff / 86400000) },
    { k: 'Hrs', v: Math.floor((diff / 3600000) % 24) },
    { k: 'Min', v: Math.floor((diff / 60000) % 60) },
    { k: 'Sec', v: Math.floor((diff / 1000) % 60) },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {parts.map((p) => (
        <div key={p.k} className="rounded-xl bg-white/10 border border-white/10 py-3 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">{String(p.v).padStart(2, '0')}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">{p.k}</p>
        </div>
      ))}
    </div>
  );
}

function CategoryPill({ category }) {
  const c = CATEGORIES[category];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${c.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function ComplianceCalendarPage() {
  const [today] = useState(() => startOfDay(new Date()));
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [activeCats, setActiveCats] = useState(() => new Set(Object.keys(CATEGORIES)));
  const [selectedDay, setSelectedDay] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const next = useMemo(() => getUpcomingDeadlines(1)[0], []);

  const monthItems = useMemo(
    () => getDeadlinesForMonth(view.y, view.m).filter((d) => activeCats.has(d.category)),
    [view, activeCats]
  );

  const byDay = useMemo(() => {
    const map = {};
    for (const d of monthItems) (map[d.date.getDate()] ||= []).push(d);
    return map;
  }, [monthItems]);

  // Year heat strip: count of (filtered) deadlines per month of the visible year
  const yearCounts = useMemo(
    () =>
      MONTH_NAMES.map((_, m) => getDeadlinesForMonth(view.y, m).filter((d) => activeCats.has(d.category)).length),
    [view.y, activeCats]
  );
  const maxCount = Math.max(...yearCounts, 1);

  const firstWeekday = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const agenda = selectedDay ? byDay[selectedDay] || [] : monthItems;

  const shiftMonth = (delta) => {
    setSelectedDay(null);
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  const toggleCat = (id) => {
    setSelectedDay(null);
    setActiveCats((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        if (nextSet.size > 1) nextSet.delete(id);
      } else nextSet.add(id);
      return nextSet;
    });
  };

  const isToday = (day) => view.y === today.getFullYear() && view.m === today.getMonth() && day === today.getDate();

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title="Compliance Calendar: GST, TDS, ROC & LLP Due Dates | Simplifyl"
        description="Interactive compliance calendar for Indian businesses. Track GSTR-1, GSTR-3B, TDS, advance tax, AOC-4, MGT-7, DIR-3 KYC and LLP filing due dates."
        canonicalUrl="https://simplifyl.com/compliance-calendar"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-[#10364E] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] bg-[#1C6FA5] rounded-full blur-[120px] opacity-40 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pb-20">
            <Breadcrumb items={[{ label: 'Compliance Calendar' }]} />
            <div className="mt-9 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-5"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5" /> Statutory Due Dates
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Your Compliance Calendar,{' '}
                <span className="bg-gradient-to-r from-sky-300 to-blue-300 bg-clip-text text-transparent">always one step ahead.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Every recurring GST, Income Tax, TDS, ROC and LLP deadline in one interactive view. Filter by what applies to you and plan your month.
              </p>
            </motion.div>

            {next && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-5 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                    Next deadline
                  </span>
                  <span className="text-xs font-bold text-blue-100">{next.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' })}</span>
                </div>
                <p className="mt-3 text-xl font-extrabold text-white">{next.title}</p>
                <p className="text-xs text-blue-200 font-semibold">{next.form} · {next.appliesTo}</p>
                <div className="mt-5">
                  <Countdown target={next.date} />
                </div>
              </motion.div>
            )}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Show
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(CATEGORIES).map(([id, c]) => {
                  const on = activeCats.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleCat(id)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold transition-all ${
                        on ? 'bg-[#10364E] border-[#10364E] text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${on ? c.dot : 'bg-slate-300'}`} />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year heat strip */}
            <div className="rounded-2xl border border-slate-200 p-4 bg-[#F5F7FA]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{view.y} at a glance</p>
                <p className="text-[11px] text-slate-400 font-semibold hidden sm:block">Taller bar = busier month</p>
              </div>
              <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-end h-24">
                {yearCounts.map((count, m) => {
                  const active = m === view.m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedDay(null);
                        setView((v) => ({ ...v, m }));
                      }}
                      className="group flex flex-col items-center justify-end h-full gap-1.5"
                      aria-label={`${MONTH_NAMES[m]}: ${count} deadlines`}
                    >
                      <span className={`text-[10px] font-bold tabular-nums ${active ? 'text-[#1C6FA5]' : 'text-slate-400'}`}>{count}</span>
                      <motion.span
                        initial={{ height: 0 }}
                        animate={{ height: `${(count / maxCount) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: m * 0.02 }}
                        className={`w-full rounded-md min-h-[4px] transition-colors ${
                          active ? 'bg-gradient-to-t from-[#10364E] to-[#1C6FA5]' : 'bg-slate-300 group-hover:bg-blue-300'
                        }`}
                      />
                      <span className={`text-[10px] font-bold ${active ? 'text-[#10364E]' : 'text-slate-400'}`}>{MONTH_NAMES[m].slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Month grid */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
                  <button type="button" onClick={() => shiftMonth(-1)} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#1C6FA5] hover:text-[#1C6FA5]" aria-label="Previous month">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={`${view.y}-${view.m}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="text-lg font-extrabold text-[#10364E]"
                    >
                      {MONTH_NAMES[view.m]} {view.y}
                    </motion.h2>
                  </AnimatePresence>
                  <button type="button" onClick={() => shiftMonth(1)} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#1C6FA5] hover:text-[#1C6FA5]" aria-label="Next month">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 sm:p-5">
                  <div className="grid grid-cols-7 mb-2">
                    {WEEKDAYS.map((w) => (
                      <span key={w} className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 py-1">
                        {w}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {cells.map((day, i) => {
                      if (!day) return <span key={`e-${i}`} />;
                      const items = byDay[day] || [];
                      const selected = selectedDay === day;
                      const past = new Date(view.y, view.m, day) < today;
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={!items.length}
                          onClick={() => setSelectedDay(selected ? null : day)}
                          className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-sm font-bold transition-all ${
                            selected
                              ? 'bg-[#10364E] text-white shadow-lg scale-105 z-10'
                              : items.length
                                ? `bg-blue-50/70 hover:bg-blue-100 text-[#10364E] ${past ? 'opacity-50' : ''}`
                                : 'text-slate-400 cursor-default'
                          } ${isToday(day) && !selected ? 'ring-2 ring-[#1C6FA5] ring-offset-2' : ''}`}
                        >
                          <span>{day}</span>
                          {items.length > 0 && (
                            <span className="flex gap-0.5">
                              {items.slice(0, 4).map((it) => (
                                <span key={it.key} className={`w-1.5 h-1.5 rounded-full ${CATEGORIES[it.category].dot}`} />
                              ))}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Agenda */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold text-[#10364E]">
                    {selectedDay
                      ? `${selectedDay} ${MONTH_NAMES[view.m]}`
                      : `All of ${MONTH_NAMES[view.m]}`}
                    <span className="ml-2 text-xs font-bold text-slate-400">{agenda.length} due</span>
                  </h3>
                  {selectedDay && (
                    <button type="button" onClick={() => setSelectedDay(null)} className="inline-flex items-center gap-1 text-xs font-bold text-[#1C6FA5] hover:underline">
                      <X className="w-3.5 h-3.5" /> Whole month
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {agenda.length === 0 && (
                      <p className="text-sm text-slate-500 p-6 rounded-2xl border border-dashed border-slate-300 text-center">
                        No deadlines match your filters this month.
                      </p>
                    )}
                    {agenda.map((d, i) => {
                      const left = daysUntil(d.date);
                      return (
                        <motion.div
                          layout
                          key={d.key}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.2, delay: i * 0.02 }}
                          className="relative flex gap-4 p-4 rounded-2xl bg-white border border-slate-200 glass-hover transition-all"
                        >
                          <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b ${CATEGORIES[d.category].bar}`} />
                          <div className="w-14 shrink-0 text-center">
                            <p className="text-2xl font-extrabold text-[#10364E] leading-none">{d.date.getDate()}</p>
                            <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">
                              {d.date.toLocaleDateString('en-IN', { weekday: 'short' })}
                            </p>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-extrabold text-[#10364E]">{d.title}</p>
                            </div>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{d.form}</p>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{d.desc}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <CategoryPill category={d.category} />
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                                  left < 0 ? 'text-slate-400' : left <= 7 ? 'text-rose-600' : 'text-emerald-600'
                                }`}
                              >
                                <Clock className="w-3 h-3" />
                                {left < 0 ? 'Passed' : left === 0 ? 'Due today' : `${left} days left`}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <p className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              These are the standard statutory due dates. The CBIC, CBDT and MCA frequently extend deadlines by notification, and some dates
              (e.g. QRMP GSTR-3B, AGM-linked ROC filings) vary by state or by your company’s AGM date. Please confirm current dates before filing.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 lg:pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#F5F7FA] via-white to-blue-50 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10364E] text-white flex items-center justify-center shrink-0">
                  <BellRing className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#10364E]">Tired of tracking dates yourself?</h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-xl">
                    Our compliance retainer covers every filing on this calendar, with reminders, preparation and on-time submission.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#10364E] hover:bg-[#174E72] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Get a Compliance Plan <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/tools#late-fee"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-300 text-[#10364E] font-bold text-xs uppercase tracking-wider hover:border-[#1C6FA5] hover:text-[#1C6FA5]"
                >
                  Estimate a late fee
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService="Compliance Support" />
        </Suspense>
      )}
    </div>
  );
}
