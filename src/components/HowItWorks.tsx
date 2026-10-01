import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/insuranceData';
import { HelpCircle, Search, FileSignature, LifeBuoy, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartProcess: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartProcess }) => {
  const stepIcons = [HelpCircle, Search, FileSignature, LifeBuoy];

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Clear & Transparent Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A structured, human-centric approach that removes confusion and ensures you get the exact protection your family deserves.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative">
          
          {/* Desktop Connecting Line (only visible on lg) */}
          <div className="hidden lg:block absolute top-1/4 left-16 right-16 h-0.5 bg-gradient-to-r from-teal-500 via-blue-600 to-slate-400 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const IconComponent = stepIcons[idx];
              return (
                <div
                  key={step.step}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative group"
                >
                  {/* Step Bubble */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md mb-5 group-hover:bg-teal-700 group-hover:scale-105 transition-all duration-200">
                    <IconComponent className="w-6 h-6 text-teal-300" />
                  </div>

                  {/* Step Number Tag */}
                  <span className="font-mono text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                    Step {step.step}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Process Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartProcess}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow cursor-pointer"
          >
            <span>Start Step 01 With Nitin Agrawal</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
