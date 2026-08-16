import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, Bot, User, Sparkles,
  RefreshCw, Minimize2, ChevronDown, Loader2, Zap
} from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Suggested starter prompts ────────────────────────────────────────────────
const STARTERS = [
  { icon: '💰', text: 'How much does a SaaS app cost?' },
  { icon: '⚡', text: 'What tech stack do you use for AI?' },
  { icon: '⏱️', text: 'How long does a mobile app take?' },
  { icon: '📅', text: 'Can I book a free discovery call?' },
];

// ─── Unique session ID per browser tab ───────────────────────────────────────
const SESSION_ID = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// ─── Format message text (basic markdown: **bold**, newlines, bullet •) ───────
const FormatText = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        // Bold **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
          </p>
        );
      })}
    </div>
  );
};

// ─── Single message bubble ────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
        ${isUser
          ? 'bg-gradient-to-tr from-cyan-500 to-violet-600 text-white'
          : 'bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white'}`}>
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? 'bg-gradient-to-br from-cyan-500 to-violet-600 text-white rounded-tr-sm'
          : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-sm'}`}>
        {isUser
          ? <p>{msg.content}</p>
          : <FormatText text={msg.content} />
        }
        <div className={`text-[10px] mt-1.5 ${isUser ? 'text-cyan-100/70 text-right' : 'text-slate-500'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Typing indicator ─────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex gap-2.5">
    <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
      <Bot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-slate-800/90 border border-slate-700/60 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay }}
        />
      ))}
    </div>
  </div>
);

// ─── Main ChatWidget ──────────────────────────────────────────────────────────
const ChatWidget = ({ onOpenLeadModal, onOpenBooking }) => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm **Aria**, Sunvix's AI assistant.\n\nI can help you understand our services & pricing, choose the right tech stack, get a quick estimate, or book a free discovery call with Suraj.\n\nWhat are you building?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showStarters, setShowStarters] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, open, minimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setUnread(0);
    }
  }, [open, minimized]);

  const sendMessage = useCallback(async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput('');
    setShowStarters(false);
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: Date.now() }]);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/api/chat`, {
        message: userMsg,
        sessionId: SESSION_ID,
      });

      const reply = data.reply || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: Date.now() }]);

      // Increment unread badge if window is minimized or closed
      if (!open || minimized) setUnread(n => n + 1);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a momentary hiccup — please try again in a second! Or click **Start Your Project** in the nav to reach Suraj directly. 🚀",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, open, minimized]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetConversation = async () => {
    try {
      await axios.post(`${API_BASE}/api/chat/reset`, { sessionId: SESSION_ID });
    } catch (_) {}
    setMessages([{
      role: 'assistant',
      content: "Hey there! 👋 I'm **Aria**, Sunvix's AI assistant.\n\nWhat are you building?",
      timestamp: Date.now(),
    }]);
    setShowStarters(true);
  };

  return (
    <>
      {/* ── Floating Launch Button ─────────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setOpen(true); setMinimized(false); setUnread(0); }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 text-white shadow-2xl shadow-cyan-500/30 flex items-center justify-center"
            aria-label="Open Sunvix AI Chat"
          >
            <MessageSquare className="w-6 h-6" />
            {/* Unread badge */}
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unread}
              </span>
            )}
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/60"
            style={{ maxHeight: minimized ? 'auto' : '580px' }}
          >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-[#0d1117] to-[#0f1520] border-b border-slate-700/60 px-4 py-3 flex items-center gap-3">
              {/* Aria avatar */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0d1117]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">Aria</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
                    <Zap className="w-2.5 h-2.5" /> Sunvix AI
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">Online · replies instantly</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetConversation}
                  title="New conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMinimized(m => !m)}
                  title={minimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {minimized ? <ChevronDown className="w-3.5 h-3.5 rotate-180" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Body (hidden when minimized) ──────────────────────────── */}
            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col bg-[#080c14]"
                  style={{ maxHeight: '440px' }}
                >
                  {/* Messages scroll area */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: '260px', maxHeight: '340px' }}>
                    {messages.map((msg, i) => (
                      <MessageBubble key={i} msg={msg} />
                    ))}
                    {loading && <TypingIndicator />}
                    <div ref={bottomRef} />
                  </div>

                  {/* Starter prompts */}
                  <AnimatePresence>
                    {showStarters && messages.length === 1 && !loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="px-4 pb-3 flex flex-wrap gap-2"
                      >
                        {STARTERS.map((s) => (
                          <button
                            key={s.text}
                            onClick={() => sendMessage(s.text)}
                            className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-700/60 transition-all duration-150"
                          >
                            {s.icon} {s.text}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA strip — Book a call / Start Your Project */}
                  <div className="px-4 pb-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setOpen(false); onOpenBooking && onOpenBooking(); }}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-200"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book a Call
                    </button>
                    <button
                      onClick={() => { setOpen(false); onOpenLeadModal(); }}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold hover:border-cyan-500/40 transition-all duration-200"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Start Project
                    </button>
                  </div>

                  {/* Input bar */}
                  <div className="px-4 pb-4 pt-1">
                    <div className="flex items-end gap-2 bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-500/60 transition-colors">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about Sunvix…"
                        rows={1}
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none leading-relaxed max-h-24"
                        style={{ minHeight: '22px' }}
                        disabled={loading}
                      />
                      <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                        className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {loading
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : <Send className="w-3.5 h-3.5" />
                        }
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-600 text-center mt-1.5">
                      Powered by Sunvix AI · Enter to send
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
