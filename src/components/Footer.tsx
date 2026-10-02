import React, { useState } from 'react';
import { Shield, Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, Linkedin, HeartHandshake, ArrowUp, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';
import { LegalModal } from './LegalModal';
import { LicLogo } from './logos/LicLogo';
import { CareHealthLogo } from './logos/CareHealthLogo';

interface FooterProps {
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminPortal }) => {
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    title: string;
    type: 'privacy' | 'terms' | 'disclaimer';
  }>({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  const openModal = (type: 'privacy' | 'terms' | 'disclaimer', title: string) => {
    setLegalModal({ isOpen: true, title, type });
  };

  const closeModal = () => {
    setLegalModal({ ...legalModal, isOpen: false });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Advisor Info */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5 text-amber-300 fill-amber-300/20" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                  Life<span className="text-teal-400">Express</span>
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-teal-400 font-semibold -mt-1">
                  Life & Health Insurance Services
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Professional insurance advisory services led by Nitin Agrawal. Helping families, individuals, and business owners in Jalna and Maharashtra build lifelong financial security.
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">
                Nitin Agrawal · Life & Health Insurance Advisor
              </p>
              <p className="text-slate-400">
                In front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Official Insurer Partners in Footer */}
            <div className="pt-3 border-t border-slate-900">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Authorized Insurer Products:
              </p>
              <div className="flex items-center gap-2.5">
                <div className="bg-white p-1 rounded-lg border border-slate-700 shadow-xs">
                  <LicLogo className="h-7 w-auto" />
                </div>
                <div className="bg-white p-1 rounded-lg border border-slate-700 shadow-xs">
                  <CareHealthLogo className="h-7 w-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-colors">About Nitin Agrawal</a>
              </li>
              <li>
                <a href="#life-insurance" className="text-slate-400 hover:text-white transition-colors">Life Insurance Plans</a>
              </li>
              <li>
                <a href="#health-insurance" className="text-slate-400 hover:text-white transition-colors">Health Insurance Coverage</a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">Insurance Services</a>
              </li>
              <li>
                <a href="#enquiry" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">Customer Enquiry</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact & Office Location</a>
              </li>
              {onOpenAdminPortal && (
                <li className="pt-2 border-t border-slate-900">
                  <button
                    type="button"
                    onClick={onOpenAdminPortal}
                    className="text-slate-400 hover:text-teal-400 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                  >
                    <Lock className="w-3.5 h-3.5 text-teal-500" />
                    <span>Advisor Portal (Admin Login)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Contact Information */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contact Advisor
            </h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <a
                href={`tel:${CONTACT_INFO.mobile}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold">{CONTACT_INFO.mobileDisplay}</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Corporate Office: In front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 LifeExpress. All Rights Reserved. Advisor: Nitin Agrawal, Jalna.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => openModal('privacy', 'Privacy Policy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openModal('terms', 'Terms & Conditions')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => openModal('disclaimer', 'Statutory Disclaimer')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
            {onOpenAdminPortal && (
              <button
                type="button"
                onClick={onOpenAdminPortal}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-400 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-teal-600" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Modal Dialog */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={closeModal}
        title={legalModal.title}
        type={legalModal.type}
      />
    </footer>
  );
};
