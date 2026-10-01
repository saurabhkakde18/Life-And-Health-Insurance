import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, User, Mail, MapPin, ShieldCheck, Loader2, Sparkles, FileText, HeartPulse } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';

interface EnquiryFormProps {
  initialRequirement?: string;
  initialNotes?: string;
}

type EnquiryCategory = 'new-policy' | 'service-support' | 'claim-help';

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialRequirement = 'Life Insurance',
  initialNotes = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<EnquiryCategory>('new-policy');
  
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Jalna');
  const [visitType, setVisitType] = useState<'In-Office Visit' | 'Online / Phone Consultation' | 'Home Visit'>('In-Office Visit');
  const [requirement, setRequirement] = useState(initialRequirement);
  const [message, setMessage] = useState(initialNotes);
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialRequirement) {
      setRequirement(initialRequirement);
    }
  }, [initialRequirement]);

  useEffect(() => {
    if (initialNotes) {
      setMessage((prev) => (prev ? `${prev}\n${initialNotes}` : initialNotes));
    }
  }, [initialNotes]);

  // Handle Enquiry Category Tab switches
  const handleCategorySwitch = (cat: EnquiryCategory) => {
    setActiveCategory(cat);
    if (cat === 'new-policy') {
      setRequirement('Life Insurance');
      setMessage('');
    } else if (cat === 'service-support') {
      setRequirement('Existing Policy Service / Revival');
      setMessage('I need assistance with my existing policy (e.g. premium payment, nominee update, address change, or lapsed policy revival).');
    } else if (cat === 'claim-help') {
      setRequirement('Claim Assistance & Hospital Guidance');
      setMessage('I need guidance regarding an insurance claim / hospital cashless admission.');
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setMessage(promptText);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your city';
    }

    if (!agreed) {
      newErrors.agreed = 'You must agree to be contacted regarding your enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    const categoryTitle =
      activeCategory === 'new-policy'
        ? 'New Insurance Plan'
        : activeCategory === 'service-support'
        ? 'Existing Policy Service'
        : 'Claim Assistance';

    const text = `*New Customer Consultation (${categoryTitle})*\n` +
      `*Name:* ${fullName}\n` +
      `*Mobile:* ${mobileNumber}\n` +
      `*Email:* ${email}\n` +
      `*City:* ${city}\n` +
      `*Consultation Preference:* ${visitType}\n` +
      `*Requirement:* ${requirement}\n` +
      (message ? `*Details:* ${message}\n` : '') +
      `\nHello Nitin Agrawal, I would like to get assistance with my insurance enquiry.`;
    return `https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setMessage('');
    setAgreed(false);
    setErrors({});
  };

  return (
    <section id="enquiry" className="py-20 lg:py-24 bg-white border-b border-slate-200/80 relative scroll-mt-12">
      {/* Anchor for consultation-form fallback */}
      <div id="consultation-form" className="absolute -top-12 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-bold text-teal-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Customer Consultation & Enquiry Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Get a Free Insurance Consultation
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you are planning a new policy, servicing an existing plan, or seeking claim guidance, connect directly with Nitin Agrawal.
          </p>
        </div>

        {/* Category Tabs for Form */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="grid grid-cols-3 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => handleCategorySwitch('new-policy')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'new-policy'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeCategory === 'new-policy' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span className="text-center">New Policy</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategorySwitch('service-support')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'service-support'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${activeCategory === 'service-support' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="text-center">Policy Servicing</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategorySwitch('claim-help')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'claim-help'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <HeartPulse className={`w-3.5 h-3.5 ${activeCategory === 'claim-help' ? 'text-rose-600' : 'text-slate-400'}`} />
              <span className="text-center">Claim Support</span>
            </button>
          </div>
        </div>

        {/* Form Box */}
        <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Thank you. Your enquiry has been received.
                </h3>
                <p className="text-base text-slate-700 font-medium">
                  Nitin Agrawal will contact you on {mobileNumber || 'your registered number'}.
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We have logged your request for <strong>{requirement}</strong> ({visitType}). For urgent queries, feel free to connect immediately via WhatsApp or direct call.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Directly on WhatsApp</span>
                </a>

                <a
                  href={`tel:${CONTACT_INFO.mobile}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call Nitin Agrawal</span>
                </a>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Submit another consultation request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Quick Tab Prompt Assistance */}
              {activeCategory === 'service-support' && (
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1.5">
                  <p className="font-semibold">Quick Service Requests:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'LIC Policy Revival Assistance',
                      'Nominee / Address Update',
                      'Pay Overdue Premium Help',
                      'Policy Loan & Surrender Guidance'
                    ].map((txt) => (
                      <button
                        key={txt}
                        type="button"
                        onClick={() => handleQuickPrompt(txt)}
                        className="px-2 py-1 bg-white hover:bg-blue-100 text-blue-800 rounded-lg text-[11px] font-medium border border-blue-200 transition-colors cursor-pointer"
                      >
                        + {txt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === 'claim-help' && (
                <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-xs text-rose-950 space-y-1.5">
                  <p className="font-semibold">Claim Emergency / Assistance Type:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Hospital Cashless Admission Query',
                      'Reimbursement Claim Documentation',
                      'Maturity Claim Settlement',
                      'Death Claim Assistance'
                    ].map((txt) => (
                      <button
                        key={txt}
                        type="button"
                        onClick={() => handleQuickPrompt(txt)}
                        className="px-2 py-1 bg-white hover:bg-rose-100 text-rose-800 rounded-lg text-[11px] font-medium border border-rose-200 transition-colors cursor-pointer"
                      >
                        + {txt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'In-Office Visit (Jalna)', val: 'In-Office Visit' as const },
                    { label: 'Online / Phone Call', val: 'Online / Phone Consultation' as const },
                    { label: 'Home Visit', val: 'Home Visit' as const }
                  ].map((m) => (
                    <button
                      key={m.val}
                      type="button"
                      onClick={() => setVisitType(m.val)}
                      className={`p-2 rounded-xl text-xs font-medium border transition-colors text-center cursor-pointer ${
                        visitType === m.val
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Ramesh Patil"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={14}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.mobileNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* City & Insurance Requirement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Locality <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: '' });
                      }}
                      placeholder="e.g. Sadar Bazar, Jalna"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Insurance Requirement <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Child Education Planning">Child Education Planning</option>
                    <option value="Retirement Planning">Retirement Planning</option>
                    <option value="Family Protection">Family Protection</option>
                    <option value="Existing Policy Service / Revival">Existing Policy Service / Revival</option>
                    <option value="Claim Assistance & Hospital Guidance">Claim Assistance & Hospital Guidance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Specific Questions (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share details such as family members, coverage target, existing policy number (if servicing), or suitable call timing..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              {/* Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (errors.agreed) setErrors({ ...errors, agreed: '' });
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I agree to be contacted regarding my enquiry.
                  </span>
                </label>
                {errors.agreed && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.agreed}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-teal-700 active:scale-98 text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-teal-300" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-4 h-4 text-teal-300" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 text-center">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Confidential consultation with Nitin Agrawal · Jalna Office</span>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
