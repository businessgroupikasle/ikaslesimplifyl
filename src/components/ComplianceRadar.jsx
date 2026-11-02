import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, ArrowRight, Clock } from 'lucide-react';
import { Link } from '../lib/router';
import { CATEGORIES, getUpcomingDeadlines, daysUntil, formatShortDate } from '../data/compliance';

const HORIZON_DAYS = 45; // outer ring of the radar

export default function ComplianceRadar({ onOpenContact }) {
  const deadlines = useMemo(() => getUpcomingDeadlines(6), []);
  const [hovered, setHovered] = useState(null);
  const [todayLabel] = useState(() => formatShortDate(new Date()));

  // Place each deadline on the radar: distance from centre = days remaining, angle spread evenly.
  const blips = deadlines.map((d, i) => {
    const days = daysUntil(d.date);
    const r = 12 + Math.min(days / HORIZON_DAYS, 1) * 34; // % of the radar's half-width
    const angle = ((i * 360) / deadlines.length + 30) * (Math.PI / 180);
    return { ...d, days, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
  });

  return (
    <section id="compliance-radar" className="relative py-20 lg:py-28 bg-[#142B4A] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-[#2563EB] rounded-full blur-[140px] opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Radar visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[440px] aspect-square order-2 lg:order-1"
        >
          {/* rings */}
          {[100, 75, 50, 25].map((s) => (
            <div
              key={s}
              className="absolute rounded-full border border-sky-300/20"
              style={{ inset: `${(100 - s) / 2}%` }}
            />
          ))}
          {/* crosshair */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-300/10" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-sky-300/10" />

          {/* sweep */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, rgba(56,189,248,0.38), rgba(56,189,248,0) 22%, transparent 100%)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* ring labels */}
          <span className="absolute left-1/2 -translate-x-1/2 top-[1%] text-[9px] font-bold uppercase tracking-wider text-sky-300/60">{HORIZON_DAYS}+ days</span>
          <span className="absolute left-1/2 -translate-x-1/2 top-[26%] text-[9px] font-bold uppercase tracking-wider text-sky-300/50">2 weeks</span>

          {/* centre */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white text-[#142B4A] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.6)]">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Today</span>
            <span className="text-sm font-extrabold">{todayLabel}</span>
          </div>

          {/* blips */}
          {blips.map((b, i) => {
            const isHover = hovered === b.key;
            return (
              <motion.button
                key={b.key}
                type="button"
                onMouseEnter={() => setHovered(b.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(b.key)}
                onBlur={() => setHovered(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 260, damping: 16 }}
                className="absolute z-10"
                style={{ left: `${b.x}%`, top: `${b.y}%`, x: '-50%', y: '-50%' }}
                aria-label={`${b.title}, ${b.days} days left`}
              >
                <span className={`absolute inset-0 rounded-full ${CATEGORIES[b.category].dot} animate-ping opacity-60`} />
                <span className={`relative block w-3.5 h-3.5 rounded-full ring-4 ring-[#142B4A] ${CATEGORIES[b.category].dot} ${isHover ? 'scale-150' : ''} transition-transform`} />
                {isHover && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap px-3 py-2 rounded-xl bg-white text-[#142B4A] text-xs font-bold shadow-xl">
                    {b.form} · {b.days === 0 ? 'today' : `${b.days}d`}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Copy + list */}
        <div className="order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Radar className="w-3.5 h-3.5" /> Compliance Radar · Live
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              What’s coming up on your compliance horizon
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              Deadlines don’t wait. Here are the next statutory due dates for Indian businesses. The closer to the centre, the sooner it’s due.
            </p>
          </motion.div>

          <ul className="mt-8 space-y-2.5">
            {blips.map((b, i) => (
              <motion.li
                key={b.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onMouseEnter={() => setHovered(b.key)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all ${
                  hovered === b.key ? 'bg-white/[0.12] border-white/25 translate-x-1' : 'bg-white/[0.04] border-white/10'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${CATEGORIES[b.category].dot}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{b.title}</p>
                  <p className="text-[11px] text-blue-200/80 font-semibold truncate">{b.appliesTo}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-white">{formatShortDate(b.date)}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${b.days <= 7 ? 'text-rose-300' : 'text-emerald-300'}`}>
                    <Clock className="w-3 h-3" /> {b.days === 0 ? 'Today' : `${b.days} days`}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/compliance-calendar"
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#142B4A] font-bold text-xs uppercase tracking-wider hover:bg-slate-100"
            >
              Full Compliance Calendar <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => onOpenContact?.('Compliance Support')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10"
            >
              Let us handle it
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
