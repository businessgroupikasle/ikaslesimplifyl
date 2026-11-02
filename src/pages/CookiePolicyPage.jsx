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
        <section>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse websites. They are widely used by online service providers to enable core functionality, remember user preferences, ensure session security, and gather aggregated performance analytics.
          </p>
          <p>
            This Cookie Policy explains how Simplifyl Compliance Solutions (<strong>https://simplifyl.com</strong>) uses cookies and similar storage technologies when you visit our website.
          </p>
        </section>

        <section>
          <h2>2. Categories of Cookies We Use</h2>
          <div className="mt-4 space-y-3">
            <div className="legal-box">
              <h3>A. Strictly Necessary & Security Cookies</h3>
              <p className="text-sm">
                These cookies are indispensable for the website to function securely and cannot be switched off in our systems. They enable essential features such as CSRF protection, secure form submission, and session integrity.
              </p>
            </div>

            <div className="legal-box">
              <h3>B. Functional & Preference Cookies</h3>
              <p className="text-sm">
                These allow our website to remember your selections (such as selected compliance inquiry options or modal dismissals) to provide a smoother, more personalized browsing experience.
              </p>
            </div>

            <div className="legal-box">
              <h3>C. Performance & Analytics Cookies</h3>
              <p className="text-sm">
                These cookies assist us in understanding how visitors navigate the site, which service sections are most frequented, and identifying potential layout errors. All analytics data is collected in aggregated, anonymized formats.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>3. Third-Party Analytics & Web Beacons</h2>
          <p>
            We may utilize privacy-conscious web analytics tools to gauge website traffic and engagement. These third-party services do not track personally identifiable financial or KYC data submitted through our forms.
          </p>
        </section>

        <section>
          <h2>4. How You Can Manage or Block Cookies</h2>
          <p>
            Most modern internet browsers allow you to manage your cookie preferences through their settings menu. You can configure your browser to reject all cookies, notify you when a cookie is placed, or delete existing cookies:
          </p>
          <ul className="text-sm">
            <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies</li>
            <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection</li>
            <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
            <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies</li>
          </ul>
          <p className="text-xs italic text-fg-subtle">
            Please note that blocking strictly necessary cookies may impact the proper rendering of certain interactive modals and form components on our site.
          </p>
        </section>

        <section>
          <h2>5. Contact Information</h2>
          <p>
            For questions regarding our use of cookies or tracking technologies, please contact <a href="mailto:business@ikasle.in">business@ikasle.in</a> or reach out via our phone helpline at +91 78451 32962.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
