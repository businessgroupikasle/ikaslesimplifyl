import React from 'react';
import { AlertTriangle, ArrowRight, FileCheck2, Phone } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Reveal, Section, SectionHeader } from '../components/ui';
import { FeatureGrid, GlanceCard, RelatedServices } from '../components/ServiceBlocks';
import { useContact } from '../lib/contact';
import { CONTACT } from '../data/site';

const SERVICE = 'Compliance Support';

const COMPLIANCE_LIST = [
  {
    title: 'Form AOC-4 (Financial Statements Filing)',
    desc: 'Annual mandatory filing of balance sheet, profit and loss account, auditor’s report, and directors’ report with the ROC within 30 days of AGM.',
  },
  {
    title: 'Form MGT-7 / MGT-7A (Annual Return)',
    desc: 'Statutory annual return capturing shareholder lists, share transfers, promoter holding, and meeting details within 60 days of AGM.',
  },
  {
    title: 'Annual Director KYC (DIR-3 KYC)',
    desc: 'Mandatory verification for every individual allocated a DIN (Director Identification Number) to prevent deactivation and severe late penalties.',
  },
  {
    title: 'LLP Form 11 & Form 8 Filings',
    desc: 'Annual Statement of Account & Solvency (Form 8) and Annual Return of LLP (Form 11) filed with the Registrar of Companies.',
  },
  {
    title: 'Board & AGM Secretarial Minutes',
    desc: 'Preparation of statutory notices, board meeting minutes, AGM resolutions, and maintaining statutory registers under Companies Act norms.',
  },
  {
    title: 'Commencement of Business (INC-20A)',
    desc: 'Filing verification of paid-up capital and bank account within 180 days of incorporation to allow commencement of commercial operations.',
  },
];

export default function ComplianceSupportPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'Annual ROC Compliance & Corporate Secretarial Support | Simplifyl',
        description:
          'Ensure your Private Limited company and LLP remain in good standing: AOC-4, MGT-7 annual filings, Director KYC (DIR-3), AGM documentation, and statutory compliance in India.',
        canonicalUrl: 'https://simplifyl.com/compliance-support',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Compliance Support' }]}
        eyebrow="Corporate secretarial practice"
        title="Corporate compliance & annual ROC filings"
        description="Protect your directors from disqualification and eliminate compounding MCA late penalties. We manage complete secretarial compliance for Private Limited and LLP entities."
        actions={
          <>
            <Button size="lg" onClick={() => openContact(SERVICE)}>
              Request compliance audit <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href={CONTACT.phoneHref}>
              <Phone className="h-4 w-4" /> Call us
            </Button>
          </>
        }
        aside={
          <GlanceCard
            icon={FileCheck2}
            service={SERVICE}
            items={['AOC-4 & MGT-7/7A annual filings', 'DIR-3 KYC for every DIN holder', 'LLP Form 8 & Form 11', 'Board & AGM minutes, statutory registers']}
          />
        }
      />

      <Section>
        <SectionHeader
          eyebrow="Statutory scope"
          title="Mandatory annual filings we handle"
          description="Every registered Indian corporate entity must fulfill periodic secretarial requirements regardless of business activity."
        />
        <FeatureGrid items={COMPLIANCE_LIST} icon={FileCheck2} />

        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 rounded-xl border border-warn-line bg-warn-soft p-6 sm:flex-row sm:p-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-warn/15 text-warn">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-warn-ink">Late fee risks under Companies Act, 2013</h3>
              <p className="mt-2 text-sm leading-6 text-warn-ink/90">
                Delay in filing Form AOC-4 or MGT-7 incurs compounding statutory late fees of ₹100 per day per form with no maximum ceiling. In
                addition, persistent default risks director disqualification for a period of up to 5 years under Section 164(2).
              </p>
            </div>
            <div className="sm:self-center">
              <Button variant="secondary" onClick={() => openContact(SERVICE)}>
                Check my filings
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <RelatedServices current="compliance" />

      <CTABanner
        eyebrow="Corporate secretarial desk"
        title="Maintain active standing & avoid ROC penalties"
        description="Consult with our company secretaries, review statutory registers, and schedule annual MCA filings."
        service={SERVICE}
        primaryLabel="Request compliance audit"
      />
    </SiteLayout>
  );
}
