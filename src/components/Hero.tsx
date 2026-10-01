import React from 'react';
import { Shield, ArrowRight, CheckCircle2, HeartHandshake, FileCheck, PhoneCall, Sparkles, Building2, Award } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';
import { LicLogo } from './logos/LicLogo';
import { CareHealthLogo } from './logos/CareHealthLogo';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
  onExplorePlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExplorePlans }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle background ambient lighting & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Small trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-teal-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Life & Health Insurance Services</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Jalna, Maharashtra</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-display text-balance">
              Protect Your Family.{' '}
              <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
                Plan Your Future.
              </span>{' '}
              Live With Confidence.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-pretty font-normal">
              Professional Life & Health Insurance Services designed to help you plan for life's important milestones and protect the people who matter most.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenConsultation('General Enquiry')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-98 transition-all duration-200 shadow-lg shadow-teal-500/25 cursor-pointer whitespace-nowrap"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onExplorePlans}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700/90 border border-slate-700 active:scale-98 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Insurance Plans</span>
              </button>
            </div>

            {/* Quiet trust markers (No pill clutter) */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Personalised Advisory by Nitin Agrawal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>End-to-End Policy Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dedicated Claim Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Carrier - Professional Family Security & Advisory Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-teal-500/30 via-blue-600/20 to-amber-500/20 blur-xl opacity-75" />

              {/* Main Visual Showcase Card */}
              <div className="relative rounded-2xl bg-slate-800/95 border border-slate-700/80 p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 flex items-center justify-center shadow-md">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold">LifeExpress Advisory</p>
                      <h2 className="text-base font-bold text-white">Family Protection Shield</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                      Jalna, MS
                    </span>
                  </div>
                </div>

                {/* Illustrated Protection Milestones */}
                <div className="py-5 space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3.5 hover:border-slate-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800/60 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Life Insurance Protection</span>
                        <span className="text-[11px] text-teal-300 font-medium">Family First</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Financial safety net for children's future, household security & loan liabilities.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3.5 hover:border-slate-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Health & Medical Cover</span>
                        <span className="text-[11px] text-sky-300 font-medium">Cashless Security</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Hospitalization protection, critical illnesses, and emergency medical cushion.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3.5 hover:border-slate-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Milestone & Retirement Planning</span>
                        <span className="text-[11px] text-amber-300 font-medium">Long Term</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Child higher education corpus and guaranteed lifetime pension options.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advisor Credentials Footer on Card */}
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-teal-500/40 flex items-center justify-center font-bold text-white text-sm">
                      NA
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{CONTACT_INFO.advisorName}</h3>
                      <p className="text-xs text-slate-400">Insurance Advisor · Jalna</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${CONTACT_INFO.mobile}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-medium transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>

              </div>

              {/* Insurer Guidance Mention Banner with Official Logos */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-800/85 border border-slate-700/80 text-[11px] text-slate-300 shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Authorized Advisor For:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-md shadow-xs">
                      <LicLogo className="h-6 w-auto" />
                    </div>
                    <div className="bg-white p-1 rounded-md shadow-xs">
                      <CareHealthLogo className="h-6 w-auto" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 text-right">
                  LIC of India · Care Health Insurance
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
