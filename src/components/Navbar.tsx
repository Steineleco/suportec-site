import React, { useState, useEffect } from 'react';
import { SuportecLogo } from './SuportecLogo';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Calendar, 
  MessageSquare,
  Wrench,
  Laptop,
  Truck,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (category?: string) => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenChat }) => {
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
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Suporte de Campo', href: '#suporte-campo' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Agendamento', href: '#agendamento' },
    { label: 'Onde Estamos', href: '#localizacao' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Corporate Info Bar */}
      <div className="bg-[#050B1D] text-slate-300 text-xs border-b border-blue-950/80 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.workingHoursWeekday}</span>
            </span>
            <a 
              href="#localizacao" 
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Av. Paulista, 1500 - Bela Vista, SP (Próximo ao Metrô Trianon-Masp)</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Atendimento Online Ativo
            </span>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-blue-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`px-4 sm:px-6 lg:px-8 transition-all duration-200 ${
          isScrolled 
            ? 'bg-[#080E24]/95 backdrop-blur-md shadow-xl border-b border-blue-900/40 py-2.5' 
            : 'bg-[#080E24]/85 backdrop-blur-sm border-b border-blue-900/30 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with link to top */}
          <a href="#inicio" className="flex items-center" aria-label="Suportec Empresa - Início">
            <SuportecLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-blue-300 hover:bg-blue-950/40 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Assistant Quick Simulation */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 rounded-lg transition-all shadow-sm"
                id="nav-gemini-chat-btn"
                title="Tirar dúvidas sobre serviços com IA"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dúvidas IA</span>
              </button>
            )}

            {/* WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de informações sobre suporte e reparo da Suportec Empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-lg transition-all"
              id="nav-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-600/30 rounded-lg transition-all duration-200"
              id="nav-agendar-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Reparo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-lg lg:hidden"
            aria-label="Abrir menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D22] border-b border-blue-900/50 px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-200 hover:text-blue-300 hover:bg-blue-950/60 rounded-xl transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-blue-900/40 flex flex-col gap-2.5">
              {onOpenChat && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 text-cyan-300 border border-blue-500/40 font-semibold rounded-xl text-sm shadow-md"
                  id="mobile-nav-chat"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Tirar Dúvidas com Suportec IA (Gemini)</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25"
                id="mobile-nav-agendar"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Atendimento</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar com um técnico da Suportec Empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 font-semibold rounded-xl text-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Conversar no WhatsApp ({COMPANY_INFO.whatsappFormatted})</span>
              </a>

              <a
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 px-3 flex items-center justify-center gap-2 text-slate-400 text-xs hover:text-slate-200"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Ver Endereço no Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
