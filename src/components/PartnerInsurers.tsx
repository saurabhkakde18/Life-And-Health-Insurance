import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { LicLogo } from './logos/LicLogo';
import { CareHealthLogo } from './logos/CareHealthLogo';

export const PartnerInsurers: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Context */}
          <div className="max-w-md text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Authorized Advisory Practice</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Leading Insurance Partners
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We provide professional consultation, policy selection, and full claim assistance for plans underwritten by India's premier insurers.
            </p>
          </div>

          {/* Right: The Two Official Insurer Logos in Prominent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            
            {/* LIC Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all duration-200 shadow-xs">
              <div className="shrink-0 bg-white p-2 rounded-xl shadow-xs border border-slate-200/80">
                <LicLogo className="h-12 sm:h-14 w-auto" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  Life Insurance
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  Life Insurance Corporation of India
                </h4>
                <p className="text-[11px] text-slate-500">
                  Term, Endowment, Pension & Child Plans
                </p>
              </div>
            </div>

            {/* Care Health Insurance Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all duration-200 shadow-xs">
              <div className="shrink-0 bg-white p-2 rounded-xl shadow-xs border border-slate-200/80">
                <CareHealthLogo className="h-12 sm:h-14 w-auto" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  Health Insurance
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  Care Health Insurance
                </h4>
                <p className="text-[11px] text-slate-500">
                  Mediclaim, Floater, Critical Illness & Cashless
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Disclaimer subtext */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              LifeExpress is an authorized advisory service. Insurance policies are issued and underwritten by respective insurers subject to terms, conditions, and underwriting approval.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};
