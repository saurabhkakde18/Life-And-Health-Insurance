import React, { useState } from 'react';
import { Calculator, Shield, Heart, Palmtree, GraduationCap, ArrowRight, CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';

interface PlanningToolsProps {
  onSelectPlanEnquiry: (planName: string, notes?: string) => void;
}

export const PlanningTools: React.FC<PlanningToolsProps> = ({ onSelectPlanEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'life' | 'health' | 'retirement' | 'education'>('life');

  // Interactive selectors
  const [lifeAgeGroup, setLifeAgeGroup] = useState('25-35');
  const [lifeDependents, setLifeDependents] = useState('Spouse + 1 Child');
  
  const [healthFamilyType, setHealthFamilyType] = useState('Family Floater (Self, Spouse, Kids)');
  const [healthPreference, setHealthPreference] = useState('High Sum Assured + Cashless');

  const [retirementHorizon, setRetirementHorizon] = useState('15-20 years');
  const [retirementGoal, setRetirementGoal] = useState('Guaranteed Monthly Pension');

  const [educationYears, setEducationYears] = useState('10-15 years');
  const [educationTarget, setEducationTarget] = useState('Professional / Higher Studies (India / Abroad)');

  const tools = [
    {
      id: 'life',
      title: 'Life Insurance Planning',
      icon: Shield,
      summary: 'Evaluate sum assured requirements based on dependents, liabilities, and lifestyle continuation.',
      recommendationSummary: `Structured for age bracket ${lifeAgeGroup} with dependents (${lifeDependents}). Recommended focus: 10x-15x annual income protection + loan cover.`,
      checklist: [
        'Income Replacement Ratio assessment',
        'Home / business loan debt clearance cover',
        'Optional critical illness & accidental disability rider evaluation'
      ],
      actionLabel: 'Get Assistance for Life Insurance'
    },
    {
      id: 'health',
      title: 'Health Insurance Enquiry',
      icon: Heart,
      summary: 'Find the right floater or individual mediclaim shield to absorb rising hospitalization costs.',
      recommendationSummary: `Tailored for ${healthFamilyType} focusing on ${healthPreference}. Recommended: Ample room-rent flexibility & restore benefits.`,
      checklist: [
        'Network hospital verification across Jalna & Maharashtra',
        'Pre-existing disease waiting period review (2-3 years)',
        'Day-care procedures and modern treatment coverage check'
      ],
      actionLabel: 'Get Assistance for Health Insurance'
    },
    {
      id: 'retirement',
      title: 'Retirement Planning Enquiry',
      icon: Palmtree,
      summary: 'Formulate a guaranteed annuity roadmap to secure independent income post-retirement.',
      recommendationSummary: `Planning for horizon of ${retirementHorizon} with objective of ${retirementGoal}.`,
      checklist: [
        'Guaranteed lifetime annuity vs market-linked pension mix',
        'Joint life pension options with return of purchase price',
        'Tax efficiency under current Income Tax provisions'
      ],
      actionLabel: 'Get Assistance for Retirement Planning'
    },
    {
      id: 'education',
      title: 'Child Education Planning',
      icon: GraduationCap,
      summary: 'Protect higher education and career milestones against unexpected life events.',
      recommendationSummary: `Targeting college milestone in ${educationYears} for ${educationTarget}.`,
      checklist: [
        'Waiver of Premium benefit ensuring fund continues even if parent is not around',
        'Milestone-linked payouts for entrance exam, college, or graduation',
        'Disciplined corpus accumulation hedge against 10%+ educational inflation'
      ],
      actionLabel: 'Get Assistance for Child Education'
    }
  ];

  const currentTool = tools.find((t) => t.id === activeTab) || tools[0];

  const handleAction = () => {
    let details = '';
    if (activeTab === 'life') details = `Age: ${lifeAgeGroup}, Dependents: ${lifeDependents}`;
    if (activeTab === 'health') details = `Family: ${healthFamilyType}, Preference: ${healthPreference}`;
    if (activeTab === 'retirement') details = `Horizon: ${retirementHorizon}, Objective: ${retirementGoal}`;
    if (activeTab === 'education') details = `Target: ${educationYears}, Goal: ${educationTarget}`;

    onSelectPlanEnquiry(currentTool.title, details);
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Smart Assessment</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Quick Planning Tools
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Select an insurance goal to structure your protection priorities and receive personalized advisory assistance.
          </p>
        </div>

        {/* Interactive Segmented Tabs (Clean buttons, zero-pill slop) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/70 max-w-3xl mx-auto rounded-2xl mb-10">
          {tools.map((tool) => {
            const IconComp = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{tool.title.replace(' Enquiry', '').replace(' Planning', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Planning Tool Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal-700 font-bold">Interactive Advisor</span>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                {currentTool.title}
              </h3>
            </div>
            <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
              Confidential & Non-Obligation
            </span>
          </div>

          {/* Interactive Parameters based on tab */}
          <div className="py-6 space-y-6">
            
            {activeTab === 'life' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Current Age Group
                  </label>
                  <select
                    value={lifeAgeGroup}
                    onChange={(e) => setLifeAgeGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="18-25">18 – 25 years (Early Career)</option>
                    <option value="25-35">25 – 35 years (Young Family)</option>
                    <option value="35-45">35 – 45 years (Peak Earning)</option>
                    <option value="45-55">45 – 55 years (Pre-Retirement)</option>
                    <option value="55+">55+ years (Senior Financial Planning)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Financial Dependents
                  </label>
                  <select
                    value={lifeDependents}
                    onChange={(e) => setLifeDependents(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Parents Only">Parents Only</option>
                    <option value="Spouse Only">Spouse Only</option>
                    <option value="Spouse + 1 Child">Spouse + 1 Child</option>
                    <option value="Spouse + 2+ Children">Spouse + 2+ Children</option>
                    <option value="Extended Family (Parents + Spouse + Children)">Joint / Extended Family</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Coverage Structure
                  </label>
                  <select
                    value={healthFamilyType}
                    onChange={(e) => setHealthFamilyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Individual (Self)">Individual (Self Only)</option>
                    <option value="Family Floater (Self, Spouse, Kids)">Family Floater (Self, Spouse, Kids)</option>
                    <option value="Senior Citizen Parents">Senior Citizen Parents</option>
                    <option value="Complete Family + Parents">Multi-generation Shield</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Priority
                  </label>
                  <select
                    value={healthPreference}
                    onChange={(e) => setHealthPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="High Sum Assured + Cashless">High Sum Assured + Cashless Network</option>
                    <option value="Maternity & Newborn Cover">Maternity & Newborn Cover</option>
                    <option value="Critical Illness & Cancer Shield">Critical Illness & Cancer Shield</option>
                    <option value="No Room Rent Capping">No Room Rent Capping & Unlimited Restore</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'retirement' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Time Horizon Until Retirement
                  </label>
                  <select
                    value={retirementHorizon}
                    onChange={(e) => setRetirementHorizon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Under 5 years">Under 5 years (Immediate Annuity)</option>
                    <option value="5-10 years">5 – 10 years</option>
                    <option value="10-15 years">10 – 15 years</option>
                    <option value="15-20 years">15 – 20 years</option>
                    <option value="20+ years">20+ years (Long-term compounding)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target Outcome
                  </label>
                  <select
                    value={retirementGoal}
                    onChange={(e) => setRetirementGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Guaranteed Monthly Pension">Guaranteed Monthly Pension for Life</option>
                    <option value="Lump Sum Corpus + Annuity">Lump Sum Corpus + Annuity Combination</option>
                    <option value="Pension with Return of Purchase Price">Pension with Return of Purchase Price to Nominee</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target Time To College / Degree
                  </label>
                  <select
                    value={educationYears}
                    onChange={(e) => setEducationYears(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="3-5 years">3 – 5 years (High School / Junior College)</option>
                    <option value="6-10 years">6 – 10 years (Undergraduate Entry)</option>
                    <option value="10-15 years">10 – 15 years (Primary School Child)</option>
                    <option value="15-18 years">15 – 18 years (Newborn / Toddler)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Education Goal
                  </label>
                  <select
                    value={educationTarget}
                    onChange={(e) => setEducationTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Professional Studies (India)">Professional Engineering / Medicine / MBA (India)</option>
                    <option value="Overseas Higher Education">Overseas Undergraduate / Master's Degree</option>
                    <option value="Business / Career Launch Fund">Career Foundation / Entrepreneurial Launch Fund</option>
                  </select>
                </div>
              </div>
            )}

            {/* Generated Planning Guidance Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Advisory Consideration:
              </p>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                {currentTool.recommendationSummary}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700">Recommended Assessment Checklist:</p>
                {currentTool.checklist.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-2 text-[11px] text-slate-500 max-w-md">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Regulatory Note:</strong> Actual premium rates, sum assured eligibility, and policy options are based exclusively on verified insurer rate charts, medical underwriting, and age proofs.
              </span>
            </div>

            <button
              onClick={handleAction}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-semibold text-sm transition-all duration-200 shadow cursor-pointer whitespace-nowrap"
            >
              <span>{currentTool.actionLabel}</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
