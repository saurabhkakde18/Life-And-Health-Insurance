import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../data/insuranceData';
import { UserCheck2, FileCheck2, ShieldCheck, HeartHandshake, Smile, Handshake, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const icons = [UserCheck2, FileCheck2, ShieldCheck, HeartHandshake, Smile, Handshake];

  return (
    <section id="why-us" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Reliable & Transparent</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Why Choose LifeExpress?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We prioritize transparent guidance, thorough paperwork management, and enduring commitment over transactional policy selling.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => {
            const IconComponent = icons[idx];
            return (
              <div
                key={item.title}
                className="p-7 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-teal-300 group-hover:border-slate-800 transition-colors">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Grounded Commitment Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-slate-300 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-3 h-3 rounded-full bg-teal-400 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-300">
              <strong>Our Advisory Pledge:</strong> Transparent advice, zero false promises, and full compliance with IRDAI registered insurer regulations.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-300 whitespace-nowrap bg-slate-800 px-3 py-1 rounded-lg">
            Client First · Always
          </span>
        </div>

      </div>
    </section>
  );
};
