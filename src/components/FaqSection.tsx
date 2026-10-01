import React, { useState } from 'react';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/insuranceData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Frequently Asked Questions</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Common Questions About Our Insurance Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Transparent answers regarding policy selection, advisory assistance, and how we work with you.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-teal-100 text-teal-800 rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Policy Terms Disclaimer Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Important Policy Information:</strong> All insurance benefits, coverage limits, exclusions, pre-existing ailment waiting periods, premium schedules, and eligibility criteria are determined strictly by the specific terms and conditions of the respective insurance product and carrier. Please read the policy terms carefully before making a purchase decision.
          </p>
        </div>

      </div>
    </section>
  );
};
