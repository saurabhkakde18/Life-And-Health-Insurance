/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerInsurers } from './components/PartnerInsurers';
import { AboutAdvisor } from './components/AboutAdvisor';
import { InsuranceServices } from './components/InsuranceServices';
import { LifeStages } from './components/LifeStages';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DarkCtaBanner } from './components/DarkCtaBanner';
import { PlanningTools } from './components/PlanningTools';
import { EnquiryForm } from './components/EnquiryForm';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState<string>('General Enquiry');
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<string>('Life Insurance');
  const [formNotes, setFormNotes] = useState<string>('');

  const handleOpenConsultation = (topic: string = 'General Consultation') => {
    setModalTopic(topic);
    setModalOpen(true);
  };

  const handleExplorePlans = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedRequirement(serviceTitle);
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStage = (stageTitle: string) => {
    setSelectedRequirement(stageTitle);
    setFormNotes(`Interested in milestone planning for: ${stageTitle}`);
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanEnquiry = (planName: string, details?: string) => {
    setSelectedRequirement(planName);
    if (details) {
      setFormNotes(`Planning Assessment details: ${details}`);
    }
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTalkToAdvisor = () => {
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onExplorePlans={handleExplorePlans}
        />

        {/* Official Insurer Partners Strip (LIC & Care Health) */}
        <PartnerInsurers />

        {/* 2. Business Introduction & Advisor Profile */}
        <AboutAdvisor onOpenConsultation={handleOpenConsultation} />

        {/* 3. Insurance Services (Two Flagship Cards) */}
        <InsuranceServices onSelectService={handleSelectService} />

        {/* 4. Feature / Benefit: Insurance Solutions for Every Stage of Life (4 Cards) */}
        <LifeStages onSelectStage={handleSelectStage} />

        {/* 5. How It Works (4-Step Process) */}
        <HowItWorks onStartProcess={() => handleOpenConsultation('Getting Started')} />

        {/* 6. Why Choose LifeExpress? (6 Feature Cards) */}
        <WhyChooseUs />

        {/* 7. Insurance Planning Dark-Blue Section */}
        <DarkCtaBanner onTalkToAdvisor={handleTalkToAdvisor} />

        {/* 8. Quick Planning Tools (Interactive Assessment) */}
        <PlanningTools onSelectPlanEnquiry={handlePlanEnquiry} />

        {/* 9. Customer Enquiry Form */}
        <EnquiryForm
          initialRequirement={selectedRequirement}
          initialNotes={formNotes}
        />

        {/* 10. Contact Section & Jalna Office Map */}
        <ContactSection />

        {/* 11. FAQ Accordion */}
        <FaqSection />

        {/* 12. Regulatory Disclaimer */}
        <DisclaimerBanner />
      </main>

      {/* Footer (contains the exclusive Admin Portal login / setup link) */}
      <Footer onOpenAdminPortal={() => setAdminPortalOpen(true)} />

      {/* Floating WhatsApp and Mobile Quick Actions */}
      <FloatingActions />

      {/* Quick Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTopic={modalTopic}
      />

      {/* Admin Portal (Accessible exclusively from Footer) */}
      <AdminPortal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />
    </div>
  );
}
