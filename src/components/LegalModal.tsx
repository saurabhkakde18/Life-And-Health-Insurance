import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 id="legal-modal-title" className="text-xl font-bold text-slate-900 font-display">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 max-h-[60vh] overflow-y-auto text-sm text-slate-600 space-y-4 leading-relaxed pr-2">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Privacy Policy for LifeExpress (Nitin Agrawal)</strong>
              </p>
              <p>
                At LifeExpress, your privacy and personal information confidentiality are of paramount importance. This Privacy Policy details how we handle the contact details you share with us.
              </p>
              <h4 className="font-bold text-slate-800">1. Information Collection</h4>
              <p>
                When you request a consultation or submit an insurance query through our website, we collect your name, phone number, email address, city, and insurance preferences.
              </p>
              <h4 className="font-bold text-slate-800">2. Use of Information</h4>
              <p>
                Your details are utilized solely by Nitin Agrawal and the LifeExpress advisory team to respond to your consultation request, assist with insurance comparison, and service your insurance policies.
              </p>
              <h4 className="font-bold text-slate-800">3. Non-Disclosure & Security</h4>
              <p>
                We do not sell, rent, or trade your personal information to third-party telemarketers or external vendors. Information shared for policy proposals is transmitted strictly to authorized insurance companies with your consent for underwriting.
              </p>
              <h4 className="font-bold text-slate-800">4. Contact</h4>
              <p>
                For questions regarding your data, contact Nitin Agrawal at 8830662663 or nitinagrawal6060@gmail.com.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Terms & Conditions of Service</strong>
              </p>
              <p>
                By using this website and submitting an inquiry to LifeExpress, you acknowledge and agree to the following terms:
              </p>
              <h4 className="font-bold text-slate-800">1. Nature of Service</h4>
              <p>
                LifeExpress provides professional insurance consultation, assistance, and intermediary advisory services. Insurance policies are issued directly by licensed insurance companies subject to their underwriting approval and policy terms.
              </p>
              <h4 className="font-bold text-slate-800">2. Accuracy of Information</h4>
              <p>
                Customers are responsible for providing truthful and accurate personal, medical, and financial disclosures in their insurance proposal forms. Non-disclosure may affect claim settlement by the insurer.
              </p>
              <h4 className="font-bold text-slate-800">3. Consultative Role</h4>
              <p>
                All calculations, illustrations, and guidance shared are for informational and planning purposes only. Final premium amounts, bonus rates, and benefits are governed strictly by the respective insurer's contractual policy bond.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <p>
                <strong>Statutory & Regulatory Disclaimer</strong>
              </p>
              <p>
                "Insurance is the subject matter of solicitation."
              </p>
              <p>
                Insurance products are subject to terms, conditions, exclusions, waiting periods, and eligibility criteria of the respective insurance product and insurer. Please read the sales brochure and policy terms carefully before concluding a sale.
              </p>
              <p>
                LifeExpress and Nitin Agrawal act as professional advisors assisting customers in choosing policies from reputable insurance providers such as Life Insurance Corporation of India (LIC) and Care Health Insurance.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
