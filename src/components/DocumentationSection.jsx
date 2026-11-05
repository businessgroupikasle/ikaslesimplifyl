import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Building2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DocumentationSection({ onOpenContact }) {
  const docCategories = [
    {
      title: 'GST Documents',
      subtitle: 'Required for Goods & Services Tax Registration',
      icon: FileText,
      badge: 'Tax Compliance',
      items: [
        'PAN Card (Permanent Account Number) of Business / Proprietor',
        'Aadhaar Card of Proprietor / Partners / Managing Director',
        'Business Address Proof (Electricity Bill, Property Tax Receipt, or Rent Agreement with Owner NOC)',
        'Bank Account Details (Cancelled Cheque, Passbook First Page, or Bank Statement)',
        'Authorized Signatory Proof (Letter of Authorization / Board Resolution)',
        'Business-related documents as applicable (Partnership Deed, MOA/AOA, or Certificate of Incorporation)'
      ]
    },
    {
      title: 'Business Registration Documents',
      subtitle: 'Required for Company & Entity Incorporation',
      icon: Building2,
      badge: 'Corporate Setup',
      items: [
        'PAN Card of all Proposed Directors and Shareholders',
        'Identity Proof (Valid Voter ID, Passport, or Driving License)',
        'Address Proof (Bank Statement or Utility Bill not older than 2 months)',
        'Passport-size Photograph where required for all signatories',
        'Registered Office Proof (Electricity Bill with NOC from the premises owner)',
        'Other applicable incorporation documents (DIR-2 Consent, INC-9 Declaration)'
      ]
    },
    {
      title: 'Trademark Documents',
      subtitle: 'Required for Brand & Intellectual Property Protection',
      icon: ShieldCheck,
      badge: 'Brand Protection',
      items: [
        'Applicant Details (Full Legal Name, Nationality, and Registered Address)',
        'Brand / Logo (High-resolution image representation of the wordmark or device)',
        'Business Details (Incorporation Certificate or Udyam Certificate for reduced govt fees)',
        'Trademark Class Information & Description of relevant goods or services',
        'User Affidavit & Prior Use Proof (if claiming prior brand use)',
        'Authorization Documents where applicable (Power of Attorney Form TM-48)'
      ]
    }
  ];

  return (
    <section className="pt-8 pb-8 lg:pt-10 lg:pb-10 bg-[#F5F7FA] dark:bg-[#0C2332] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F8FB] dark:bg-blue-950/60 border border-[#E3EFF8] dark:border-blue-800/60 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
            <span className="text-xs font-bold text-[#1C6FA5] dark:text-blue-300 tracking-wider uppercase">
              PREPARATION CHECKLIST
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10364E] dark:text-white tracking-tight">
            Know What Documents You Need
          </h2>

          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Preparing the correct documentation in advance ensures expedited filing and avoids official departmental queries.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {docCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(16,54,78,0.04)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] dark:text-blue-400 bg-[#F4F8FB] dark:bg-slate-800 px-2.5 py-1 rounded border border-[#E3EFF8] dark:border-slate-700">
                      {cat.badge}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#F4F8FB] dark:bg-slate-800 border border-[#E3EFF8] dark:border-slate-700 flex items-center justify-center text-[#1C6FA5] dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Standardized header container ensuring identical height across all cards */}
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-[#10364E] dark:text-white leading-snug min-h-[48px]">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px] leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Aligned divider line & uniform document item spacing */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex-grow">
                    <ul className="space-y-3">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6FA5] dark:text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 dark:text-slate-300 leading-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                  <button
                    onClick={() => onOpenContact(cat.title)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#F4F8FB] dark:bg-slate-800 hover:bg-[#E3EFF8] dark:hover:bg-slate-700 border border-[#C1DEF0] dark:border-slate-700 text-xs font-bold text-[#10364E] dark:text-slate-200 transition-colors text-center"
                  >
                    Request Custom Checklist
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clear Regulatory Disclaimer Note */}
        <div className="mt-6 p-4 rounded-xl bg-white dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 max-w-4xl mx-auto shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Important Notice:</strong> Document requirements vary according to the applicant, entity type, state-specific bylaws, and applicable government regulations. Our consultants review your specific situation and provide a personalized checklist before any formal submission.
          </p>
        </div>

      </div>
    </section>
  );
}
