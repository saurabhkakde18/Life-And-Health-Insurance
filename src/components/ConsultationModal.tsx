import React, { useState } from 'react';
import { X, Send, Phone, MessageSquare, CheckCircle2, User, Mail, MapPin, Loader2, Database } from 'lucide-react';
import { CONTACT_INFO } from '../data/insuranceData';
import { saveAppointmentBooking } from '../lib/supabaseClient';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Life Insurance'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(defaultTopic);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      await saveAppointmentBooking({
        fullName: name.trim(),
        mobileNumber: phone.trim(),
        email: email.trim(),
        requirement: topic,
        source: 'modal',
      });
    } catch (err) {
      console.error('Failed to save to Supabase from modal', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-teal-700 font-bold">Quick Consultation</span>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Connect With Nitin Agrawal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 font-display">
              Consultation Request Received
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you {name}. Nitin Agrawal will contact you shortly regarding <strong>{topic}</strong>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <a
                href={`https://wa.me/91${CONTACT_INFO.mobile}?text=${encodeURIComponent(
                  `Hello Nitin Agrawal, I just submitted a consultation request for ${topic}. My name is ${name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit phone number"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Insurance Focus
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
              >
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Child Education Planning">Child Education Planning</option>
                <option value="Retirement Planning">Retirement Planning</option>
                <option value="Family Protection">Family Protection</option>
                <option value="General Consultation">General Consultation</option>
              </select>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-teal-300" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Request Call</span>
                    <Send className="w-3.5 h-3.5 text-teal-300" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              Direct consultation with Nitin Agrawal · Jalna, Maharashtra
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
