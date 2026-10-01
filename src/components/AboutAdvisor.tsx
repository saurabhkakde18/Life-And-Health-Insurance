import React from 'react';
import { UserCheck, ShieldCheck, Headphones, Compass, MapPin, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';
import { LicLogo } from './logos/LicLogo';
import { CareHealthLogo } from './logos/CareHealthLogo';

interface AboutAdvisorProps {
  onOpenConsultation: (topic?: string) => void;
}

export const AboutAdvisor: React.FC<AboutAdvisorProps> = ({ onOpenConsultation }) => {
  const pillars = [
    {
      title: 'Personal Guidance',
      description: 'One-on-one consultation to identify the exact protection gaps, lifestyle requirements, and financial goals of your family.',
      icon: UserCheck,
      color: 'teal'
    },
    {
      title: 'Policy Assistance',
      description: 'End-to-end help with documentation, proposal forms, KYC verification, medical test coordination, and issuance.',
      icon: ShieldCheck,
      color: 'blue'
    },
    {
      title: 'Customer Support',
      description: 'Reliable prompt assistance for policy renewals, nominee updates, address modifications, and hassle-free claim guidance.',
      icon: Headphones,
      color: 'sky'
    },
    {
      title: 'Insurance Planning',
      description: 'Strategic long-term roadmap combining term protection, healthcare cushion, child education milestones, and retirement annuities.',
      icon: Compass,
      color: 'amber'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">About LifeExpress</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Your Trusted Partner for Life & Health Insurance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            LifeExpress provides insurance assistance and financial protection solutions for individuals and families. We help customers understand available insurance options and choose solutions according to their protection and planning needs.
          </p>
        </div>

        {/* 2-Column Grid: Advisor Profile & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Nitin Agrawal Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-9 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                
                {/* Advisor Avatar & Credentials Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-lg border border-teal-300/30">
                    NA
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>Certified Financial Advisor</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight font-display">
                      {CONTACT_INFO.advisorName}
                    </h3>
                    <p className="text-sm text-teal-300 font-medium">
                      {CONTACT_INFO.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Based in Jalna, Maharashtra, Nitin Agrawal has assisted countless families and business owners in selecting suitable life and health coverage with complete transparency and zero guesswork.
                </p>

                {/* Key Points */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Specialist in LIC Life Insurance Solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Care Health Insurance Advisory & Cashless Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>In-person Jalna Office & Direct Digital Support</span>
                  </div>
                </div>

                {/* Direct Contact Links */}
                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                  <a
                    href={`tel:${CONTACT_INFO.mobile}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold">{CONTACT_INFO.mobileDisplay}</span>
                  </a>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{CONTACT_INFO.email}</span>
                  </a>

                  <div className="flex items-start gap-3 text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-400 leading-tight">
                      In front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203
                    </span>
                  </div>
                </div>

                {/* Consultation Button */}
                <button
                  onClick={() => onOpenConsultation('Meeting with Nitin Agrawal')}
                  className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer text-center"
                >
                  Schedule Consultation with Nitin
                </button>

              </div>
            </div>
          </div>

          {/* Right Column: The 4 Foundational Pillars */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-slate-900 border border-slate-200 group-hover:border-slate-800 flex items-center justify-center text-slate-900 group-hover:text-teal-400 shadow-sm transition-colors duration-200 mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Advisory relationship note with official insurer logos */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-teal-50/80 border border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Certified Multi-Insurer Advisory Practice
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      LifeExpress represents the customer's best interests, matching your requirements to policies from premier insurers like <strong>Life Insurance Corporation of India (LIC)</strong> and <strong>Care Health Insurance</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                    <LicLogo className="h-8 w-auto" />
                  </div>
                  <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                    <CareHealthLogo className="h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
