import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlarmClock, Info } from 'lucide-react';
import { TURNOVER_BRACKETS, calculateLateFee, formatINR } from '../../lib/gst';

export default function LateFeeEstimator() {
  const [daysLate, setDaysLate] = useState(15);
  const [isNil, setIsNil] = useState(false);
  const [bracketId, setBracketId] = useState('small');
  const [taxDue, setTaxDue] = useState('50000');
  const [includeInterest, setIncludeInterest] = useState(true);

  const r = useMemo(
    () => calculateLateFee({ daysLate, isNil, bracketId, taxDue, includeInterest }),
    [daysLate, isNil, bracketId, taxDue, includeInterest]
  );
  const capPct = Math.min(100, (r.lateFee / r.cap) * 100);
  // severity hue for the gauge
  const severity = r.total < 1000 ? 'from-emerald-400 to-teal-400' : r.total < 5000 ? 'from-amber-300 to-amber-500' : 'from-orange-400 to-rose-500';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <div className="space-y-6">
        {/* Days slider */}
        <div>
          <div className="flex items-end justify-between">
            <label htmlFor="days-late" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Days past due date
            </label>
            <span className="text-2xl font-extrabold text-[#10364E] dark:text-white tabular-nums">
              {r.days}
              <span className="text-sm text-slate-400 dark:text-slate-500 font-bold"> days</span>
            </span>
          </div>
          <input
            id="days-late"
            type="range"
            min="0"
            max="365"
            value={daysLate}
            onChange={(e) => setDaysLate(e.target.value)}
            className="mt-3 w-full accent-[#1C6FA5] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
            <span>0</span>
            <span>90</span>
            <span>180</span>
            <span>365</span>
          </div>
        </div>

        {/* Return type */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: false, title: 'Regular return', sub: '₹50 / day' },
            { v: true, title: 'Nil return', sub: '₹20 / day' },
          ].map((o) => (
            <button
              key={o.title}
              type="button"
              onClick={() => setIsNil(o.v)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                isNil === o.v
                  ? 'border-[#1C6FA5] bg-blue-50/60 dark:bg-sky-950/40 dark:border-sky-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <p className="text-sm font-extrabold text-[#10364E] dark:text-white">{o.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{o.sub}</p>
            </button>
          ))}
        </div>

        {!isNil && (
          <>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Aggregate annual turnover</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {TURNOVER_BRACKETS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBracketId(b.id)}
                    className={`px-2 py-2.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-colors ${
                      bracketId === b.id
                        ? 'bg-[#10364E] dark:bg-sky-600 border-[#10364E] dark:border-sky-600 text-white'
                        : 'border-slate-200 dark:border-slate-800 text-[#10364E] dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-[#1C6FA5]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tax-due" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Net tax payable in cash
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInterest}
                    onChange={(e) => setIncludeInterest(e.target.checked)}
                    className="accent-[#1C6FA5]"
                  />
                  Add 18% interest
                </label>
              </div>
              <div className="mt-2 flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-within:border-[#1C6FA5]">
                <span className="pl-4 text-lg font-bold text-slate-400 dark:text-slate-500">₹</span>
                <input
                  id="tax-due"
                  type="number"
                  min="0"
                  value={taxDue}
                  disabled={!includeInterest}
                  onChange={(e) => setTaxDue(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-lg font-extrabold text-[#10364E] dark:text-white outline-none disabled:text-slate-300 dark:disabled:text-slate-600"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Output */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#F5F7FA] to-white dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <AlarmClock className="w-4 h-4 text-[#1C6FA5] dark:text-sky-400" /> Estimated cost of delay
        </div>

        <motion.p
          key={r.total}
          initial={{ scale: 0.96, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-3 text-5xl font-extrabold text-[#10364E] dark:text-white tracking-tight tabular-nums"
        >
          {formatINR(r.total, { decimals: 0 })}
        </motion.p>

        <div className="mt-6 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${severity}`}
            animate={{ width: `${Math.max(capPct, r.days ? 4 : 0)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Late fee {r.capped ? 'has hit the' : 'is'} {Math.round(capPct)}% of the {formatINR(r.cap, { decimals: 0 })} cap
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400">
              Late fee ({r.days} × ₹{r.perDay}){r.capped && <span className="ml-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">CAPPED</span>}
            </dt>
            <dd className="font-bold text-[#10364E] dark:text-white">{formatINR(r.lateFee, { decimals: 0 })}</dd>
          </div>
          {!isNil && includeInterest && (
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Interest @ 18% p.a.</dt>
              <dd className="font-bold text-[#10364E] dark:text-white">{formatINR(r.interest)}</dd>
            </div>
          )}
        </dl>

        <div className="mt-auto pt-6">
          <p className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4 text-[#1C6FA5] dark:text-sky-400 shrink-0" />
            Indicative estimate for GSTR-3B / GSTR-1 based on standard late-fee caps. The government revises fees and grants waivers
            from time to time. Confirm with a specialist before paying.
          </p>
        </div>
      </div>
    </div>
  );
}
