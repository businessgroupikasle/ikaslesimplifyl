import React from 'react';
import { ArrowRight, Building2, FileCheck2, FileText, ShieldCheck } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Card, CheckList, IconTile, Reveal, Section } from '../components/ui';
import { Link } from '../lib/router';
import { useContact } from '../lib/contact';

const SERVICES = [
  {
    id: 'gst-filing',
    title: 'GST Filing & Taxation Services',
    subtitle: 'Complete GST management, return preparation & notice advisory',
    icon: FileText,
    pageLink: '/gst-filing',
    desc: 'Simplify your Goods and Services Tax obligations with structured support for registrations, periodic return filings (GSTR-1, GSTR-3B), annual reconciliations (GSTR-9/9C), and departmental response drafting.',
    inclusions: [
      'New GST Registration & Field Amendments',
      'Monthly GSTR-1 & GSTR-3B Return Preparation',
      'Automated 2A / 2B Input Tax Credit Reconciliation',
      'Annual Return (GSTR-9) & Reconciliation (GSTR-9C)',
      'E-Way Bill Generation & Export LUT Filing',
      'Assistance for GST ASMT-10 & DRC-01 Department Notices',
    ],
  },
  {
    id: 'business-registration',
    title: 'Business Registration & Incorporation',
    subtitle: 'Structured company formation with statutory authorities',
    icon: Building2,
    pageLink: '/business-registration',
    desc: 'Incorporate your venture with complete legal standing under the Ministry of Corporate Affairs (MCA). We guide you through naming guidelines, digital signatures, charter drafting, and certificate of incorporation issuance.',
    inclusions: [
      'Private Limited Company Incorporation (SPICe+ Part A & B)',
      'Limited Liability Partnership (LLP) Registration',
      'One Person Company (OPC) Registration',
      'Partnership Firm Deed Drafting & Registration',
      'Sole Proprietorship & Udyam MSME Setup',
      'Startup India (DPIIT) Recognition Advisory',
    ],
  },
  {
    id: 'trademark-registration',
    title: 'Trademark Registration & Brand Security',
    subtitle: 'Protect your brand identity, logo, and commercial reputation',
    icon: ShieldCheck,
    pageLink: '/trademark-registration',
    desc: 'Secure exclusive nationwide rights over your brand name, logo, or tagline. Our trademark specialists conduct exhaustive preliminary availability searches, file Form TM-A with IP India, and handle examination objections.',
    inclusions: [
      'Comprehensive 45-Class Trademark Search Report',
      'Filing Form TM-A for Word Marks & Logo Device Marks',
      'Immediate ™ Symbol Usage Guidance & Tracking',
      'Drafting Formal Replies to Examination Objections',
      'Representation for Trademark Registry Show-Cause Hearings',
      'Trademark Renewal (Every 10 Years) & License Recording',
    ],
  },
  {
    id: 'compliance-support',
    title: 'Compliance Support & Annual ROC Filings',
    subtitle: 'Prevent statutory penalties and maintain active corporate status',
    icon: FileCheck2,
    pageLink: '/compliance-support',
    desc: 'Keep your company compliant with the Companies Act, 2013 and avoid director disqualification. We manage annual financial filings (AOC-4), annual returns (MGT-7/7A), Director KYC (DIR-3 KYC), and board resolutions.',
    inclusions: [
      'Annual ROC Financial Statement Filing (Form AOC-4)',
      'Annual Company Return Filing (Form MGT-7 / MGT-7A)',
      'Annual LLP Returns (Form 11 & Form 8)',
      'Director Identification KYC (DIR-3 KYC Web & e-Form)',
      'Drafting Board Meeting & Annual General Meeting (AGM) Minutes',
      'Filing Form INC-20A Commencement of Business',
    ],
  },
];

export default function ServicesPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'Our Services | GST Filing, Business Registrations & Trademarks | Simplifyl',
        description:
          "Explore Simplifyl's complete business consultancy services: GST registration & monthly return filing, company incorporation (Pvt Ltd & LLP), trademark protection, and annual ROC compliance in India.",
        canonicalUrl: 'https://simplifyl.com/services',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        eyebrow="Practice overview"
        title="Our corporate practice areas"
        description="Professional documentation and advisory solutions structured to simplify statutory registrations, ongoing tax filings, and legal compliance."
      >
        {/* Quick jump navigation to each practice */}
        <nav aria-label="Jump to practice" className="mt-8 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.id} href={`#${s.id}`} className="chip transition-colors hover:border-line-strong hover:text-fg">
                <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} /> {s.title.split(/ & | and /)[0]}
              </a>
            );
          })}
        </nav>
      </PageHeader>

      <Section>
        <div className="space-y-6">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.id}>
              <Card id={svc.id} className="scroll-mt-28 overflow-hidden">
                <div className="grid lg:grid-cols-12">
                  <div className="p-7 sm:p-10 lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <IconTile icon={svc.icon} size="lg" />
                      <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, '0')} / 04</span>
                    </div>
                    <p className="mt-6 text-sm font-medium text-brand">{svc.subtitle}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[28px]">{svc.title}</h2>
                    <p className="mt-4 text-[15px] leading-7 text-fg-muted">{svc.desc}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button to={svc.pageLink}>
                        Explore full service details <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" onClick={() => openContact(svc.title)}>
                        Enquire
                      </Button>
                    </div>
                  </div>
                  <div className="border-t border-line bg-sunken p-7 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
                    <p className="mb-5 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">Key inclusions &amp; in-scope activities</p>
                    <CheckList items={svc.inclusions} />
                    <Link to={svc.pageLink} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover">
                      Documents, process &amp; FAQs <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        eyebrow="Consultation & enquiries"
        title="Have questions regarding our services?"
        description="Consult with our advisory team, request custom service quotations, and get clarity on statutory steps."
      />
    </SiteLayout>
  );
}
