import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui';
import { Link, useRouter } from '../lib/router';
import { useTheme } from '../lib/theme';
import { useContact } from '../lib/contact';
import { CONTACT, NAV_LINKS, SERVICES } from '../data/site';
import { cn } from '../lib/utils';

function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className={cn('btn btn-ghost h-9 w-9 p-0', className)}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

function isActive(path, href) {
  if (href === '/') return path === '/' || path === '/index.html';
  if (href === '/services') return path === '/services' || SERVICES.some((s) => s.href === path);
  return path === href;
}

function ServicesMenu({ path }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  useEffect(() => setOpen(false), [path]);

  const enter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors',
          isActive(path, '/services') ? 'text-fg' : 'text-fg-muted hover:bg-sunken hover:text-fg',
        )}
      >
        Services
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
              <div className="grid grid-cols-2 gap-1 p-2">
                {SERVICES.map((item) => {
                  const Icon = item.icon;
                  const active = path === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn('group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-sunken', active && 'bg-sunken')}
                    >
                      <span className="icon-tile h-9 w-9 transition-colors group-hover:border-brand group-hover:bg-brand-solid group-hover:text-white">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-fg">{item.name}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-fg-subtle">{item.desc}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center justify-between border-t border-line bg-sunken px-5 py-3">
                <span className="text-xs text-fg-subtle">Not sure where to start?</span>
                <Link to="/services" className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:text-brand-hover">
                  View all services <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose, path, onConsult }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <nav className="container-page flex flex-col py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.href} className="border-b border-line py-3">
                  <p className="px-1 pb-2 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">Services</p>
                  <div className="grid gap-1">
                    {link.children.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.href}
                          to={s.href}
                          className={cn('flex items-center gap-3 rounded-lg p-2.5 hover:bg-sunken', path === s.href && 'bg-sunken')}
                        >
                          <span className="icon-tile h-8 w-8">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          <span className="text-[15px] font-medium text-fg">{s.name}</span>
                        </Link>
                      );
                    })}
                    <Link to="/services" className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-brand">
                      View all services <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center justify-between border-b border-line px-1 py-4 text-[17px] font-medium',
                    isActive(path, link.href) ? 'text-fg' : 'text-fg-muted',
                  )}
                >
                  {link.name}
                  <ArrowRight className="h-4 w-4 text-fg-subtle" />
                </Link>
              ),
            )}
            <div className="mt-6 grid gap-3">
              <Button size="lg" onClick={onConsult}>
                Get free consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" href={CONTACT.phoneHref}>
                <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { path } = useRouter();
  const { openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [path]);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-brand-solid px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'sticky top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,border-color,box-shadow] duration-200',
          scrolled || mobileOpen
            ? 'border-line bg-canvas/85 shadow-xs backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-canvas',
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <ServicesMenu key={link.href} path={path} />
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(path, link.href) ? 'page' : undefined}
                  className={cn(
                    'relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors',
                    isActive(path, link.href) ? 'text-fg' : 'text-fg-muted hover:bg-sunken hover:text-fg',
                  )}
                >
                  {link.name}
                  {isActive(path, link.href) && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-brand" />}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href={CONTACT.phoneHref}
              className="hidden h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-fg-muted transition-colors hover:bg-sunken hover:text-fg xl:inline-flex"
            >
              <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
            </a>
            <Button size="sm" className="ml-1 hidden h-9 px-3.5 sm:inline-flex" onClick={() => openContact()}>
              Free consultation
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="btn btn-ghost h-9 w-9 p-0 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        path={path}
        onConsult={() => {
          setMobileOpen(false);
          openContact();
        }}
      />
    </>
  );
}
