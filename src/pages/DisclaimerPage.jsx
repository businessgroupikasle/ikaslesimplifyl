import React from 'react';
import LegalLayout from '../components/LegalLayout';
import SEOHead from '../components/SEOHead';

export default function DisclaimerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://simplifyl.com/disclaimer#webpage',
    'url': 'https://simplifyl.com/disclaimer',
    'name': 'Disclaimer & Regulatory Disclosure | Simplifyl Compliance Solutions',
    'description': 'Simplifyl regulatory and professional disclaimer regarding chartered accountancy, company secretarial advisory, and government statutory filings.',
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://simplifyl.com/#website',
      'name': 'Simplifyl Compliance Solutions',
      'url': 'https://simplifyl.com'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://simplifyl.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Disclaimer',
          'item': 'https://simplifyl.com/disclaimer'
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Disclaimer & Regulatory Disclosure | Simplifyl Compliance Solutions"
        description="Simplifyl regulatory and professional disclaimer regarding chartered accountancy, company secretarial advisory, and government statutory filings."
        canonicalUrl="https://simplifyl.com/disclaimer"
        noIndex={false}
        schema={schema}
      />

      <LegalLayout
        title="Disclaimer & Regulatory Disclosure"
        subtitle="Important regulatory and legal disclosures regarding our compliance advisory services, guides, and statutory submissions."
        lastUpdated="April 15, 2025"
        currentPath="/disclaimer"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900">1. Nature of Website Content</h2>
          <p>
            The information, articles, calculators, checklists, and guides published on <strong>https://simplifyl.com</strong> are provided solely for general informational and educational purposes. While we strive to maintain accurate, up-to-date content reflecting the latest notifications issued by the Ministry of Corporate Affairs (MCA), the Central Board of Indirect Taxes and Customs (CBIC), and the Controller General of Patents, Designs and Trademarks, statutory rules and rates are subject to frequent legislative amendments.
          </p>
          <p>
            Nothing on this website constitutes direct formal legal advice, tax opinion, or an audit certification until a formal engagement letter or service mandate has been executed between Simplifyl and the client.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">2. Professional Independence & Regulatory Compliance</h2>
          <p>
            Simplifyl Compliance Solutions is an independent technology-driven corporate compliance facilitation platform. All professional chartered accountancy, company secretarial, statutory audit, and legal advisory services are rendered in strict compliance with the regulations of the Institute of Chartered Accountants of India (ICAI), the Institute of Company Secretaries of India (ICSI), and the Bar Council of India by duly qualified and empaneled practitioners.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">3. Government Decision-Making & Discretion</h2>
          <p>
            Simplifyl facilitates document preparation, statutory verification, and portal submission. Clients explicitly acknowledge that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Approval or rejection of company names and SPICe+ incorporation forms rests entirely with the Registrar of Companies (ROC) and Central Registration Centre (CRC).</li>
            <li>Issuance of GST registrations, GST amendments, and Input Tax Credit (ITC) adjudications is under the exclusive purview of jurisdictional GST tax officers.</li>
            <li>Acceptance, publication in the journal, and registration of trademarks are subject to the evaluation and discretion of Trademark Examiners and Hearing Officers under the Trade Marks Act, 1999.</li>
          </ul>
          <p className="text-sm text-slate-600">
            Simplifyl cannot and does not guarantee the approval of any statutory application where the outcome is subject to sovereign regulatory discretion.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">4. Third-Party Websites & Hyperlinks</h2>
          <p>
            Our website may contain hyperlinks to official governmental portals (such as mca.gov.in, gst.gov.in, ipindiaonline.gov.in) and other third-party websites. Simplifyl has no control over the content, uptime, availability, or privacy practices of external websites and assumes no liability for their information or operation.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">5. Limitation of Professional Liability</h2>
          <p>
            Under no circumstances shall Simplifyl Compliance Solutions or its representatives be liable for any direct, indirect, incidental, or consequential losses resulting from reliance on general website content, delay in government server responses, portal downtimes, or late filings caused by incomplete client data.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">6. Clarifications & Professional Inquiries</h2>
          <p>
            If you have questions regarding this Disclaimer, please contact our legal desk at <a href="mailto:business@ikasle.in" className="text-blue-700 underline">business@ikasle.in</a> or telephone +91 78451 32962.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
