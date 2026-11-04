import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, FileText, Building2, ShieldCheck, FileCheck2, Phone, Moon, Sun } from 'lucide-react';
import Logo from './Logo';
import { useRouter, Link } from '../lib/router';
import { useTheme } from '../lib/theme';

function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`p-2 rounded-lg text-slate-700 hover:text-[#10364E] hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors focus:outline-none flex items-center justify-center ${className}`}
    >
      {dark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}

export default function Navbar({ onOpenContact }) {
  const { path } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHome = path === '/' || path === '/index.html';

  const isLinkActive = (href) => {
    if (href === '/') return isHome;
    if (href === '/services') {
      return (
        path.startsWith('/services') ||
        path === '/gst-filing' ||
        path === '/business-registration' ||
        path === '/trademark-registration' ||
        path === '/compliance-support'
      );
    }
    return path === href;
  };

  const serviceItems = [
    {
      name: 'GST Filing',
      href: '/gst-filing',
      desc: 'Registration, returns (GSTR-1/3B/9), amendments & notice advisory.',
      icon: FileText
    },
    {
      name: 'Business Registrations',
      href: '/business-registration',
      desc: 'Private Limited, LLP, OPC, Partnership, Proprietorship & MSME.',
      icon: Building2
    },
    {
      name: 'Trademark Services',
      href: '/trademark-registration',
      desc: 'Search, trademark application, objection handling & renewals.',
      icon: ShieldCheck
    },
    {
      name: 'Compliance Support',
      href: '/compliance-support',
      desc: 'Annual ROC filings, Director KYC, minutes & secretarial audits.',
      icon: FileCheck2
    }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_2px_12px_rgba(16,54,78,0.06)] border-b border-slate-200/80 dark:border-slate-800 py-3'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main navigation">
            <Link
              to="/"
              className={`relative text-sm font-semibold transition-colors duration-150 py-1 ${
                isLinkActive('/')
                  ? 'text-[#10364E] dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-[#10364E] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span>Home</span>
              {isLinkActive('/') && (
                <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-[#1C6FA5]" />
              )}
            </Link>

            <Link
              to="/about"
              className={`relative text-sm font-semibold transition-colors duration-150 py-1 ${
                isLinkActive('/about')
                  ? 'text-[#10364E] dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-[#10364E] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span>About Us</span>
              {isLinkActive('/about') && (
                <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-[#1C6FA5]" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                to="/services"
                onClick={() => setServicesDropdownOpen(false)}
                className={`relative inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 py-1 ${
                  isLinkActive('/services')
                    ? 'text-[#1C6FA5] dark:text-blue-400 font-bold'
                    : 'text-slate-600 hover:text-[#10364E] dark:text-slate-300 dark:hover:text-white'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#1C6FA5]' : 'text-slate-400'}`} />
                {isLinkActive('/services') && (
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-[#1C6FA5]" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Our Core Practice Areas
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-semibold text-[#1C6FA5] dark:text-blue-400 hover:underline"
                    >
                      All Services →
                    </Link>
                  </div>
                  <div className="mt-1 space-y-1">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F5F7FA] dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#F4F8FB] dark:bg-slate-800 border border-[#E3EFF8] dark:border-slate-700 flex items-center justify-center text-[#1C6FA5] dark:text-blue-400 shrink-0 mt-0.5 group-hover:bg-[#1C6FA5] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#10364E] dark:text-white group-hover:text-[#1C6FA5] dark:group-hover:text-blue-400 transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/faq"
              className={`relative text-sm font-semibold transition-colors duration-150 py-1 ${
                isLinkActive('/faq')
                  ? 'text-[#10364E] dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-[#10364E] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span>FAQ</span>
              {isLinkActive('/faq') && (
                <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-[#1C6FA5]" />
              )}
            </Link>

            <Link
              to="/contact"
              className={`relative text-sm font-semibold transition-colors duration-150 py-1 ${
                isLinkActive('/contact')
                  ? 'text-[#10364E] dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-[#10364E] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span>Contact</span>
              {isLinkActive('/contact') && (
                <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-[#1C6FA5]" />
              )}
            </Link>
          </nav>

          {/* Right Header Actions: Phone Number -> Free Consultation Button -> Light/Dark Mode Toggle (Far Right) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {/* Phone Number */}
            <a
              href="tel:+917845132962"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1C6FA5] dark:text-slate-300 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>+91 78451 32962</span>
            </a>

            {/* Free Consultation CTA Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#1C6FA5] hover:bg-[#175B87] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
            >
              <span>Free consultation</span>
            </button>

            {/* Light/Dark Mode Toggle (Positioned to the far right of the header, after the Free Consultation button) */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#10364E] hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-5 px-6 z-50">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold py-1.5 ${
                isLinkActive('/') ? 'text-[#1C6FA5]' : 'text-[#10364E] dark:text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-1.5 ${
                isLinkActive('/about') ? 'text-[#1C6FA5]' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="py-1">
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-[#10364E] dark:text-white hover:text-[#1C6FA5] py-1 mb-1"
              >
                Services
              </Link>
              <div className="pl-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#1C6FA5] py-1"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-[#1C6FA5] py-1"
                >
                  View All Services →
                </Link>
              </div>
            </div>

            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-1.5 ${
                isLinkActive('/faq') ? 'text-[#1C6FA5]' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-1.5 ${
                isLinkActive('/contact') ? 'text-[#1C6FA5]' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <a
                href="tel:+917845132962"
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#1C6FA5] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1C6FA5]" />
                <span>+91 78451 32962</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#175B87] transition-colors shadow-sm"
              >
                <span>Free consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
