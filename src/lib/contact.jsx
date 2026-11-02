import React, { createContext, lazy, Suspense, useCallback, useContext, useState } from 'react';
import { normalizeService } from '../data/site';

const ContactModal = lazy(() => import('../components/ContactModal'));

const ContactContext = createContext({ openContact: () => {}, preselectedService: '' });

/**
 * One consultation modal for the whole site. Any component can call
 * `openContact('GST Filing')` instead of every page managing its own modal state.
 */
export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');

  const openContact = useCallback((context) => {
    setService(normalizeService(typeof context === 'string' ? context : ''));
    setOpen(true);
  }, []);

  return (
    <ContactContext.Provider value={{ openContact, preselectedService: service }}>
      {children}
      <Suspense fallback={null}>
        {open || service ? (
          <ContactModal isOpen={open} onClose={() => setOpen(false)} preselectedService={service} />
        ) : null}
      </Suspense>
    </ContactContext.Provider>
  );
}

export function useContact() {
  return useContext(ContactContext);
}
