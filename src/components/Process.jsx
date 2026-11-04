import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MessagesSquare, 
  FolderCheck, 
  Cpu, 
  Play, 
  Pause, 
  ChevronRight, 
  Zap, 
  Award,
  Check
} from 'lucide-react';

const PROCESS_DATA = [
  {
    step: '01',
    phase: 'DISCOVERY',
    title: 'Consultation',
    duration: '30 Mins',
    icon: MessagesSquare,
    tagline: 'Understand your unique business requirements',
    description: 'We connect you with a seasoned corporate compliance advisor to assess your exact filing, tax, and legal requirements with zero ambiguity.',
    deliverables: [
      'Free 1-on-1 Specialist Advisory',
      'Customized Compliance Roadmap',
      'Transparent Fee & Timeline Estimate'
    ],
    accent: 'from-blue-600 to-indigo-600',
    glow: 'rgba(28, 111, 165, 0.15)'
  },
  {
    step: '02',
    phase: 'VERIFICATION',
    title: 'Documentation',
    duration: 'Same Day',
    icon: FolderCheck,
    tagline: 'Frictionless digital document collection',
    description: 'Upload your documents through our encrypted portal. Our automated checklist and paralegal team verify every detail to prevent delays.',
    deliverables: [
      '100% Digital Cloud Submission',
      'Automated Document Pre-Screening',
      'Missing Document Alerts & Guidance'
    ],
    accent: 'from-blue-600 to-blue-800',
    glow: 'rgba(28, 111, 165, 0.15)'
  },
  {
    step: '03',
    phase: 'GOVERNMENT FILING',
    title: 'Processing',
    duration: 'Fast-Track',
    icon: Cpu,
    tagline: 'Expert drafting & official submission',
    description: 'Our certified chartered accountants and company secretaries draft, sign, and lodge your applications directly on official government servers.',
    deliverables: [
      'Official Portal Liaisoning',
      'End-to-End Application Tracking',
      'Challan & Fee Receipt Generation'
    ],
    accent: 'from-sky-600 to-blue-600',
    glow: 'rgba(2, 132, 199, 0.15)'
  },
  {
    step: '04',
    phase: 'COMPLIANCE AUDIT',
    title: 'Review & Quality Check',
    duration: '100% Accurate',
    icon: ShieldCheck,
    tagline: 'Rigorous multi-tier verification',
    description: 'Before finalization, our senior compliance officers conduct comprehensive audit checks to ensure absolute accuracy and prevent official queries.',
    deliverables: [
      'Senior CA/CS Multi-Tier Audit',
      'Notice & Defect Prevention',
      'Full Statutory Norms Compliance'
    ],
    accent: 'from-blue-700 to-navy-900',
    glow: 'rgba(9, 25, 35, 0.15)'
  },
  {
    step: '05',
    phase: 'FINAL DISPATCH',
    title: 'Delivery & Ongoing Advisory',
    duration: 'Instant Access',
    icon: Sparkles,
    tagline: 'Certificates handed over with lifelong support',
    description: 'Receive all government-approved digital certificates, compliance dossiers, and automated renewal reminders to keep your enterprise safe.',
    deliverables: [
      'Instant Digital Vault Access',
      'Official Certificates & Filing Dossier',
      'Automated Due Date & Renewal Alerts'
    ],
    accent: 'from-sky-500 to-blue-700',
    glow: 'rgba(2, 132, 199, 0.15)'
  }
];

export default function Process({ onOpenContact }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance progress when autoplay is active
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = PROCESS_DATA[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section 
      id="process" 
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/70 via-blue-50/40 to-slate-50/70 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 -z-0"
        style={{ background: current.glow }}
      />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-brand-900/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-900/5 border border-navy-900/10 text-navy-900 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Our Process Flow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              Simple Steps.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-brand-700 to-navy-900 bg-clip-text text-transparent">
                Big Results.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We make the compliance journey transparent, lightning fast, and 100% stress-free. Every step is engineered for precision and peace of mind.
            </p>
          </div>

          {/* Action & Autoplay Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 border border-slate-200 shadow-sm text-xs text-slate-600">
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-2 font-semibold text-navy-900 hover:text-blue-600 transition-colors"
                title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current text-blue-600" />
                    <span>Auto-Playing Walkthrough</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-slate-700" />
                    <span>Play Walkthrough</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onOpenContact}
              className="btn-shimmer inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#10364E] hover:bg-[#174E72] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Interactive Progress Rail (Desktop / Tablet) */}
        <div className="mb-10 p-2 sm:p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
            {PROCESS_DATA.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 text-left ${
                    isCurrent 
                      ? 'bg-navy-900 text-white shadow-md' 
                      : 'hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  {/* Step Icon / Number Indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : isPast
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isPast ? <Check className="w-4 h-4" /> : step.step}
                  </div>

                  {/* Title & Phase */}
                  <div className="hidden sm:block min-w-0">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCurrent ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      {step.phase}
                    </p>
                    <p className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-white' : 'text-navy-900'
                    }`}>
                      {step.title}
                    </p>
                  </div>

                  {/* Active Progress Bar Under Current Item */}
                  {isCurrent && isAutoPlaying && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-400 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4.5, ease: 'linear' }}
                      key={`progress-${idx}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Creative Interactive Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Feature Card: Focused Active Deep-Dive with High Polish */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="neo-card h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Floating Big Watermark Number */}
                <div className="absolute -top-4 -right-2 text-8xl sm:text-9xl font-black text-slate-100/80 select-none pointer-events-none font-mono">
                  {current.step}
                </div>

                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                        Phase {current.step}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                        {current.phase}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Est. Duration: <strong>{current.duration}</strong></span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.accent} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                        <CurrentIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                          {current.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600">
                          {current.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                      {current.description}
                    </p>
                  </div>

                  {/* Key Deliverables Checklist */}
                  <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                      Key Deliverables In This Phase:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((item, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-[13px] font-medium text-slate-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Controls for the Showcase */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    {PROCESS_DATA.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveStep(i);
                          setIsAutoPlaying(false);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeStep === i 
                            ? 'w-8 bg-navy-900' 
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Jump to step ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev - 1 + PROCESS_DATA.length) % PROCESS_DATA.length);
                        setIsAutoPlaying(false);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev + 1) % PROCESS_DATA.length);
                        setIsAutoPlaying(false);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-[#0F3147] text-xs font-bold text-white transition-colors flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive 5-Step Overview Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {PROCESS_DATA.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-white shadow-card border-blue-400 ring-2 ring-blue-500/20 translate-x-1'
                      : 'bg-white/60 hover:bg-white/90 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-navy-900 text-white shadow-md shadow-brand-900/20'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold ${
                          isCurrent ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          {step.step}.
                        </span>
                        <h4 className={`text-sm font-bold truncate transition-colors ${
                          isCurrent ? 'text-navy-900 font-extrabold' : 'text-slate-700 group-hover:text-navy-900'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {step.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {step.duration}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isCurrent ? 'text-navy-900 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Trust & Performance Assurance Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Speed Guarantee</p>
              <p className="text-sm font-bold text-navy-900">2.5x Faster Turnaround</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Success Rate</p>
              <p className="text-sm font-bold text-navy-900">99.8% First-Time Approval</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Security</p>
              <p className="text-sm font-bold text-navy-900">256-Bit SSL Encrypted Vault</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
