import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeftRight, Copy, Check } from 'lucide-react';
import { GST_RATES, calculateGst, formatINR } from '../../lib/gst';

function Toggle({ options, value, onChange, dark }) {
  return (
    <div className={`relative grid grid-cols-2 p-1 rounded-full ${dark ? 'bg-white/10' : 'bg-slate-100'}`}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors ${
              active ? (dark ? 'text-[#10364E]' : 'text-white') : dark ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`toggle-${options[0].value}-${dark ? 'd' : 'l'}`}
                className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-white' : 'bg-[#10364E]'}`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Interactive GST calculator.
 * `compact` renders a lighter version for the homepage bento card (dark surface).
 */
export default function GstCalculator({ compact = false }) {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState('');
  const [mode, setMode] = useState('exclusive');
  const [supply, setSupply] = useState('intra');
  const [copied, setCopied] = useState(false);

  const effectiveRate = customRate !== '' ? Number(customRate) : rate;
  const result = useMemo(
    () => calculateGst(amount, effectiveRate, mode, supply === 'inter'),
    [amount, effectiveRate, mode, supply]
  );
  const taxShare = result.total > 0 ? (result.tax / result.total) * 100 : 0;

  const copySummary = async () => {
    const lines = [
      `Taxable value: ${formatINR(result.base)}`,
      supply === 'inter'
        ? `IGST @ ${effectiveRate}%: ${formatINR(result.igst)}`
        : `CGST @ ${effectiveRate / 2}%: ${formatINR(result.cgst)}\nSGST @ ${effectiveRate / 2}%: ${formatINR(result.sgst)}`,
      `Invoice total: ${formatINR(result.total)}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable – ignore */
    }
  };

  const dark = compact;
  const label = `text-[11px] font-bold uppercase tracking-wider ${dark ? 'text-blue-200' : 'text-slate-500'}`;

  return (
    <div className={compact ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10'}>
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label htmlFor={`gst-amount-${compact ? 'c' : 'f'}`} className={label}>
            Amount
          </label>
          <div
            className={`mt-2 flex items-center rounded-2xl border transition-colors focus-within:border-[#1C6FA5] ${
              dark ? 'bg-white/5 border-white/15' : 'bg-white border-slate-200'
            }`}
          >
            <span className={`pl-4 text-lg font-bold ${dark ? 'text-blue-200' : 'text-slate-400'}`}>₹</span>
            <input
              id={`gst-amount-${compact ? 'c' : 'f'}`}
              type="number"
              inputMode="decimal"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full bg-transparent px-3 py-3.5 text-xl font-extrabold outline-none ${
                dark ? 'text-white placeholder:text-blue-200/50' : 'text-[#10364E]'
              }`}
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <span className={label}>GST Rate</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {GST_RATES.map((r) => {
              const active = customRate === '' && rate === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRate(r);
                    setCustomRate('');
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-extrabold border transition-all ${
                    active
                      ? 'bg-[#1C6FA5] border-[#1C6FA5] text-white shadow-md shadow-blue-600/30 scale-105'
                      : dark
                        ? 'bg-white/5 border-white/15 text-blue-100 hover:border-blue-300'
                        : 'bg-white border-slate-200 text-[#10364E] hover:border-[#1C6FA5]'
                  }`}
                >
                  {r}%
                </button>
              );
            })}
            {!compact && (
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Custom %"
                aria-label="Custom GST rate"
                className={`w-28 px-3 py-2 rounded-xl text-sm font-bold border outline-none focus:border-[#1C6FA5] ${
                  customRate !== '' ? 'border-[#1C6FA5] text-[#1C6FA5]' : 'border-slate-200 text-[#10364E]'
                }`}
              />
            )}
          </div>
        </div>

        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          <div className="space-y-2">
            <span className={label}>Amount is</span>
            <Toggle
              dark={dark}
              value={mode}
              onChange={setMode}
              options={[
                { value: 'exclusive', label: 'Excl. GST' },
                { value: 'inclusive', label: 'Incl. GST' },
              ]}
            />
          </div>
          {!compact && (
            <div className="space-y-2">
              <span className={label}>Supply type</span>
              <Toggle
                value={supply}
                onChange={setSupply}
                options={[
                  { value: 'intra', label: 'Intra-state' },
                  { value: 'inter', label: 'Inter-state' },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      <div
        className={
          compact
            ? 'rounded-2xl bg-white/5 border border-white/10 p-4'
            : 'relative rounded-3xl bg-[#10364E] text-white p-6 sm:p-8 overflow-hidden'
        }
      >
        {!compact && (
          <>
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#1C6FA5] rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
          </>
        )}

        <div className="relative space-y-5">
          {!compact && (
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-200">
                <Calculator className="w-4 h-4" /> Tax Breakdown
              </span>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Invoice Total</p>
            <motion.p
              key={result.total}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-extrabold text-white tracking-tight ${compact ? 'text-2xl' : 'text-4xl sm:text-5xl'}`}
            >
              {formatINR(result.total)}
            </motion.p>
          </div>

          {/* Proportional bar */}
          <div>
            <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden flex">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-300 to-blue-400"
                animate={{ width: `${100 - taxShare}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              <motion.div
                className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
                animate={{ width: `${taxShare}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-blue-100">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-300" /> Taxable value
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> GST
              </span>
            </div>
          </div>

          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-blue-100">Taxable value</dt>
              <dd className="font-bold">{formatINR(result.base)}</dd>
            </div>
            {supply === 'inter' ? (
              <div className="flex justify-between">
                <dt className="text-blue-100">IGST @ {effectiveRate}%</dt>
                <dd className="font-bold">{formatINR(result.igst)}</dd>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <dt className="text-blue-100">CGST @ {effectiveRate / 2}%</dt>
                  <dd className="font-bold">{formatINR(result.cgst)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-blue-100">SGST @ {effectiveRate / 2}%</dt>
                  <dd className="font-bold">{formatINR(result.sgst)}</dd>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2.5 border-t border-white/15">
              <dt className="font-bold text-amber-300 inline-flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Total GST
              </dt>
              <dd className="font-extrabold text-amber-300">{formatINR(result.tax)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
