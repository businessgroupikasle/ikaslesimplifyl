import React, { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { RouterProvider, useRouter } from './lib/router';
import { ThemeProvider } from './lib/theme';
import { ContactProvider } from './lib/contact';
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

const ROUTES = {
  '/': HomePage,
  '/index.html': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/gst-filing': GstFilingPage,
  '/business-registration': BusinessRegistrationPage,
  '/trademark-registration': TrademarkRegistrationPage,
  '/compliance-support': ComplianceSupportPage,
  '/contact': ContactPage,
  '/faq': FaqPage,
  '/privacy-policy': PrivacyPolicyPage,
  '/terms-and-conditions': TermsPage,
  '/disclaimer': DisclaimerPage,
  '/cookie-policy': CookiePolicyPage,
};

function RouteSwitch() {
  const { path } = useRouter();
  // Normalize path by removing trailing slashes (except root) and query strings
  const normalizedPath = path.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const Page = ROUTES[normalizedPath] || NotFoundPage;

  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
      <Page />
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider>
          <ContactProvider>
            <RouteSwitch />
          </ContactProvider>
        </RouterProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
