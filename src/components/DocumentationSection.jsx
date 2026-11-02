import React from 'react';
import { Building2, FileText, ShieldCheck } from 'lucide-react';
import { Card, CheckList, IconTile, Notice, Reveal, Section, SectionHeader } from './ui';
import { useContact } from '../lib/contact';

const DOC_CATEGORIES = [
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
      'Business-related documents as applicable (Partnership Deed, MOA/AOA, or Certificate of Incorporation)',
    ],
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
      'Other applicable incorporation documents (DIR-2 Consent, INC-9 Declaration)',
    ],
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
      'Authorization Documents where applicable (Power of Attorney Form TM-48)',
    ],
  },
];

export default function DocumentationSection() {
  const { openContact } = useContact();

  return (
    <Section>
      <SectionHeader
        eyebrow="Preparation checklist"
        title="Know what documents you need"
        description="Preparing the correct documentation in advance ensures expedited filing and avoids official departmental queries."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {DOC_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.06}>
            <Card className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                <div>
                  <span className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">{cat.badge}</span>
                  <h3 className="mt-2 text-h3 font-semibold">{cat.title}</h3>
                  <p className="mt-1 text-sm text-fg-subtle">{cat.subtitle}</p>
                </div>
                <IconTile icon={cat.icon} />
              </div>
              <CheckList items={cat.items} className="flex-1 p-6" />
              <div className="border-t border-line p-4">
                <button type="button" onClick={() => openContact(cat.title)} className="btn btn-secondary btn-md w-full">
                  Request custom checklist
                </button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Notice tone="warn" title="Important notice:" className="mx-auto mt-8 max-w-4xl">
        Document requirements vary according to the applicant, entity type, state-specific bylaws, and applicable government regulations. Our
        consultants review your specific situation and provide a personalized checklist before any formal submission.
      </Notice>
    </Section>
  );
}
