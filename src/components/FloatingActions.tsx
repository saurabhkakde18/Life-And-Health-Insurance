import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';

export const FloatingActions: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a subtle greeting tooltip after 4 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappHref = `https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button (bottom right) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
        <div className="relative flex items-center">
          
          {showTooltip && (
            <div className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg border border-slate-200 whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 flex items-center gap-2">
              <span>Chat with Nitin Agrawal</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Dismiss chat tip"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Chat on WhatsApp with Nitin Agrawal"
          >
            <MessageSquare className="w-7 h-7 fill-white/10" />
          </a>
        </div>
      </div>

      {/* Mobile Sticky Quick Action Bar (Fixed bottom, slim height under 56px <= 15% viewport cap) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-3 py-2">
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          <a
            href={`tel:${CONTACT_INFO.mobile}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold active:bg-slate-800 transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>Call Now</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold active:bg-emerald-700 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};
