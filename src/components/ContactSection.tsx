import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Navigation, Clock, Building, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-bold">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Visit Our Office or Connect Directly
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We are conveniently located in the commercial heart of Jalna, ready to assist you in person or remotely.
          </p>
        </div>

        {/* 2-Column Grid: Advisor Details + Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Office Details & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm">
            
            <div className="space-y-6">
              
              {/* Header Profile Badge */}
              <div className="border-b border-slate-100 pb-6">
                <span className="text-xs uppercase tracking-wider text-teal-700 font-bold">Insurance Advisory Office</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                  {CONTACT_INFO.advisorName}
                </h3>
                <p className="text-sm font-semibold text-slate-600">
                  {CONTACT_INFO.role} · LifeExpress
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-4 text-sm text-slate-700">
                
                {/* Mobile */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Mobile Number</p>
                    <a
                      href={`tel:${CONTACT_INFO.mobile}`}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors"
                    >
                      {CONTACT_INFO.mobileDisplay}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Available for calls & WhatsApp</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Address</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-base font-semibold text-slate-900 hover:text-teal-700 transition-colors break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Corporate Office</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                      In front of Sadar Bazar Police Station,<br />
                      Balaji Galli, Jalna (MS) – 431203
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Prominent landmark: Directly opposite Sadar Bazar Police Station
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Working Hours</p>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* 4 Required Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-8 border-t border-slate-100 mt-6">
              <a
                href={`tel:${CONTACT_INFO.mobile}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm text-center"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors border border-slate-200 text-center"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>Email Us</span>
              </a>

              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors border border-slate-200 text-center"
              >
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Area / Map Card */}
          <div className="lg:col-span-6 flex flex-col rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            
            {/* Interactive map frame centered on Sadar Bazar Police Station, Jalna */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-200">
              <iframe
                title="LifeExpress Office Location Jalna"
                src="https://maps.google.com/maps?q=Sadar+Bazar+Police+Station+Jalna+Maharashtra&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full"
              />

              {/* Map pin overlay badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl p-3 shadow-md text-left max-w-xs">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>LifeExpress Corporate Office</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                  In front of Sadar Bazar Police Station, Balaji Galli, Jalna (MS) – 431203
                </p>
              </div>
            </div>

            {/* Map Card Footer Note & Direction Link */}
            <div className="p-6 bg-slate-50 flex items-center justify-between border-t border-slate-200">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Easy Accessibility & Parking Available
                </p>
                <p className="text-[11px] text-slate-500">
                  Approx. 1.8 km from Jalna Railway Station & Main Bus Stand
                </p>
              </div>

              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold hover:text-slate-950 transition-colors shadow-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
