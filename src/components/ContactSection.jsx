import React from 'react';
import { ArrowUpRight, Clock, Lock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Card, Section, SectionHeader } from './ui';
import EnquiryForm from './EnquiryForm';
import { useContact } from '../lib/contact';
import { CONTACT, whatsappLink } from '../data/site';
import deskImg from '../assets/desk_workspace.jpg';

const CHANNELS = [
  { label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, icon: Phone },
  { label: 'WhatsApp Business', value: 'Chat with support', href: whatsappLink(), icon: MessageCircle, external: true },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
];

export default function ContactSection({ showHeader = true, tone = 'default' }) {
  const { preselectedService } = useContact();

  return (
    <Section id="contact" tone={tone}>
      {showHeader && (
        <SectionHeader
          eyebrow="Reach our team"
          title="Consult with our specialists"
          description="Share your requirements below. Our advisory team will review your details and respond with a clear roadmap."
        />
      )}

      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Info column */}
        <div className="space-y-4 lg:col-span-5">
          <Card className="overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={deskImg}
                alt="Simplifyl advisory workspace and client helpdesk"
                width="600"
                height="340"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-semibold">Coimbatore Advisory Desk</p>
                <p className="text-xs text-white/75">Pan-India regulatory consultation</p>
              </div>
            </div>

            <ul className="divide-y divide-line">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sunken"
                    >
                      <span className="icon-tile h-9 w-9">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs text-fg-subtle">{c.label}</span>
                        <span className="block text-sm font-medium text-fg">{c.value}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </a>
                  </li>
                );
              })}
              <li className="flex items-start gap-4 px-5 py-4">
                <span className="icon-tile h-9 w-9">
                  <MapPin className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-xs text-fg-subtle">Office address</span>
                  <span className="block text-sm leading-6 text-fg">{CONTACT.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-4 px-5 py-4">
                <span className="icon-tile h-9 w-9">
                  <Clock className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-xs text-fg-subtle">Business hours</span>
                  {CONTACT.hours.map((h) => (
                    <span key={h} className="block text-sm leading-6 text-fg">
                      {h}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </Card>

          <div className="flex items-start gap-3 rounded-lg border border-line bg-sunken p-4 text-sm leading-6 text-fg-muted">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p>
              All client enquiries are handled under strict confidentiality agreements. Your commercial information is never shared with
              third parties.
            </p>
          </div>
        </div>

        {/* Form column */}
        <Card className="p-6 shadow-sm sm:p-8 lg:col-span-7">
          <h3 className="text-xl font-semibold tracking-tight">Submit an enquiry</h3>
          <p className="mb-7 mt-1.5 text-sm text-fg-muted">Fill in the details below to receive a response from our advisory team.</p>
          <EnquiryForm preselectedService={preselectedService} />
        </Card>
      </div>
    </Section>
  );
}
