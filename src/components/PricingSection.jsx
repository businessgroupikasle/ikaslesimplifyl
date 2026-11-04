import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Info, ShieldCheck } from 'lucide-react';

export default function PricingSection({ onOpenContact }) {
  const pricingPlans = [
    {
      category: 'GST Filing',
      badge: 'Tax Advisory',
      description: 'Monthly and quarterly GST return filing, reconciliations, and compliance advisory.',
      professionalFee: 'Configurable by turnover / volume',
      governmentFee: 'Nil (Statutory late fee at actuals if overdue)',
      included: [
        'Monthly GSTR-1 & GSTR-3B filings',
        '2A / 2B Input Tax Credit reconciliation',
        'HSN summary & invoice validation',
        'Quarterly compliance review'
      ]
    },
    {
      category: 'Business Registration',
      badge: 'Company Incorporation',
      description: 'Complete assistance for Private Limited, LLP, OPC, and Partnership setup.',
      professionalFee: 'Consultation-based package',
      governmentFee: 'MCA & Name approval fees at actuals by State',
      included: [
        'RUN Name reservation filing',
        'Digital Signature Certificates (DSC)',
        'Drafting MOA & AOA charters',
        'PAN, TAN & Certificate of Incorporation'
      ]
    },
    {
      category: 'Trademark Registration',
      badge: 'IP Protection',
      description: 'End-to-end brand protection across relevant commercial Nice classes.',
      professionalFee: 'Standard professional fee per mark',
      governmentFee: '₹4,500 (Individual/Startup) or ₹9,000 (Others) at actuals',
      included: [
        'Comprehensive trademark registry search',
        'Class classification & specification',
        'Filing Form TM-A with IP India',
        'Application tracking & ™ usage intimation'
      ]
    },
    {
      category: 'Compliance Support',
      badge: 'Secretarial Care',
      description: 'Statutory annual ROC returns, Director KYC, and secretarial documentation.',
      professionalFee: 'Annual retainer / customized scope',
      governmentFee: 'MCA filing fees as per authorized share capital slab',
      included: [
        'Annual AOC-4 & MGT-7/7A preparation',
        'Annual Director KYC (DIR-3 KYC)',
        'Board & AGM minutes documentation',
        'Statutory register maintenance'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F8FB] border border-[#E3EFF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
            <span className="text-xs font-bold text-[#1C6FA5] tracking-wider uppercase">
              TRANSPARENT STRUCTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10364E] tracking-tight">
            Transparent Pricing for Your Business Needs
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            We maintain total fee clarity. Government statutory fees are always separated from our professional consultancy charges with zero hidden surprises.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, idx) => {
            const isPopular = plan.category === 'Business Registration';
            return (
              <motion.div
                key={plan.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-white border glass-hover transition-all duration-300 overflow-hidden card-glow ${
                  isPopular
                    ? 'border-[#1C6FA5] shadow-[0_12px_36px_rgba(28,111,165,0.18)]'
                    : 'border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.04)]'
                }`}
              >
                {/* Top Glowing Gradient Accent Line */}
                <div className={`absolute top-0 inset-x-0 h-1.5 ${isPopular ? 'bg-gradient-to-r from-[#10364E] via-[#1C6FA5] to-[#4FA2D8]' : 'bg-transparent'}`} />

                {isPopular && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#1C6FA5] to-indigo-600 px-2.5 py-0.5 rounded-full shadow-xs">
                      Popular Choice
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] bg-[#F4F8FB] px-2.5 py-1 rounded-full border border-blue-100">
                    {plan.badge}
                  </span>

                  <h3 className="text-base font-extrabold text-[#10364E] mt-3">
                    {plan.category}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 mb-5 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Separated Fees Block */}
                  <div className="space-y-3 p-4 rounded-xl bg-gradient-to-b from-[#F5F7FA] to-slate-50/60 border border-slate-200/90 mb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Professional Service Fee:
                      </span>
                      <span className="text-xs font-extrabold text-[#10364E]">
                        {plan.professionalFee}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Government Statutory Fee:
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {plan.governmentFee}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      What's Included:
                    </p>
                    <ul className="space-y-2">
                      {plan.included.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6FA5] shrink-0 mt-0.5" />
                          <span className="font-medium">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenContact(plan.category)}
                    className={`btn-shimmer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm group/btn ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#10364E] via-[#144463] to-[#1C6FA5] text-white hover:shadow-lg'
                        : 'bg-[#10364E] hover:bg-[#174E72] text-white hover:shadow-md'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Notice */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-[#1C6FA5] shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Fee Transparency Policy:</strong> Government fees, stamp duties, and registration charges are determined strictly by official statutory portals (MCA, GSTN, Trademark Registry) and billed at exact actuals. Professional advisory fees are shared upfront before commencing any work with zero hidden additions.
          </p>
        </div>

      </div>
    </section>
  );
}
