import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Check, ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Link } from '../../lib/router';
import { cn } from '../../lib/utils';

/* ------------------------------------------------------------------ Button */

// Literal class names so Tailwind's content scanner keeps them in the build.
const BTN_SIZES = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };
const BTN_VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  inverse: 'btn-inverse',
  'inverse-outline': 'btn-inverse-outline',
};

export function Button({ variant = 'primary', size = 'md', to, href, className, children, ...props }) {
  const classes = cn('btn', BTN_SIZES[size], BTN_VARIANTS[variant], className);
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ Layout */

export function Container({ className, children, ...props }) {
  return (
    <div className={cn('container-page', className)} {...props}>
      {children}
    </div>
  );
}

const TONES = {
  default: 'bg-canvas',
  sunken: 'bg-sunken border-y border-line',
};

export function Section({ tone = 'default', className, containerClassName, children, ...props }) {
  return (
    <section className={cn('section', TONES[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ className, children }) {
  return <span className={cn('eyebrow', className)}>{children}</span>;
}

export function SectionHeader({ eyebrow, title, description, align = 'left', action, className, as: Heading = 'h2' }) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        centered ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn(!centered && 'max-w-2xl')}>
        {eyebrow && <Eyebrow className={cn('mb-4', centered && 'justify-center')}>{eyebrow}</Eyebrow>}
        <Heading className="text-h2 font-semibold">{title}</Heading>
        {description && <p className="mt-4 text-base leading-7 text-fg-muted sm:text-[17px]">{description}</p>}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Surfaces */

export function Card({ as: Tag = 'div', interactive = false, className, children, ...props }) {
  return (
    <Tag className={cn('card', interactive && 'card-hover', className)} {...props}>
      {children}
    </Tag>
  );
}

export function IconTile({ icon: Icon, size = 'md', className }) {
  const dims = { sm: 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4', md: 'h-10 w-10 [&>svg]:h-[18px] [&>svg]:w-[18px]', lg: 'h-12 w-12 [&>svg]:h-5 [&>svg]:w-5' };
  return (
    <span className={cn('icon-tile', dims[size], className)} aria-hidden="true">
      <Icon strokeWidth={1.75} />
    </span>
  );
}

export function Chip({ tone = 'neutral', className, children }) {
  return <span className={cn('chip', tone === 'brand' && 'chip-brand', className)}>{children}</span>;
}

/* ------------------------------------------------------------------ Lists & notices */

export function CheckList({ items, className, itemClassName, columns = 1 }) {
  return (
    <ul className={cn('grid gap-x-6 gap-y-3', columns === 2 && 'sm:grid-cols-2', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-start gap-3 text-sm leading-6 text-fg-muted', itemClassName)}>
          <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items, className }) {
  return (
    <ol className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-fg-muted">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-line bg-sunken font-mono text-[10px] font-medium text-fg">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Notice({ tone = 'info', title, children, className }) {
  const warn = tone === 'warn';
  const Icon = warn ? AlertTriangle : Info;
  return (
    <div
      role="note"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 text-sm leading-6',
        warn ? 'border-warn-line bg-warn-soft text-warn-ink' : 'border-line bg-sunken text-fg-muted',
        className,
      )}
    >
      <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', warn ? 'text-warn' : 'text-brand')} />
      <p>
        {title && <strong className={cn('font-semibold', warn ? 'text-warn-ink' : 'text-fg')}>{title} </strong>}
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ Motion */

export function Reveal({ delay = 0, className, children, as = 'div', ...props }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ Navigation */

export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-fg-subtle">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link to={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={cn(last && 'font-medium text-fg-muted')}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-fg-subtle/70" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ Accordion */

export function AccordionItem({ title, children, open, onToggle, index }) {
  const id = useId();
  return (
    <div className={cn('rounded-lg border bg-surface transition-colors', open ? 'border-line-strong shadow-sm' : 'border-line')}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className="flex w-full items-start gap-4 rounded-lg px-5 py-4 text-left transition-colors hover:bg-sunken/60"
        >
          {index !== undefined && (
            <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-fg-subtle">{String(index + 1).padStart(2, '0')}</span>
          )}
          <span className="flex-1 text-[15px] font-medium leading-6 text-fg">{title}</span>
          <ChevronDown
            className={cn('mt-1 h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200', open && 'rotate-180 text-fg')}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={cn('px-5 pb-5 text-sm leading-7 text-fg-muted', index !== undefined && 'sm:pl-[3.75rem]')}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, defaultOpen = 0, numbered = true, className }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return (
    <div className={cn('space-y-2.5', className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          title={item.q}
          index={numbered ? i : undefined}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        >
          {item.a}
        </AccordionItem>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ Forms */

export function Field({ label, optional, error, htmlFor, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal text-fg-subtle">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
