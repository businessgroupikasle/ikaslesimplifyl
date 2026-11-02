import React from 'react';
import { FileCheck2, Headphones, ShieldCheck, UserCheck } from 'lucide-react';
import { Container, Reveal } from './ui';

const HIGHLIGHTS = [
  { title: 'Professional Assistance', desc: 'Guidance from experienced tax and corporate compliance professionals.', icon: UserCheck },
  { title: 'Transparent Process', desc: 'Clear communication with straightforward timelines and fee structures.', icon: FileCheck2 },
  { title: 'Secure Document Handling', desc: 'Confidential and protected handling of all business documents.', icon: ShieldCheck },
  { title: 'Dedicated Customer Support', desc: 'Prompt assistance for your queries throughout the filing lifecycle.', icon: Headphones },
];

export default function TrustSection() {
  return (
    <section aria-label="Why clients trust us" className="border-b border-line bg-sunken">
      <Container>
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05} className="flex gap-4 py-7 sm:px-2 lg:px-7 lg:first:pl-0 lg:last:pr-0">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.75} />
                <div>
                  <h3 className="text-[15px] font-semibold text-fg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-fg-muted">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
