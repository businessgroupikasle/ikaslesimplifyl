import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs, Container, Eyebrow } from './ui';
import { cn } from '../lib/utils';

/** Hero used by every inner page — replaces the five slightly different navy banners. */
export default function PageHeader({ breadcrumbs, eyebrow, title, description, actions, aside, children, className }) {
  return (
    <header className={cn('relative overflow-hidden border-b border-line', className)}>
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8 sm:mb-10" />}
        <div className={cn('grid items-center gap-12', aside && 'lg:grid-cols-12')}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(aside ? 'lg:col-span-7' : 'max-w-3xl')}
          >
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className="text-h1 font-semibold">{title}</h1>
            {description && <p className="mt-5 max-w-2xl text-[17px] leading-7 text-fg-muted sm:text-lg sm:leading-8">{description}</p>}
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
            {children}
          </motion.div>
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              {aside}
            </motion.div>
          )}
        </div>
      </Container>
    </header>
  );
}
