import React, { lazy, Suspense } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import HomePage from './pages/HomePage';

// Code-split separate pages for optimal performance & Core Web Vitals
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GstFilingPage = lazy(() => import('./pages/GstFilingPage'));
const BusinessRegistrationPage = lazy(() => import('./pages/BusinessRegistrationPage'));
const TrademarkRegistrationPage = lazy(() => import('./pages/TrademarkRegistrationPage'));
const ComplianceSupportPage = lazy(() => import('./pages/ComplianceSupportPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteSwitch() {
  const { path } = useRouter();

  // Normalize path by removing trailing slashes (except root) and query strings
  const cleanPath = path.split('?')[0].split('#')[0];
  const normalizedPath = cleanPath.replace(/\/+$/, '') || '/';

  switch (normalizedPath) {
    case '/':
    case '/index.html':
      return <HomePage />;
    case '/about':
      return (
        <Suspense fallback={null}>
          <AboutPage />
        </Suspense>
      );
    case '/services':
      return (
        <Suspense fallback={null}>
          <ServicesPage />
        </Suspense>
      );
    case '/gst-filing':
      return (
        <Suspense fallback={null}>
          <GstFilingPage />
        </Suspense>
      );
    case '/business-registration':
      return (
        <Suspense fallback={null}>
          <BusinessRegistrationPage />
        </Suspense>
      );
    case '/trademark-registration':
      return (
        <Suspense fallback={null}>
          <TrademarkRegistrationPage />
        </Suspense>
      );
    case '/compliance-support':
      return (
        <Suspense fallback={null}>
          <ComplianceSupportPage />
        </Suspense>
      );
    case '/contact':
      return (
        <Suspense fallback={null}>
          <ContactPage />
        </Suspense>
      );
    case '/faq':
      return (
        <Suspense fallback={null}>
          <FaqPage />
        </Suspense>
      );
    case '/privacy-policy':
      return (
        <Suspense fallback={null}>
          <PrivacyPolicyPage />
        </Suspense>
      );
    case '/terms-and-conditions':
      return (
        <Suspense fallback={null}>
          <TermsPage />
        </Suspense>
      );
    case '/disclaimer':
      return (
        <Suspense fallback={null}>
          <DisclaimerPage />
        </Suspense>
      );
    case '/cookie-policy':
      return (
        <Suspense fallback={null}>
          <CookiePolicyPage />
        </Suspense>
      );
    default:
      return (
        <Suspense fallback={null}>
          <NotFoundPage />
        </Suspense>
      );
  }
}

export default function App() {
  return (
    <RouterProvider>
      <RouteSwitch />
    </RouterProvider>
  );
}
