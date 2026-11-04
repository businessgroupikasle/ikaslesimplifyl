import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Compass, CalendarClock, AlarmClock, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from '../lib/router';
import GstCalculator from './tools/GstCalculator';
import { getUpcomingDeadlines, daysUntil, CATEGORIES } from '../data/compliance';

const ENTITY_CHIPS = [
  { label: 'Pvt Ltd', cls: 'bg-[#10364E] text-white', pos: 'top-6 left-6', float: 'animate-float-slow' },
  { label: 'LLP', cls: 'bg-[#1C6FA5] text-white', pos: 'top-14 right-8', float: 'animate-float-reverse' },
  { label: 'OPC', cls: 'bg-white text-[#10364E] border border-slate-200', pos: 'top-28 left-16', float: 'animate-float-reverse' },
  { label: 'Partnership', cls: 'bg-amber-100 text-amber-800 border border-amber-200', pos: 'top-32 right-4', float: 'animate-float-slow' },
];

const card = 'relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-hover';

export default function ToolsShowcase() {
  const next = useMemo(() => getUpcomingDeadlines(1)[0], []);
  const daysLeft = next ? daysUntil(next.date) : null;

  const reveal = (i) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay: i * 0.08 },
  });

  return (
    <section id="tools" className="relative py-16 lg:py-24 bg-[#EEF5FA] border-b border-blue-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#c7d7f5_1px,transparent_1px)] [background-size:22px_22px] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#1C6FA5] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Free Business Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10364E] mt-2 tracking-tight">
              Get answers instantly, before you even call us.
            </h2>
          </div>
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1C6FA5] hover:gap-2.5 transition-all">
            Explore all tools <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Big: live GST calculator */}
          <motion.div {...reveal(0)} className="md:col-span-2 lg:row-span-2">
           <div className={`${card} h-full bg-[#10364E] border-[#10364E] p-6 sm:p-8`}>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#1C6FA5] rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-sky-300">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-white">GST Calculator</h3>
                <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
                  Try it right here. Type an amount and pick a slab to see the tax split instantly.
                </p>
                <Link
                  to="/tools#gst-calculator"
                  className="mt-auto pt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 hover:text-white"
                >
                  Full calculator with IGST <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <GstCalculator compact />
            </div>
           </div>
          </motion.div>

          {/* Structure finder */}
          <motion.div {...reveal(1)}>
            <Link to="/tools#structure-finder" className={`${card} group block h-full bg-white border-slate-200 p-6`}>
              <div className="relative h-44 -mx-2 -mt-2 mb-2 rounded-2xl bg-gradient-to-br from-[#F5F7FA] to-blue-50 overflow-hidden">
                {ENTITY_CHIPS.map((c) => (
                  <span key={c.label} className={`absolute ${c.pos} ${c.float} px-3 py-1.5 rounded-full text-xs font-extrabold shadow-md ${c.cls}`}>
                    {c.label}
                  </span>
                ))}
                <Compass className="absolute bottom-3 right-3 w-8 h-8 text-[#1C6FA5]/30 group-hover:rotate-90 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-extrabold text-[#10364E] flex items-center justify-between">
                Which structure fits you?
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#1C6FA5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="mt-1 text-sm text-slate-600">5 quick questions → a personalised entity recommendation.</p>
            </Link>
          </motion.div>

          {/* Next deadline */}
          <motion.div {...reveal(2)}>
            <Link to="/compliance-calendar" className={`${card} group block h-full bg-white border-slate-200 p-6`}>
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#1C6FA5] transition-colors" />
              </div>
              {next && (
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Next due date</p>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-[#10364E] tabular-nums">{daysLeft}</span>
                    <span className="text-sm font-bold text-slate-500">{daysLeft === 1 ? 'day' : 'days'} left</span>
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#10364E] flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${CATEGORIES[next.category].dot}`} />
                    {next.title}
                  </p>
                </div>
              )}
              <p className="mt-3 text-xs font-bold text-[#1C6FA5]">Open the compliance calendar →</p>
            </Link>
          </motion.div>

          {/* Late fee strip */}
          <motion.div {...reveal(3)} className="md:col-span-2 lg:col-span-3">
            <Link
              to="/tools#late-fee"
              className={`${card} group flex flex-col sm:flex-row sm:items-center gap-5 bg-gradient-to-r from-amber-50 via-white to-white border-amber-200 p-6`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                <AlarmClock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-[#10364E]">Missed a GST deadline?</h3>
                <p className="text-sm text-slate-600">
                  Late returns cost up to <strong className="text-[#10364E]">₹50 a day</strong> plus 18% interest. See your exact penalty in seconds.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#10364E] group-hover:bg-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto">
                Estimate late fee <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
