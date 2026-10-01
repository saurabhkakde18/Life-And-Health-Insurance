import React from 'react';
import { Shield, Heart, Check, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data/insuranceData';
import { LicLogo } from './logos/LicLogo';
import { CareHealthLogo } from './logos/CareHealthLogo';

interface InsuranceServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const InsuranceServices: React.FC<InsuranceServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Comprehensive Coverage</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Specialized Insurance Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Tailored coverage designed to safeguard both your family's long-term financial stability and immediate healthcare needs.
          </p>
        </div>

        {/* 2 Flagship Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Life Insurance */}
          <div
            id="life-insurance"
            className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group"
          >
            {/* Card Header Top */}
            <div className="p-8 sm:p-10 space-y-6 flex-1">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Shield className="w-6 h-6 text-amber-300 fill-amber-300/20" />
                  </div>
                  <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                    Financial Security & Legacy
                  </span>
                </div>
                {/* Official LIC Logo */}
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                  <LicLogo className="h-10 w-auto" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  Life Insurance
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-blue-800 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-lg font-medium">
                  <span>Featuring authorized plans from <strong>Life Insurance Corporation of India (LIC)</strong></span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Plan for your family's financial security with life insurance solutions designed around protection, long-term goals and future needs.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Protection Areas:
                </h4>
                <ul className="space-y-2.5">
                  {SERVICES_DATA[0].features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Action & Disclaimer Footer */}
            <div className="p-8 sm:p-10 pt-0 space-y-4">
              <button
                onClick={() => onSelectService('Life Insurance')}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm transition-all duration-200 shadow flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
              >
                <span>Explore Life Insurance</span>
                <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Life insurance plans are underwritten by LIC of India, subject to policy terms, conditions, and underwriting guidelines.</span>
              </div>
            </div>
          </div>

          {/* Card 2: Health Insurance */}
          <div
            id="health-insurance"
            className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group"
          >
            {/* Card Header Top */}
            <div className="p-8 sm:p-10 space-y-6 flex-1">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Heart className="w-7 h-7 text-teal-200 fill-teal-200/20" />
                  </div>
                  <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                    Medical & Hospitalization Shield
                  </span>
                </div>
                {/* Official Care Health Logo */}
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                  <CareHealthLogo className="h-10 w-auto" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  Health Insurance
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-teal-800 bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-lg font-medium">
                  <span>Featuring authorized plans from <strong>Care Health Insurance</strong></span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Explore health insurance solutions that can help protect you and your family against unexpected medical expenses.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Protection Areas:
                </h4>
                <ul className="space-y-2.5">
                  {SERVICES_DATA[1].features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-teal-100/80 text-teal-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Action & Disclaimer Footer */}
            <div className="p-8 sm:p-10 pt-0 space-y-4">
              <button
                onClick={() => onSelectService('Health Insurance')}
                className="w-full py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-all duration-200 shadow flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
              >
                <span>Explore Health Insurance</span>
                <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Health insurance coverage, cashless network, and waiting periods are underwritten by Care Health Insurance Ltd.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
