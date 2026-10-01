import React, { useState } from 'react';
import { GraduationCap, Palmtree, Users, HeartPulse, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { LIFE_STAGES } from '../data/insuranceData';

interface LifeStagesProps {
  onSelectStage: (stageTitle: string) => void;
}

export const LifeStages: React.FC<LifeStagesProps> = ({ onSelectStage }) => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const getStageIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 1:
        return <Palmtree className="w-6 h-6 text-amber-600" />;
      case 2:
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 3:
      default:
        return <HeartPulse className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="plans" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Comprehensive Lifecycle Planning</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Insurance Solutions for Every Stage of Life
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether starting a young family, funding higher education, or preparing for a peaceful retirement, find the right protection strategy.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIFE_STAGES.map((stage, idx) => (
            <div
              key={stage.number}
              onMouseEnter={() => setActiveStage(idx)}
              onMouseLeave={() => setActiveStage(null)}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Top Index & Icon */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                    {getStageIcon(idx)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {stage.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-display mb-2 group-hover:text-teal-700 transition-colors">
                  {stage.title}
                </h3>

                <p className="text-sm font-medium text-slate-800 leading-snug mb-3">
                  "{stage.tagline}"
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 mb-6">
                  {stage.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectStage(stage.title)}
                className="w-full py-2.5 px-4 rounded-xl bg-white group-hover:bg-slate-900 border border-slate-300 group-hover:border-slate-900 text-slate-700 group-hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span>Plan This Milestone</span>
                <ChevronRight className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-300 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Milestone Advisory Assistance Footnote */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <p>
            * All milestone plans are structured using authorized insurance products from respective carriers, subject to individual eligibility and underwriting.
          </p>
        </div>

      </div>
    </section>
  );
};
