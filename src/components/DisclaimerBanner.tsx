import React from 'react';
import { ShieldAlert, Award, FileText, CheckCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100 border-b border-slate-200 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <ShieldAlert className="w-4 h-4 text-slate-600" />
            <span>Regulatory & Advisory Disclosure</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <strong>Standard Disclaimer:</strong> Insurance is subject to terms, conditions, exclusions, and eligibility criteria of the respective insurance product and insurer. Please read the policy documents carefully before making a purchase decision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
            <div>
              <p>
                <strong>Independent Insurance Advisory:</strong> LifeExpress is an independent insurance advisory and consultation practice operated by Nitin Agrawal. LifeExpress is not an underwriting insurance company. All insurance policies are issued, underwritten, and administered by respective registered insurers (including Life Insurance Corporation of India and Care Health Insurance Ltd.).
              </p>
            </div>
            <div>
              <p>
                <strong>No Unverified Guarantees:</strong> We do not claim zero waiting periods, unlimited coverage, automatic claim approval, or speculative guaranteed returns. Specific waiting periods (e.g. for pre-existing diseases, maternity, or specific ailments) and coverage limits apply strictly as defined in individual policy contracts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
