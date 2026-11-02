import React from 'react';
import { ArrowRight, FileText, Phone } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Eyebrow, Section, SectionHeader } from '../components/ui';
import { DocumentsPanel, FeatureGrid, GlanceCard, RelatedServices, StepTimeline } from '../components/ServiceBlocks';
import { useContact } from '../lib/contact';
import { CONTACT } from '../data/site';

const SERVICE = 'GST Filing';

const INCLUSIONS = [
  { title: 'New GST Registration', desc: 'End-to-end registration on the GST common portal with ARN generation and GSTIN certificate issuance.' },
  { title: 'GSTR-1 Monthly / Quarterly Filing', desc: 'Preparation and filing of outward supplies, B2B invoice reporting, export declarations, and HSN summary tables.' },
  { title: 'GSTR-3B Summary Return', desc: 'Calculation of monthly output liability, optimization of eligible Input Tax Credit (ITC), and challan generation.' },
  { title: 'Automated 2A/2B Reconciliation', desc: 'Matching supplier invoice uploads against purchase books to recover missed credits and identify defaulting vendors.' },
  { title: 'GSTR-9 Annual Return & 9C', desc: 'Annual consolidated compliance, balance sheet reconciliation, and statutory disclosure reports.' },
  { title: 'GST Notice Response & Amendments', desc: 'Drafting legal replies for ASMT-10 scrutiny, DRC-01 notices, and processing core/non-core field amendments.' },
];

const DOCUMENTS = [
  'PAN Card of Business entity and Directors / Proprietor',
  'Aadhaar Card of Primary Authorized Signatory',
  'Principal Place of Business Proof (Electricity Bill, Rent Agreement & Owner NOC)',
  'Cancelled Cheque / Bank Statement with IFSC and Account details',
  'Constitutional documents (Partnership Deed, MOA/AOA, or Incorporation Certificate)',
];

const STEPS = [
  { num: '01', title: 'Data Upload', desc: 'Securely upload sales, purchase register, and invoice summaries.' },
  { num: '02', title: 'Tax Audit & Reconciliation', desc: 'Our tax specialist audits ITC eligibility and reconciles GSTR-2B.' },
  { num: '03', title: 'Review & Tax Challan', desc: 'You receive computation summary and tax challan for validation.' },
  { num: '04', title: 'Filing & ARN Acknowledgement', desc: 'Official portal submission with ARN confirmation delivered.' },
];

export default function GstFilingPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'GST Filing Services & Registration Online | Simplifyl',
        description:
          'Get expert GST filing assistance in India: new GST registration, monthly GSTR-1 & GSTR-3B filings, annual GSTR-9 returns, 2B ITC reconciliation, and notice support.',
        canonicalUrl: 'https://simplifyl.com/gst-filing',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'GST Filing' }]}
        eyebrow="Goods & services tax practice"
        title="GST filing & registration services"
        description="Avoid penalty notices, optimize your Input Tax Credit, and maintain an exemplary GST compliance rating with our expert tax filing assistance."
        actions={
          <>
            <Button size="lg" onClick={() => openContact(SERVICE)}>
              Request GST consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href={CONTACT.phoneHref}>
              <Phone className="h-4 w-4" /> Call us
            </Button>
          </>
        }
        aside={
          <GlanceCard
            icon={FileText}
            service={SERVICE}
            items={['GST registration & GSTIN certificate', 'Monthly GSTR-1 & GSTR-3B returns', '2A/2B ITC reconciliation', 'GSTR-9 annual return & notice replies']}
          />
        }
      />

      <Section>
        <SectionHeader
          eyebrow="What we provide"
          title="End-to-end GST advisory & filings"
          description="Tailored for manufacturers, traders, e-commerce sellers, and service exporters."
        />
        <FeatureGrid items={INCLUSIONS} icon={FileText} />
      </Section>

      <Section tone="sunken">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <DocumentsPanel
              title="Documents required for GST filing"
              items={DOCUMENTS}
              note="Document requirements may differ according to your entity type (Pvt Ltd, LLP, Proprietorship)."
            />
          </div>
          <div className="lg:col-span-6">
            <Eyebrow className="mb-4">Workflow</Eyebrow>
            <h2 className="text-h2 font-semibold">How we manage your monthly filings</h2>
            <div className="mt-8">
              <StepTimeline steps={STEPS} orientation="vertical" />
            </div>
          </div>
        </div>
      </Section>

      <RelatedServices current="gst" />

      <CTABanner
        eyebrow="Expert tax assistance"
        title="Need professional assistance for GST filing?"
        description="Consult with our GST advisory team, share your business requirements, and review filing deadlines."
        service={SERVICE}
        primaryLabel="Request GST consultation"
      />
    </SiteLayout>
  );
}
