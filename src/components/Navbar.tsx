import React, { useState, useEffect } from 'react';
import { Phone, Shield, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';

interface NavbarProps {
  onOpenConsultation?: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Life Insurance', href: '#life-insurance' },
    { name: 'Health Insurance', href: '#health-insurance' },
    { name: 'Plans', href: '#plans' },
    { name: 'Services', href: '#services' },
    {
      name: 'Customer Enquiry',
      href: '#enquiry',
      isEnquiry: true
    },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationClick = () => {
    setMobileMenuOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const formEl = document.getElementById('consultation-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element / wordmark with sleek emblem */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-teal-700 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-amber-300 fill-amber-300/20" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display">
                Life<span className="text-teal-600">Express</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold -mt-1">
                Life & Health Insurance
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (desktop) */}
          <nav className="hidden xl:flex items-center gap-4 text-xs xl:text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-all duration-150 whitespace-nowrap ${
                  link.isEnquiry
                    ? 'text-teal-800 bg-teal-50 hover:bg-teal-100/90 font-semibold px-2.5 py-1 rounded-lg border border-teal-200/80 shadow-xs'
                    : 'hover:text-slate-950 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-600 hover:after:w-full after:transition-all after:duration-200'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Quick Call */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.mobile}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
              title="Call Nitin Agrawal"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{CONTACT_INFO.mobileDisplay}</span>
            </a>

            <button
              onClick={handleConsultationClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${CONTACT_INFO.mobile}`}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Call Advisor"
            >
              <Phone className="w-5 h-5 text-teal-600" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto animate-in slide-in-from-top duration-200 z-50">
          <div className="px-5 py-4 space-y-1 divide-y divide-slate-100">
            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    link.isEnquiry
                      ? 'text-teal-900 bg-teal-50 font-bold border border-teal-200/80 shadow-xs'
                      : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 pb-2 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Nitin Agrawal · Jalna (MS)</p>
                <p className="text-sm font-bold text-slate-800">{CONTACT_INFO.mobileDisplay}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{CONTACT_INFO.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CONTACT_INFO.mobile}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={handleConsultationClick}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
