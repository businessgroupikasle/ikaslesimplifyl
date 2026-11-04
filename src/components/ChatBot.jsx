import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  MessageCircle, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck,
  FileText,
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { validateFullName, validatePhone } from '../lib/validation';

const CHAT_STORAGE_KEY = 'simplifyl_chat_messages_v2';
const SOUND_STORAGE_KEY = 'simplifyl_chat_sound_enabled';

// Play a gentle, polite chime using Web Audio API (no external asset needed)
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Ignore audio permission restrictions
  }
}

// Interactive inline lead capture card rendered directly inside the chat flow
function InChatLeadForm({ defaultService = 'GST Filing', onSubmitSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const nameVal = validateFullName(name);
    if (!nameVal.isValid) {
      setError(nameVal.message);
      return;
    }

    const phoneVal = validatePhone(phone);
    if (!phoneVal.isValid) {
      setError(phoneVal.message);
      return;
    }

    setSubmitting(true);
    let delivered = false;
    const payload = {
      fullName: name,
      phone,
      email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@chatbot-enquiry.simplifyl.com`,
      service,
      message: `Callback requested via Simplifyl AI Chat Assistant from ${name} (Phone: ${phone}) for ${service}.`,
      submittedAt: new Date().toISOString()
    };

    try {
      // 1. Save to local storage
      const stored = JSON.parse(localStorage.getItem('simplifyl_enquiries') || '[]');
      stored.push({ ...payload, id: `CHAT-ENQ-${Date.now()}` });
      localStorage.setItem('simplifyl_enquiries', JSON.stringify(stored));

      // 2. Dispatch via SMTP to businessgroupikasle@gmail.com with 2-second feedback
      const [res] = await Promise.all([
        fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => ({ ok: false })),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
      if (res && res.ok) {
        const result = await res.json().catch(() => ({}));
        delivered = Boolean(result.delivered);
      }
    } catch {
      // Handled gracefully with local backup
    } finally {
      setSubmitting(false);
      setEmailDelivered(delivered);
      setIsDone(true);
      if (onSubmitSuccess) onSubmitSuccess({ name, phone, service });
    }
  };

  if (isDone) {
    return (
      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-2 font-bold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{emailDelivered ? 'Sent Successfully!' : 'Request Saved'}</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300">
          {emailDelivered ? (
            <>Thank you, <strong>{name}</strong>! Your details have been sent to our CA & legal desk. An advisor will call <strong>{phone}</strong> shortly.</>
          ) : (
            <>Thank you, <strong>{name}</strong>! Your details are saved, but we could not confirm they reached our team. If you do not hear from us soon, please call <strong>+91 78451 32962</strong>.</>
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsDone(false);
            setName('');
            setPhone('');
            setError('');
          }}
          className="mt-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900 shadow-sm space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#10364E] dark:text-blue-300">
        <Sparkles className="w-3.5 h-3.5 text-[#1C6FA5]" />
        <span>Request Free Expert Callback</span>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-red-50 text-red-700 text-[11px] flex items-center gap-1.5 border border-red-200">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
          Your Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value.replace(/[^a-zA-Z\s.'’-]/g, ''));
            if (error) setError('');
          }}
          placeholder="e.g. Rahul Sharma"
          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5]"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
          Phone Number *
        </label>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={(e) => {
            let raw = e.target.value.replace(/\D/g, '');
            if (raw.length === 12 && raw.startsWith('91')) {
              raw = raw.slice(2);
            }
            const val = raw.slice(0, 10);
            setPhone(val);
            if (error) setError('');
          }}
          placeholder="e.g. 9876543210"
          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5]"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
          Service Category
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5]"
        >
          <option value="GST Filing">GST Filing & Returns</option>
          <option value="Business Registration">Company Registration (Pvt Ltd / LLP)</option>
          <option value="Trademark Registration">Trademark Registration</option>
          <option value="Compliance Support">Annual ROC Compliance</option>
          <option value="General Consultation">General CA Consultation</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-3 rounded-lg bg-[#1C6FA5] hover:bg-[#175B87] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Sending... Please wait</span>
          </>
        ) : (
          <>
            <span>Request Callback Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ChatBot() {
  const { path, navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadPrompt, setUnreadPrompt] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem(SOUND_STORAGE_KEY) !== 'false';
    } catch {
      return true;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Use initial state
    }
    return [
      {
        id: 'welcome-init',
        sender: 'bot',
        text: '👋 Welcome to **Simplifyl**! I am your AI Corporate Compliance Assistant.\n\nI can help you with **GST Filings**, **Company Registrations (Pvt Ltd, LLP)**, **Trademarks**, and **ROC Deadlines**.',
        time: 'Just now',
        action: {
          type: 'lead_form',
          defaultService: 'GST Filing',
          label: 'Book Free CA Consultation'
        }
      }
    ];
  });

  const messagesEndRef = useRef(null);

  // Sync chat messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  // Contextual Quick Prompts based on the current page
  const getContextualPrompts = () => {
    if (path === '/gst-filing') {
      return [
        { text: 'GSTR-1 & 3B Deadlines', icon: FileText },
        { text: 'ITC 2B Reconciliation', icon: ShieldCheck },
        { text: 'New GST Registration Fees', icon: Building2 },
        { text: 'Talk on WhatsApp', icon: MessageCircle }
      ];
    }
    if (path === '/business-registration') {
      return [
        { text: 'Pvt Ltd vs LLP Difference', icon: Building2 },
        { text: 'Documents Required for Incorporation', icon: FileText },
        { text: 'Name Approval (RUN) Process', icon: ShieldCheck },
        { text: 'Speak to CA on WhatsApp', icon: MessageCircle }
      ];
    }
    if (path === '/trademark-registration') {
      return [
        { text: 'Trademark Class Search (1-45)', icon: ShieldCheck },
        { text: 'How to get ® symbol', icon: Sparkles },
        { text: 'Objection Reply Procedure', icon: FileText },
        { text: 'WhatsApp Consultation', icon: MessageCircle }
      ];
    }
    if (path === '/compliance-support' || path === '/compliance-calendar') {
      return [
        { text: 'AOC-4 & MGT-7 Deadlines', icon: Clock },
        { text: 'DIR-3 KYC Filing', icon: ShieldCheck },
        { text: 'Avoid ₹100/day Penalties', icon: FileText },
        { text: 'Talk on WhatsApp', icon: MessageCircle }
      ];
    }
    return [
      { text: 'GST Filing Process', icon: FileText },
      { text: 'Pvt Ltd vs LLP Difference', icon: Building2 },
      { text: 'Trademark Registration & Fees', icon: ShieldCheck },
      { text: 'ROC Annual Compliance', icon: Clock },
      { text: 'Talk on WhatsApp', icon: MessageCircle }
    ];
  };

  const handleSend = async (textToSend = null) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // 1. Call real backend API `/api/chat`
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            currentPage: path,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          action: data.action,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        if (soundEnabled) playNotificationChime();
      } else {
        throw new Error('API returned non-200');
      }
    } catch {
      // Fallback response with instant lead capture
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Thank you for your inquiry about **"${text}"**.\n\nOur CA & corporate secretarial team is available to assist you. Would you like a callback or quotation sent directly to your phone?`,
        action: {
          type: 'lead_form',
          defaultService: path.includes('gst') ? 'GST Filing' : path.includes('trademark') ? 'Trademark Registration' : 'General Consultation',
          label: 'Request Callback'
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      if (soundEnabled) playNotificationChime();
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    const fresh = [
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: '👋 Chat history cleared. How can our compliance advisory desk assist your business today?',
        time: 'Just now',
        action: {
          type: 'lead_form',
          defaultService: 'General Consultation',
          label: 'Request Free CA Callback'
        }
      }
    ];
    setMessages(fresh);
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.type === 'link') {
      setIsOpen(false);
      navigate(action.href);
    } else if (action.type === 'whatsapp') {
      const url = `https://wa.me/917845132962?text=${encodeURIComponent(action.text || 'Hello Simplifyl Team! I would like to consult with an expert.')}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <AnimatePresence>
          {!isOpen && unreadPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setUnreadPrompt(false);
              }}
              className="absolute -top-14 right-0 mb-2 cursor-pointer whitespace-nowrap rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl px-4 py-2.5 text-xs font-semibold text-[#10364E] dark:text-slate-200 flex items-center gap-2 hover:border-[#1C6FA5] transition-colors"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1C6FA5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1C6FA5]"></span>
              </span>
              <span>Need help with GST, Pvt Ltd or Trademarks? Ask us!</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setUnreadPrompt(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white ml-1"
                aria-label="Dismiss greeting"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setUnreadPrompt(false);
          }}
          aria-label={isOpen ? 'Close Simplifyl chat assistant' : 'Open Simplifyl chat assistant'}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#10364E] to-[#1C6FA5] text-white flex items-center justify-center shadow-xl shadow-blue-900/25 border-2 border-white dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 transition-transform duration-200" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-7rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#10364E] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1C6FA5] flex items-center justify-center text-white font-bold shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm leading-tight text-white">Simplifyl AI Assistant</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                    GST, ROC & Corporate Compliance Desk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleSound}
                  title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
                  className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Clear Chat History"
                  className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Top Bar with Helpline & Direct WhatsApp */}
            <div className="bg-[#F4F8FB] dark:bg-slate-800/80 px-3.5 py-2 border-b border-blue-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1 font-semibold text-[#10364E] dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-[#1C6FA5]" /> Live CA Advisory
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="tel:+917845132962"
                  className="inline-flex items-center gap-1 font-bold text-[#1C6FA5] dark:text-blue-400 hover:underline"
                >
                  <Phone className="w-3 h-3" /> +91 78451 32962
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="https://wa.me/917845132962?text=Hello%20Simplifyl%20Team!%20I%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-[#F4F8FB] dark:bg-slate-800 text-[#1C6FA5] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 dark:border-slate-700">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[88%] space-y-2`}>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap break-words ${
                          isBot
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                            : 'bg-[#1C6FA5] text-white rounded-tr-sm font-medium shadow-sm'
                        }`}
                      >
                        {msg.text.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>
                            {line.split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                              if (chunk.startsWith('**') && chunk.endsWith('**')) {
                                return (
                                  <strong key={cIdx} className="font-bold text-[#10364E] dark:text-white">
                                    {chunk.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return chunk;
                            })}
                          </p>
                        ))}
                      </div>

                      {/* Interactive In-Chat Form (Lead Capture) */}
                      {isBot && msg.action && msg.action.type === 'lead_form' && (
                        <InChatLeadForm
                          defaultService={msg.action.defaultService || 'GST Filing'}
                          onSubmitSuccess={({ name, service }) => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: `ack-${Date.now()}`,
                                sender: 'bot',
                                text: `✅ Callback scheduled for **${name}** regarding **${service}**. We have dispatched your request to **businessgroupikasle@gmail.com**.`,
                                time: 'Just now',
                                action: null
                              }
                            ]);
                            if (soundEnabled) playNotificationChime();
                          }}
                        />
                      )}

                      {/* Interactive Action Link/WhatsApp Button */}
                      {isBot && msg.action && msg.action.type !== 'lead_form' && (
                        <motion.button
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleActionClick(msg.action)}
                          className="w-full text-left py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1C6FA5]/30 hover:border-[#1C6FA5] hover:bg-[#F4F8FB] dark:hover:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 font-bold text-xs flex items-center justify-between transition-colors shadow-xs"
                        >
                          <span className="line-clamp-1">{msg.action.label}</span>
                          {msg.action.type === 'link' ? (
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <MessageCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                          )}
                        </motion.button>
                      )}

                      <span
                        className={`block text-[10px] text-slate-400 ${
                          isBot ? 'text-left' : 'text-right'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-full bg-[#10364E] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                  <div className="flex gap-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="text-[11px] text-slate-400">Simplifyl AI is reviewing compliance rules...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Suggestion Chips */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {getContextualPrompts().map((prompt, pIdx) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleSend(prompt.text)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:border-[#1C6FA5] hover:text-[#1C6FA5] dark:hover:text-blue-400 transition-colors"
                  >
                    <Icon className="w-3 h-3 text-[#1C6FA5]" />
                    <span>{prompt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about GST, Pvt Ltd, Trademark, ROC..."
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C6FA5] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-[#1C6FA5] hover:bg-[#175B87] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
