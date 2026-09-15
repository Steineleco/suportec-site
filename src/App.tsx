/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FieldSupportSection } from './components/FieldSupportSection';
import { BookingSection } from './components/BookingSection';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { TrustAndReviews } from './components/TrustAndReviews';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { GeminiChatWidget } from './components/GeminiChatWidget';

export default function App() {
  const [activeBookingCategory, setActiveBookingCategory] = useState<string>('notebook');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const handleOpenLocation = () => {
    const locEl = document.getElementById('localizacao');
    if (locEl) {
      locEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (category?: string) => {
    if (category) {
      setActiveBookingCategory(category);
    }
    const bookingEl = document.getElementById('agendamento');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    const categoryMap: Record<string, string> = {
      'notebooks': 'notebook',
      'desktops': 'desktop',
      'smartphones': 'smartphone',
      'tablets': 'tablet',
      'suporte-campo': 'field_support',
    };

    const targetCategory = categoryMap[serviceId] || 'notebook';
    setActiveBookingCategory(targetCategory);

    // Scroll to services or booking
    const targetEl = document.getElementById(serviceId === 'suporte-campo' ? 'suporte-campo' : 'servicos');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050A1A] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Fixed Navbar with brand logo & navigation */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        onOpenChat={handleOpenChat}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero 
          onSelectService={handleSelectService} 
          onOpenBooking={handleOpenBooking} 
          onOpenChat={handleOpenChat}
        />

        {/* 2. Services Section (Notebooks, Desktops, Celulares, Tablets, Suporte de Campo) */}
        <ServicesSection 
          onSelectServiceForBooking={(cat) => handleOpenBooking(cat)}
        />

        {/* 3. Dedicated Field Support (In-Loco Atendimento Agendado) */}
        <FieldSupportSection 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 4. Trust, Workflow Steps & Customer Testimonials */}
        <TrustAndReviews />

        {/* 5. Online Appointment & Quote Request Tool */}
        <BookingSection 
          key={activeBookingCategory}
          initialCategory={activeBookingCategory} 
        />

        {/* 6. Google Maps Section (Endereço, Mapa Interativo, Como Chegar) */}
        <GoogleMapsSection />

        {/* 7. Frequently Asked Questions */}
        <FAQSection onOpenChat={handleOpenChat} />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Interactive Gemini AI Simulation Chat Widget */}
      <GeminiChatWidget
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
        onOpenBooking={handleOpenBooking}
        onOpenLocation={handleOpenLocation}
      />

      {/* Floating 1-Click WhatsApp Support Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
