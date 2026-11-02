import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Accordion, Button, Eyebrow, Section } from './ui';
import { useContact } from '../lib/contact';

export const FAQS = [
  {
    q: 'What is GST registration and who needs it?',
    a: 'GST (Goods and Services Tax) registration is mandatory for businesses whose annual aggregate turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for services and special category states), as well as all interstate sellers and e-commerce operators. Once registered, a business is issued a unique 15-digit GSTIN, enabling legal tax collection and claiming of Input Tax Credit (ITC).',
  },
  {
    q: 'How do I choose between a Private Limited Company and an LLP?',
    a: 'A Private Limited Company offers limited liability protection and is the preferred structure for startups planning to raise angel or venture capital funding through equity shares. A Limited Liability Partnership (LLP) provides limited liability with lower annual statutory compliance costs and no requirement to issue shares, making it well-suited for services firms and partners.',
  },
  {
    q: 'How does the business registration process work?',
    a: 'Business incorporation is completed digitally via the Ministry of Corporate Affairs (MCA) SPICe+ portal. Our team manages Digital Signature Certificates (DSC), name approval reservation, drafting of charter documents (MOA and AOA), and issuance of the Certificate of Incorporation along with company PAN, TAN, and statutory registrations.',
  },
  {
    q: 'What is trademark registration and why is it important?',
    a: 'Trademark registration under the Trade Marks Act, 1999 gives you exclusive legal ownership over your brand name, logo, device mark, or slogan nationwide. It protects your enterprise against counterfeiters and unauthorized competitors while establishing a valuable intellectual property asset.',
  },
  {
    q: 'What are the mandatory ROC annual compliances for companies?',
    a: 'Every registered company and LLP must file statutory annual returns with the MCA regardless of turnover. This includes annual financial statements (AOC-4), annual returns (MGT-7/7A), director KYC (DIR-3 KYC), statutory audit reports, and LLP Form 8 and Form 11.',
  },
  {
    q: 'What documents are required to initiate registration or filing?',
    a: 'Standard documents include PAN cards and Aadhaar/identity proof of all directors or partners, passport-size photographs, registered office address proof (electricity bill, property tax receipt, or rental agreement with an owner NOC), and bank account proofs.',
  },
  {
    q: 'How can I get professional consultation from Simplifyl?',
    a: 'You can request a consultation by filling out our online enquiry form, calling our advisory helpline, or connecting via WhatsApp. Our compliance specialists evaluate your business requirements, explain statutory steps, and provide end-to-end filing support.',
  },
];

export default function FAQSection({ showHeader = true, tone = 'sunken' }) {
  const { openContact } = useContact();

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            {showHeader && (
              <>
                <Eyebrow className="mb-4">Knowledge base</Eyebrow>
                <h2 className="text-h2 font-semibold">Frequently asked questions</h2>
                <p className="mt-4 text-base leading-7 text-fg-muted">
                  Accurate answers to common queries regarding GST, business registrations, trademarks, and statutory corporate compliance.
                </p>
              </>
            )}
            <div className="mt-8 rounded-xl border border-line bg-surface p-5 shadow-xs">
              <MessageSquare className="h-5 w-5 text-brand" strokeWidth={1.75} />
              <p className="mt-3 text-[15px] font-semibold text-fg">Have a question not listed here?</p>
              <p className="mt-1 text-sm leading-6 text-fg-muted">
                Our regulatory consultants are ready to provide clarification on your specific business queries.
              </p>
              <Button size="sm" className="mt-4" onClick={() => openContact()}>
                Ask a consultant
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={FAQS} />
        </div>
      </div>
    </Section>
  );
}
