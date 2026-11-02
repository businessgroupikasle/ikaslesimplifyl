import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from '../lib/router';

export default function FAQSection({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is GST registration and who needs it?',
      a: 'GST (Goods and Services Tax) registration is mandatory for businesses whose annual aggregate turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for services and special category states), as well as all interstate sellers and e-commerce operators. Once registered, a business is issued a unique 15-digit GSTIN, enabling legal tax collection and claiming of Input Tax Credit (ITC).'
    },
    {
      q: 'How do I choose between a Private Limited Company and an LLP?',
      a: 'A Private Limited Company offers limited liability protection and is the preferred structure for startups planning to raise angel or venture capital funding through equity shares. A Limited Liability Partnership (LLP) provides limited liability with lower annual statutory compliance costs and no requirement to issue shares, making it well-suited for services firms and partners.'
    },
    {
      q: 'How does the business registration process work?',
      a: 'Business incorporation is completed digitally via the Ministry of Corporate Affairs (MCA) SPICe+ portal. Our team manages Digital Signature Certificates (DSC), name approval reservation, drafting of charter documents (MOA and AOA), and issuance of the Certificate of Incorporation along with company PAN, TAN, and statutory registrations.'
    },
    {
      q: 'What is trademark registration and why is it important?',
      a: 'Trademark registration under the Trade Marks Act, 1999 gives you exclusive legal ownership over your brand name, logo, device mark, or slogan nationwide. It protects your enterprise against counterfeiters and unauthorized competitors while establishing a valuable intellectual property asset.'
    },
    {
      q: 'What are the mandatory ROC annual compliances for companies?',
      a: 'Every registered company and LLP must file statutory annual returns with the MCA regardless of turnover. This includes annual financial statements (AOC-4), annual returns (MGT-7/7A), director KYC (DIR-3 KYC), statutory audit reports, and LLP Form 8 and Form 11.'
    },
    {
      q: 'What documents are required to initiate registration or filing?',
      a: 'Standard documents include PAN cards and Aadhaar/identity proof of all directors or partners, passport-size photographs, registered office address proof (electricity bill, property tax receipt, or rental agreement with an owner NOC), and bank account proofs.'
    },
    {
      q: 'How can I get professional consultation from Simplifyl?',
      a: 'You can request a consultation by filling out our online enquiry form, calling our advisory helpline, or connecting via WhatsApp. Our compliance specialists evaluate your business requirements, explain statutory steps, and provide end-to-end filing support.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              KNOWLEDGE BASE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Accurate answers to common queries regarding GST, business registrations, trademarks, and statutory corporate compliance.
          </p>
        </div>

        {/* 7 Accordion Questions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-slate-50 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#142B4A] pr-4">
                    {index + 1}. {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-[#142B4A] text-white rotate-180' : 'bg-[#F5F7FA] text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#142B4A]">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Our regulatory consultants are ready to provide clarification on your specific business queries.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Ask a Consultant
          </button>
        </div>

      </div>
    </section>
  );
}
