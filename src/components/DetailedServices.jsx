import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, FileCheck2, FileText, ListChecks, ShieldCheck, Sparkles, Workflow, HelpCircle, FolderOpen } from 'lucide-react';
import { Button, Card, CheckList, NumberedList, Section, SectionHeader } from './ui';
import { useContact } from '../lib/contact';
import { cn } from '../lib/utils';
import gstImg from '../assets/article_gst.jpg';
import bizImg from '../assets/article_business.jpg';
import tmImg from '../assets/article_trademark.jpg';
import compImg from '../assets/compliance_team.jpg';

const CATEGORIES = {
  gst: {
    id: 'gst',
    label: 'GST Filing',
    title: 'GST Filing & Taxation Services',
    tagline: 'End-to-end statutory goods & services tax management',
    icon: FileText,
    image: gstImg,
    pageLink: '/gst-filing',
    description:
      'Comprehensive GST support tailored for traders, manufacturers, service providers, and digital businesses. We handle initial GST registrations, periodic monthly and quarterly returns, ITC reconciliations, and responses to department notices.',
    servicesList: [
      'New GST Registration for Proprietors, Partnerships, & Companies',
      'Monthly GSTR-1 (Outward Supplies) & GSTR-3B (Summary Return) Filing',
      'GSTR-9 Annual Return & GSTR-9C Reconciliation Statement',
      'Input Tax Credit (ITC) 2A/2B Automated Reconciliation',
      'Core & Non-Core Field GST Amendments',
      'Voluntary Cancellation and Revocation of Cancelled GSTIN',
      'Drafting replies to ASMT-10, DRC-01, and Department Inquiries',
    ],
    benefits: [
      'Avoid late filing fees and compounding interest penalties',
      'Prevent working capital blockage by optimizing Input Tax Credit',
      'Maintain high GST compliance rating on the official portal',
      'Timely intimation of changing GST notifications and rate updates',
    ],
    documents: [
      'PAN Card of Business and Directors / Proprietor',
      'Aadhaar Card / Identification of Authorized Signatory',
      'Proof of Business Place (Electricity Bill / Rent Agreement & NOC)',
      'Cancelled Cheque / Bank Account Statement',
      'Board Resolution or Letter of Authorization',
    ],
    process: [
      'Step 1: Document sharing via encrypted workspace',
      'Step 2: Sales, purchase, and ITC data verification by tax specialist',
      'Step 3: Draft tax liability calculation and client approval',
      'Step 4: Government filing submission and challan acknowledgement dispatch',
    ],
    faqs: [
      {
        q: 'Who is required to obtain GST registration?',
        a: 'Businesses with turnover exceeding ₹40 Lakhs (₹20 Lakhs for special category states) for goods or ₹20 Lakhs (₹10 Lakhs for special category states) for services, as well as all e-commerce sellers and interstate suppliers regardless of turnover.',
      },
      {
        q: 'What is the due date for monthly GSTR-3B?',
        a: 'GSTR-3B is typically due by the 20th of the following month for regular monthly taxpayers, or staggered dates under the QRMP scheme.',
      },
    ],
  },
  business: {
    id: 'business',
    label: 'Business Incorporation',
    title: 'Business Incorporation & Entity Setup',
    tagline: 'Structured company registration with statutory authorities',
    icon: Building2,
    image: bizImg,
    pageLink: '/business-registration',
    description:
      'Turn your enterprise idea into a legally recognized corporate entity. We assist in evaluating suitable structures, drafting constitutional charter documents, filing with the Registrar of Companies (ROC), and securing post-incorporation registrations.',
    servicesList: [
      'Private Limited Company Incorporation (SPICe+ Part A & B)',
      'Limited Liability Partnership (LLP) Registration (FiLLiP)',
      'One Person Company (OPC) for Solo Entrepreneurs',
      'Partnership Firm Registration & Drafting of Partnership Deed',
      'Sole Proprietorship Registration (Udyam & Shop Act)',
      'MSME / Udyam Certificate for Priority Lending Benefits',
      'Startup India Recognition & DPIIT Certificate Assistance',
    ],
    benefits: [
      'Limited liability protection safeguarding personal assets',
      'Greater credibility with enterprise vendors and commercial banks',
      'Clear shareholding structure enabling angel and VC investment',
      'Access to government subsidies, public tenders, and tax holidays',
    ],
    documents: [
      'PAN Card of all Directors and Shareholders',
      'Identity Proof (Voter ID / Passport / Driving License)',
      'Address Proof (Bank Statement / Electricity Bill not older than 2 months)',
      'Passport-sized photographs of Directors',
      'Registered Office Proof (Electricity Bill + NOC from property owner)',
    ],
    process: [
      'Step 1: Consultation on optimal entity type and name search check',
      'Step 2: Obtaining Digital Signature Certificates (DSC) and Director Identification',
      'Step 3: Drafting Memorandum (MOA) and Articles of Association (AOA)',
      'Step 4: Submission to MCA and issuance of Certificate of Incorporation (COI)',
    ],
    faqs: [
      {
        q: 'How long does Private Limited incorporation take?',
        a: 'Typically 5 to 10 business days subject to ROC approval and prompt submission of verified identity documents.',
      },
      {
        q: 'Is a physical commercial office mandatory for company registration?',
        a: 'No. You can register your company at a residential address provided you submit an electricity bill and NOC from the owner.',
      },
    ],
  },
  trademark: {
    id: 'trademark',
    label: 'Trademark & IP',
    title: 'Trademark & Intellectual Property',
    tagline: 'Protect your brand name, logo, and commercial identity',
    icon: ShieldCheck,
    image: tmImg,
    pageLink: '/trademark-registration',
    description:
      'Shield your hard-earned reputation and brand value. We conduct rigorous trademark availability searches across the 45 Nice classes, draft formal applications (Form TM-A), and assist throughout examination, opposition, and renewal.',
    servicesList: [
      'Public Trademark Search & Class Identification Report',
      'Trademark Application Filing (Word Mark, Device Mark, Logo)',
      'Drafting Formal Legal Replies to Trademark Examination Objections',
      'Hearing Representation and Advocate Coordination',
      'Trademark Opposition Notice and Counter-Statement Drafting',
      'Trademark Renewal (Every 10 years) & Restoration',
      'Brand Protection Guidance and Cease-and-Desist Notices',
    ],
    benefits: [
      'Exclusive nationwide legal monopoly over your brand name',
      'Right to display the prestigious ® registered trademark symbol',
      'Deters counterfeiters and copycat competitors from hijacking your brand',
      'Valuable intangible corporate asset eligible for licensing or franchising',
    ],
    documents: [
      'Applicant Name, Address, and Nationality Details',
      'High-Resolution Brand Logo / Wordmark in JPEG/PNG format',
      'Brief description of goods and services being provided under the brand',
      'Date of first commercial use in India (or filed on Proposed to be Used basis)',
      'Power of Attorney / Form TM-48 signed by the applicant',
    ],
    process: [
      'Step 1: Exhaustive phonetic and semantic trademark search',
      'Step 2: Selection of appropriate Nice classes and applicant classification',
      'Step 3: Lodging Form TM-A with the Trademark Registry (IP India)',
      'Step 4: Immediate issuance of application number allowing use of ™ symbol',
    ],
    faqs: [
      {
        q: 'When can I start using the ™ symbol?',
        a: 'You can display ™ immediately after submitting the trademark application and receiving the official acknowledgement.',
      },
      {
        q: 'When can I use the ® symbol?',
        a: 'The ® symbol may legally be displayed only after the Trademark Registrar formally issues the Final Registration Certificate.',
      },
    ],
  },
  compliance: {
    id: 'compliance',
    label: 'Compliance & ROC',
    title: 'Statutory Corporate Compliance & ROC',
    tagline: 'Active regulatory maintenance and secretarial protection',
    icon: FileCheck2,
    image: compImg,
    pageLink: '/compliance-support',
    description:
      'Ensure your enterprise remains in active standing with the Ministry of Corporate Affairs (MCA) and tax authorities. We manage annual returns, secretarial documentation, director KYC, and board resolutions to prevent disqualification and penalties.',
    servicesList: [
      'Annual ROC Filing for Private Limited Companies (AOC-4 & MGT-7/7A)',
      'Annual LLP Returns Filing (Form 11 & Form 8)',
      'Annual Director KYC (DIR-3 KYC Web / e-Form)',
      'Drafting Minutes of Board Meetings and Annual General Meetings (AGM)',
      'Appointment, Resignation, and Change of Directors (DIR-12)',
      'Increase in Authorized Share Capital and Alteration of MOA (SH-7)',
      'Filing of Commencement of Business Certificate (Form INC-20A)',
    ],
    benefits: [
      'Protects directors against severe disqualification under Section 164',
      'Eliminates hefty daily compounding late penalties imposed by the MCA',
      'Keeps your company in Active status for banking and funding diligence',
      'Maintains orderly statutory registers and corporate records',
    ],
    documents: [
      'Audited Financial Statements (Balance Sheet & Profit/Loss Account)',
      'Directors’ Report with statutory disclosures',
      'Active Digital Signature Certificate (DSC) of Director and Auditor/CS',
      'Updated List of Shareholders and Share Transfers (if any)',
    ],
    process: [
      'Step 1: Review of annual books and statutory audit statements',
      'Step 2: Drafting annual governance documents (Notice, AGM Minutes, Director Report)',
      'Step 3: Preparation and digital signing of AOC-4 and MGT-7 forms',
      'Step 4: Official filing on MCA portal and archiving SRN challan receipts',
    ],
    faqs: [
      {
        q: 'What happens if a company fails to file annual ROC returns?',
        a: 'Late fees accumulate at ₹100 per day per form with no upper cap, directors risk disqualification for 5 years, and the ROC may initiate strike-off proceedings.',
      },
      {
        q: 'Is DIR-3 KYC mandatory for non-active directors?',
        a: 'Yes. Every individual holding a DIN must complete annual Director KYC regardless of whether they actively hold directorships.',
      },
    ],
  },
};

const PANELS = [
  { id: 'services', label: 'Inclusions', title: 'Individual services & inclusions', icon: ListChecks },
  { id: 'benefits', label: 'Benefits', title: 'Key benefits & value delivered', icon: Sparkles },
  { id: 'documents', label: 'Documents', title: 'Required documents & checklists', icon: FolderOpen },
  { id: 'process', label: 'Process', title: 'Standard process flow', icon: Workflow },
  { id: 'faqs', label: 'FAQs', title: 'Category frequently asked questions', icon: HelpCircle },
];

function PanelBody({ panel, current }) {
  switch (panel) {
    case 'services':
      return <CheckList items={current.servicesList} columns={2} />;
    case 'benefits':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {current.benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 rounded-lg border border-line bg-sunken p-4 text-sm leading-6 text-fg-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {b}
            </div>
          ))}
        </div>
      );
    case 'documents':
      return (
        <>
          <NumberedList items={current.documents} />
          <p className="mt-5 text-xs italic leading-5 text-fg-subtle">
            Note: Exact document requirements may vary slightly depending on applicant constitution, entity type, and regulatory amendments.
          </p>
        </>
      );
    case 'process':
      return (
        <ol className="grid gap-3 sm:grid-cols-2">
          {current.process.map((step, i) => (
            <li key={step} className="rounded-lg border border-line bg-sunken p-4">
              <span className="font-mono text-[11px] text-brand">Phase {String(i + 1).padStart(2, '0')}</span>
              <p className="mt-1.5 text-sm font-medium leading-6 text-fg">{step.replace(/^Step \d+:\s*/, '')}</p>
            </li>
          ))}
        </ol>
      );
    case 'faqs':
      return (
        <dl className="divide-y divide-line">
          {current.faqs.map((f) => (
            <div key={f.q} className="py-4 first:pt-0 last:pb-0">
              <dt className="text-[15px] font-medium text-fg">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-6 text-fg-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

export default function DetailedServices() {
  const { openContact } = useContact();
  const [active, setActive] = useState('gst');
  const [panel, setPanel] = useState('services');
  const current = CATEGORIES[active];
  const panelMeta = PANELS.find((p) => p.id === panel);

  return (
    <Section>
      <SectionHeader
        align="center"
        eyebrow="Detailed breakdown"
        title="Detailed service specifications"
        description="Review inclusions, documentation requirements, procedural steps, and tangible benefits for each core compliance practice."
      />

      {/* Category segmented control */}
      <div className="mb-8 flex justify-center">
        <div role="tablist" aria-label="Service category" className="scrollbar-none -mx-4 flex max-w-full gap-1 overflow-x-auto px-4 sm:mx-0 sm:rounded-lg sm:border sm:border-line sm:bg-sunken sm:p-1">
          {Object.values(CATEGORIES).map((cat) => {
            const Icon = cat.icon;
            const on = active === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setActive(cat.id);
                  setPanel('services');
                }}
                className={cn(
                  'relative inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors',
                  on ? 'text-fg' : 'text-fg-muted hover:text-fg',
                )}
              >
                {on && (
                  <motion.span
                    layoutId="detailed-tab"
                    className="absolute inset-0 rounded-md border border-line bg-surface shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon className={cn('relative h-4 w-4', on ? 'text-brand' : 'text-fg-subtle')} strokeWidth={1.75} />
                <span className="relative">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Overview */}
            <div className="grid gap-8 border-b border-line p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
              <div className="lg:col-span-8">
                <span className="chip chip-brand">{current.tagline}</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[28px]">{current.title}</h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg-muted">{current.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={() => openContact(current.title)}>
                    Enquire for this practice <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" to={current.pageLink}>
                    Dedicated service page
                  </Button>
                </div>
              </div>
              <div className="hidden lg:col-span-4 lg:block">
                <div className="overflow-hidden rounded-xl border border-line">
                  <img
                    src={current.image}
                    alt=""
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/11] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sub-navigation + panel */}
            <div className="grid lg:grid-cols-12">
              <nav
                aria-label="Detail sections"
                className="scrollbar-none flex gap-1 overflow-x-auto border-b border-line bg-sunken p-2 lg:col-span-3 lg:flex-col lg:border-b-0 lg:border-r lg:p-3"
              >
                {PANELS.map((p, i) => {
                  const Icon = p.icon;
                  const on = panel === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPanel(p.id)}
                      aria-pressed={on}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors',
                        on ? 'bg-surface text-fg shadow-xs ring-1 ring-line' : 'text-fg-muted hover:bg-surface/60 hover:text-fg',
                      )}
                    >
                      <span className="hidden font-mono text-[11px] text-fg-subtle lg:inline">{String(i + 1).padStart(2, '0')}</span>
                      <Icon className={cn('h-4 w-4', on ? 'text-brand' : 'text-fg-subtle')} strokeWidth={1.75} />
                      {p.label}
                    </button>
                  );
                })}
              </nav>

              <div className="min-h-[300px] p-6 sm:p-8 lg:col-span-9 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={panel}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="mb-6 text-lg font-semibold tracking-tight">{panelMeta.title}</h4>
                    <PanelBody panel={panel} current={current} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-line bg-sunken px-6 py-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
              <p className="text-sm text-fg-muted">Have specific questions regarding {current.title}? Our consultants are available to assist.</p>
              <Button size="sm" variant="secondary" onClick={() => openContact(current.title)}>
                Enquire for this service <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </Section>
  );
}
