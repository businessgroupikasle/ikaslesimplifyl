import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, Building2, ShieldCheck, Receipt, Landmark, Stamp, BadgePercent, Scale } from 'lucide-react';

/**
 * BackgroundIcons Component
 * Adds animated, tasteful GST & Registration floating badges and watermarks
 * to enhance the corporate background on desktop and high-res screens.
 */
export default function BackgroundIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. HERO - TOP LEFT: Floating GST Filing Certificate Badge */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [-2, 3, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-28 left-[2%] xl:left-[4%] 2xl:left-[7%] hidden md:flex items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-[0_10px_30px_rgba(9,25,35,0.06)] select-none opacity-80 hover:opacity-100 transition-opacity"
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-900 to-blue-700 text-white flex flex-col items-center justify-center shadow-md">
          <span className="text-[10px] font-black tracking-tighter leading-none">GST</span>
          <FileCheck2 className="w-4 h-4 mt-0.5 text-sky-300" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-900">
            GST Filing Active
          </span>
          <span className="text-[10px] font-semibold text-blue-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping inline-block" />
            GSTR-1 & 3B Verified
          </span>
        </div>
      </motion.div>

      {/* 2. HERO - TOP RIGHT: Business Registration (ROC / MCA) Badge */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [2, -3, 2],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="absolute top-36 right-[2%] xl:right-[3%] 2xl:right-[6%] hidden lg:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-[0_10px_30px_rgba(9,25,35,0.06)] select-none opacity-80"
      >
        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-navy-900 shadow-sm">
          <Building2 className="w-5 h-5 text-navy-900" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-900">
            Company Reg.
          </span>
          <span className="text-[10px] font-semibold text-slate-500">
            Pvt Ltd • LLP • ROC
          </span>
        </div>
      </motion.div>

      {/* 3. MID-SERVICES - LEFT: GST Invoicing & Tax Ledger Watermark Stamp */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [4, -2, 4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute top-[38%] left-[1%] xl:left-[3%] 2xl:left-[6%] hidden xl:flex flex-col items-center p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-blue-200/70 shadow-[0_12px_36px_rgba(9,25,35,0.05)] select-none opacity-75"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#091923] to-blue-600 flex items-center justify-center text-white mb-2 shadow-sm">
          <Receipt className="w-6 h-6 text-sky-200" />
        </div>
        <span className="text-xs font-black text-navy-900 uppercase tracking-widest">
          GST TAX
        </span>
        <span className="text-[10px] font-bold text-blue-700 mt-0.5">
          E-Invoicing Ready
        </span>
      </motion.div>

      {/* 4. MID-SERVICES - RIGHT: Official Trademark (™ / ®) Protection Badge */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[42%] right-[1%] xl:right-[3%] 2xl:right-[5%] hidden xl:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-[0_10px_30px_rgba(9,25,35,0.06)] select-none opacity-80"
      >
        <div className="w-11 h-11 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-navy-900 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-navy-900" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-900 flex items-center gap-1">
            Trademark <span className="text-[10px] px-1 py-0.2 rounded bg-navy-900 text-white">®</span>
          </span>
          <span className="text-[10px] font-semibold text-blue-700">
            Brand Protected
          </span>
        </div>
      </motion.div>

      {/* 5. ABOUT SECTION - LEFT: Government MCA / ROC Compliance Seal */}
      <motion.div
        animate={{
          y: [0, -16, 0],
          rotate: [-4, 2, -4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-[58%] left-[2%] xl:left-[4%] 2xl:left-[7%] hidden xl:flex items-center gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_28px_rgba(9,25,35,0.04)] select-none opacity-75"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900">
          <Landmark className="w-5 h-5 text-navy-900" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold text-navy-900 uppercase tracking-tight">
            MCA Filing
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            ROC Compliance
          </span>
        </div>
      </motion.div>

      {/* 6. WHY CHOOSE US - RIGHT: Official Registration Stamp Watermark */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
        className="absolute top-[68%] right-[2%] xl:right-[4%] 2xl:right-[6%] hidden xl:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-[0_10px_30px_rgba(9,25,35,0.05)] select-none opacity-80"
      >
        <div className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-sm">
          <Stamp className="w-5 h-5 text-sky-300" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-black uppercase tracking-wider text-navy-900">
            MSME / Udyam
          </span>
          <span className="text-[10px] font-semibold text-blue-700">
            Govt. Registered
          </span>
        </div>
      </motion.div>

      {/* 7. PROCESS / INSIGHTS - LEFT: Legal & Tax Compliance Balance Scale */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-2, 3, -2],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.2,
        }}
        className="absolute top-[82%] left-[2%] xl:left-[4%] 2xl:left-[6%] hidden xl:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/70 backdrop-blur-md border border-blue-200/70 shadow-[0_8px_28px_rgba(9,25,35,0.04)] select-none opacity-75"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-navy-900">
          <Scale className="w-5 h-5 text-navy-900" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-extrabold uppercase tracking-tight text-navy-900">
            Legal Audit
          </span>
          <span className="text-[10px] text-blue-700 font-semibold">
            100% Validated
          </span>
        </div>
      </motion.div>

      {/* 8. WATERMARK EMBLEMS IN THE DISTANCE: Giant Faint Watermark Icons */}
      <div className="absolute top-[18%] right-[12%] pointer-events-none select-none opacity-[0.04] text-navy-900">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" fill="none" />
          <text x="50" y="44" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="sans-serif">GST</text>
          <text x="50" y="62" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1" fontFamily="sans-serif">INDIA</text>
          <polygon points="50,68 53,74 60,75 55,80 56,86 50,83 44,86 45,80 40,75 47,74" />
        </svg>
      </div>

      <div className="absolute top-[52%] left-[10%] pointer-events-none select-none opacity-[0.035] text-blue-900">
        <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
          <rect x="15" y="10" width="70" height="80" rx="8" stroke="currentColor" strokeWidth="5" fill="none" />
          <line x1="28" y1="28" x2="72" y2="28" stroke="currentColor" strokeWidth="4" />
          <line x1="28" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="4" />
          <line x1="28" y1="56" x2="55" y2="56" stroke="currentColor" strokeWidth="4" />
          <circle cx="68" cy="68" r="14" stroke="currentColor" strokeWidth="4" fill="none" />
          <polyline points="63,68 67,72 74,64" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="absolute top-[78%] right-[8%] pointer-events-none select-none opacity-[0.035] text-navy-900">
        <svg width="260" height="260" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,10 L85,25 L85,60 C85,80 50,92 50,92 C50,92 15,80 15,60 L15,25 Z" stroke="currentColor" strokeWidth="5" fill="none" />
          <text x="50" y="56" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="sans-serif">REG</text>
        </svg>
      </div>

    </div>
  );
}
