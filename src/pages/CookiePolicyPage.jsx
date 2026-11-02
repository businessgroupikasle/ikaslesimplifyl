import React from 'react';
import LegalLayout from '../components/LegalLayout';
import SEOHead from '../components/SEOHead';

export default function CookiePolicyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://simplifyl.com/cookie-policy#webpage',
    'url': 'https://simplifyl.com/cookie-policy',
    'name': 'Cookie Policy | Simplifyl Compliance Solutions',
    'description': 'Learn about how Simplifyl uses cookies and tracking technologies to enhance user experience, analyze website traffic, and maintain secure sessions.',
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
          'name': 'Cookie Policy',
          'item': 'https://simplifyl.com/cookie-policy'
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Cookie Policy | Simplifyl Compliance Solutions"
        description="Learn about how Simplifyl uses cookies and tracking technologies to enhance user experience, analyze website traffic, and maintain secure sessions."
        canonicalUrl="https://simplifyl.com/cookie-policy"
        noIndex={false}
        schema={schema}
      />

      <LegalLayout
        title="Cookie Policy"
        subtitle="Information on how Simplifyl Compliance Solutions employs cookies and local storage technologies."
        lastUpdated="April 15, 2025"
        currentPath="/cookie-policy"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse websites. They are widely used by online service providers to enable core functionality, remember user preferences, ensure session security, and gather aggregated performance analytics.
          </p>
          <p>
            This Cookie Policy explains how Simplifyl Compliance Solutions (<strong>https://simplifyl.com</strong>) uses cookies and similar storage technologies when you visit our website.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">2. Categories of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-navy-900 text-sm">A. Strictly Necessary & Security Cookies</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                These cookies are indispensable for the website to function securely and cannot be switched off in our systems. They enable essential features such as CSRF protection, secure form submission, and session integrity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-navy-900 text-sm">B. Functional & Preference Cookies</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                These allow our website to remember your selections (such as selected compliance inquiry options or modal dismissals) to provide a smoother, more personalized browsing experience.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-navy-900 text-sm">C. Performance & Analytics Cookies</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                These cookies assist us in understanding how visitors navigate the site, which service sections are most frequented, and identifying potential layout errors. All analytics data is collected in aggregated, anonymized formats.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">3. Third-Party Analytics & Web Beacons</h2>
          <p>
            We may utilize privacy-conscious web analytics tools to gauge website traffic and engagement. These third-party services do not track personally identifiable financial or KYC data submitted through our forms.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">4. How You Can Manage or Block Cookies</h2>
          <p>
            Most modern internet browsers allow you to manage your cookie preferences through their settings menu. You can configure your browser to reject all cookies, notify you when a cookie is placed, or delete existing cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies</li>
            <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection</li>
            <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
            <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies</li>
          </ul>
          <p className="text-xs text-slate-500 italic mt-2">
            Please note that blocking strictly necessary cookies may impact the proper rendering of certain interactive modals and form components on our site.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-900">5. Contact Information</h2>
          <p>
            For questions regarding our use of cookies or tracking technologies, please contact <a href="mailto:business@ikasle.in" className="text-blue-700 underline">business@ikasle.in</a> or reach out via our phone helpline at +91 78451 32962.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
