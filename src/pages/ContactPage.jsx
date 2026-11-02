import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';
import { CONTACT, whatsappLink } from '../data/site';

const QUICK = [
  { label: 'Call', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, icon: Phone },
  { label: 'WhatsApp', value: 'Chat with support', href: whatsappLink(), icon: MessageCircle, external: true },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
];

export default function ContactPage() {
  return (
    <SiteLayout
      seo={{
        title: 'Contact Us | Consultation & Support | Simplifyl Compliance Solutions',
        description:
          'Get in touch with Simplifyl Compliance Solutions. Request a consultation for GST filing, company registrations, trademark security, and corporate compliance in India.',
        canonicalUrl: 'https://simplifyl.com/contact',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        eyebrow="Connect with us"
        title="Consult with our specialists"
        description="Have questions regarding GST filing, company incorporation, or trademark registration? Our advisory team is available to assist your business."
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {QUICK.map((q) => {
            const Icon = q.icon;
            return (
              <a
                key={q.label}
                href={q.href}
                {...(q.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card card-hover flex items-center gap-3 p-4"
              >
                <span className="icon-tile h-9 w-9">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-fg-subtle">{q.label}</span>
                  <span className="block truncate text-sm font-medium text-fg">{q.value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </PageHeader>

      <ContactSection showHeader={false} />
    </SiteLayout>
  );
}
