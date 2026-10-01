import React from 'react';
import { PhoneCall, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';

interface DarkCtaBannerProps {
  onTalkToAdvisor: () => void;
}

export const DarkCtaBanner: React.FC<DarkCtaBannerProps> = ({ onTalkToAdvisor }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden border-y border-slate-800">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-teal-300">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Personalized Consultation Available</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white text-balance">
          Plan Today. Protect Tomorrow.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal text-pretty">
          Whether your goal is family protection, child education, retirement planning or health protection, LifeExpress can help you understand available insurance solutions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onTalkToAdvisor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk to Nitin Agrawal</span>
          </button>

          <a
            href={`https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-100 font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>

        <div className="pt-2">
          <p className="text-xs text-slate-400">
            Direct Line: <strong className="text-white">{CONTACT_INFO.mobileDisplay}</strong> · Sadar Bazar, Jalna (MS)
          </p>
        </div>

      </div>
    </section>
  );
};
