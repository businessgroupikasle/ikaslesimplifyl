import React from 'react';
import { ArrowRight, Check, FileCheck2, FileText, Building2, ShieldCheck } from 'lucide-react';
import { Notice, Reveal, Section, SectionHeader, Button } from './ui';
import { Link } from '../lib/router';
import gstImg from '../assets/article_gst.jpg';
import bizImg from '../assets/article_business.jpg';
import tmImg from '../assets/article_trademark.jpg';
import compImg from '../assets/compliance_team.jpg';

const MAIN_SERVICES = [
  {
    id: 'gst-filing',
    step: '01',
    title: 'GST Filing',
    desc: 'Simplify your GST responsibilities with assistance for registration, return filing and related GST services.',
    icon: FileText,
    image: gstImg,
    href: '/gst-filing',
    cta: 'Explore GST services',
    items: ['GST Registration', 'GSTR-1 Filing', 'GSTR-3B Filing', 'GST Annual Return', 'GST Amendment', 'GST Cancellation', 'GST Notice Assistance'],
  },
  {
    id: 'business-registrations',
    step: '02',
    title: 'Business Registrations',
    desc: 'Get assistance in choosing and completing suitable business registration processes.',
    icon: Building2,
    image: bizImg,
    href: '/business-registration',
    cta: 'Explore registrations',
    items: [
      'Private Limited Company Registration',
      'LLP Registration',
      'OPC Registration',
      'Partnership Firm Registration',
      'Proprietorship Setup',
      'MSME / Udyam Registration',
      'Startup India Registration',
    ],
  },
  {
    id: 'trademark-services',
    step: '03',
    title: 'Trademark Services',
    desc: 'Protect your brand identity with trademark search, application and related assistance.',
    icon: ShieldCheck,
    image: tmImg,
    href: '/trademark-registration',
    cta: 'Explore trademark services',
    items: [
      'Trademark Search',
      'Trademark Application',
      'Trademark Registration',
      'Trademark Objection Assistance',
      'Trademark Renewal',
      'Brand Protection Guidance',
    ],
  },
  {
    id: 'compliance-support',
    step: '04',
    title: 'Compliance Support',
    desc: 'Get assistance in managing applicable business and statutory compliance requirements.',
    icon: FileCheck2,
    image: compImg,
    href: '/compliance-support',
    cta: 'Explore compliance',
    items: ['ROC Annual Filing', 'Director KYC', 'Company Annual Compliance', 'LLP Compliance', 'Business Documentation', 'Compliance Assistance'],
  },
];

export default function Services() {
  return (
    <Section id="services" tone="sunken">
      <SectionHeader
        eyebrow="Our practice areas"
        title="Our professional services"
        description="Explore business support services designed to simplify registrations, taxation and compliance."
        action={
          <Button variant="secondary" to="/services">
            View all services <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAIN_SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={i * 0.06}>
              <Link to={s.href} className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-sunken">
                  <img
                    src={s.image}
                    alt=""
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0" />
                  <span className="absolute left-3 top-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur">
                    SERVICE {s.step}
                  </span>
                  <span className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-[#2F5BEA] shadow-sm">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-h3 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">{s.desc}</p>

                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {s.items.slice(0, 5).map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg-muted">
                        <Check className="h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.5} />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    {s.items.length > 5 && <li className="pl-6 text-xs text-fg-subtle">+ {s.items.length - 5} more included</li>}
                  </ul>

                  <span className="mt-auto flex items-center justify-between pt-6 text-sm font-medium text-brand">
                    {s.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Notice title="Statutory notice:" className="mx-auto mt-10 max-w-3xl">
        Simplifyl is an independent business consultancy providing advisory and documentation assistance. We do not represent any
        government authority, Ministry, or Registrar, and we do not claim guaranteed official approval as approvals are subject to
        government discretion and statutory conformity.
      </Notice>
    </Section>
  );
}
