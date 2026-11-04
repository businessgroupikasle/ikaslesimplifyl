import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Layers, TrendingUp } from 'lucide-react';
import { QUESTIONS, scoreStructures } from '../../data/structureFinder';
import { Link } from '../../lib/router';

function ComplianceMeter({ level }) {
  return (
    <div className="flex gap-1" aria-label={`Compliance level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-1.5 w-5 rounded-full ${i <= level ? 'bg-[#1C6FA5]' : 'bg-slate-200'}`} />
      ))}
    </div>
  );
}

export default function StructureFinder({ onOpenContact }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState(1);

  const done = step >= QUESTIONS.length;
  const results = done ? scoreStructures(answers) : [];
  const [top, ...others] = results;
  const progress = (Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100;

  const choose = (optIdx) => {
    const next = [...answers];
    next[step] = optIdx;
    setAnswers(next);
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers([]);
    setDirection(-1);
    setStep(0);
  };

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200 shadow-card overflow-hidden">
      {/* Progress */}
      <div className="h-1.5 bg-slate-100">
        <motion.div
          className="h-full bg-gradient-to-r from-[#10364E] via-[#1C6FA5] to-sky-400"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        />
      </div>

      <div className="p-6 sm:p-10 min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          {!done ? (
            <motion.div
              key={`q-${step}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-[#1C6FA5] uppercase tracking-wider">
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#10364E]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10364E] leading-tight max-w-xl">
                {QUESTIONS[step].question}
              </h3>

              <div className={`mt-8 grid gap-3 ${QUESTIONS[step].options.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                {QUESTIONS[step].options.map((opt, i) => {
                  const selected = answers[step] === i;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(i)}
                      className={`group text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-hover ${
                        selected ? 'border-[#1C6FA5] bg-blue-50/60' : 'border-slate-200 hover:border-[#1C6FA5]/60 bg-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-[#10364E]">{opt.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1C6FA5] group-hover:translate-x-1 transition-all" />
                      </span>
                      <span className="block mt-1 text-xs text-slate-500 font-medium">{opt.hint}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
              {/* Winner */}
              <div className="lg:col-span-3 relative rounded-2xl bg-gradient-to-br from-[#10364E] to-[#174E72] text-white p-6 sm:p-8 overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#1C6FA5] blur-3xl opacity-40 pointer-events-none" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Best match · {top.match}%
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-white">{top.name}</h3>
                  <p className="mt-2 text-sm text-blue-100 leading-relaxed">{top.tagline}</p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: ShieldCheck, k: 'Liability', v: top.liability },
                      { icon: TrendingUp, k: 'Funding', v: top.funding.split(' (')[0] },
                      { icon: Layers, k: 'Compliance', v: `${top.compliance}/5` },
                    ].map(({ icon: Icon, k, v }) => (
                      <div key={k} className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <Icon className="w-4 h-4 text-blue-300" />
                        <p className="mt-2 text-[10px] uppercase tracking-wider text-blue-200 font-bold">{k}</p>
                        <p className="text-sm font-extrabold">{v}</p>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-2">
                    {top.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-blue-50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex items-start gap-2 text-xs text-amber-200">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> {top.watchOut}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    {onOpenContact ? (
                      <button
                        type="button"
                        onClick={() => onOpenContact('Business Registration')}
                        className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#10364E] font-bold text-xs uppercase tracking-wider hover:bg-slate-100"
                      >
                        Register a {top.name.split(' ').slice(-1)[0]} <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        to="/business-registration"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#10364E] font-bold text-xs uppercase tracking-wider hover:bg-slate-100"
                      >
                        Explore Registration <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake
                    </button>
                  </div>
                </div>
              </div>

              {/* Runner-ups */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Other options</p>
                {others.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="p-4 rounded-2xl border border-slate-200 bg-[#F5F7FA]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-extrabold text-[#10364E]">{r.name}</p>
                      <span className="text-xs font-extrabold text-[#1C6FA5]">{r.match}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#1C6FA5]/70"
                        initial={{ width: 0 }}
                        animate={{ width: `${r.match}%` }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span>Liability: {r.liability}</span>
                      <ComplianceMeter level={r.compliance} />
                    </div>
                  </motion.div>
                ))}
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  This is a guided suggestion, not legal advice. Our specialists will confirm the right structure on a free call.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
