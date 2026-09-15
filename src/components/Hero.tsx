import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Laptop, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: (category?: string) => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectService, onOpenBooking, onOpenChat }) => {
  const quickCategories = [
    {
      id: 'notebooks',
      name: 'Notebooks',
      category: 'notebook',
      icon: Laptop,
      desc: 'Telas, placas, upgrades e carcaças',
      badge: 'Mais buscado',
    },
    {
      id: 'desktops',
      name: 'Desktops & Gamer',
      category: 'desktop',
      icon: Monitor,
      desc: 'Fontes, GPUs, montagem e limpeza',
      badge: 'Alta Potência',
    },
    {
      id: 'smartphones',
      name: 'Celulares',
      category: 'smartphone',
      icon: Smartphone,
      desc: 'Telas, baterias e conectores',
      badge: 'Rápido',
    },
    {
      id: 'tablets',
      name: 'Tablets & iPads',
      category: 'tablet',
      icon: Tablet,
      desc: 'Vidro touch, displays e botões',
      badge: 'Precisão',
    },
    {
      id: 'suporte-campo',
      name: 'Suporte de Campo',
      category: 'field_support',
      icon: Truck,
      desc: 'Visita técnica in-loco agendada',
      badge: 'Empresas e Home',
      highlight: true,
    },
  ];

  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#050A1A] via-[#070E24] to-[#091436]">
      {/* Subtle tech grid background with blue ambient glow */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px), linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Laboratório Especializado & Suporte Presencial Agendado</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.15]">
              Soluções Técnicas para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                Notebooks, Desktops, Celulares e Tablets
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A <strong className="text-white font-semibold">Suportec Empresa</strong> oferece assistência técnica corporativa e residencial de excelência. Atendemos você em nosso laboratório próprio ou enviamos um técnico especializado até o seu endereço mediante agendamento prévio.
            </p>

            {/* Key Trust Signals Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/40 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Garantia de 90 a 180 dias</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/40 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orçamento sem surpresas</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/40 px-3 py-1.5 rounded-lg">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Visita Técnica In-Loco</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2.5 group"
                id="hero-agendar-cta"
              >
                <span>Agendar Reparo ou Visita</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-blue-900/80 hover:from-blue-900 hover:to-indigo-900 border border-blue-500/40 text-cyan-300 hover:text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50"
                  id="hero-chat-gemini-cta"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Dúvidas com Suportec IA</span>
                </button>
              )}

              <a
                href="#localizacao"
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 hover:text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                id="hero-maps-cta"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Como Chegar</span>
              </a>
            </div>

            {/* Fast WhatsApp helper link */}
            <div className="mt-4 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <span>Dúvida urgente? Fale com a bancada técnica:</span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá, preciso de um orçamento rápido para reparo!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{COMPANY_INFO.whatsappFormatted}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Service Deck */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B1536]/80 backdrop-blur-md rounded-2xl border border-blue-800/40 p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/40 mb-4">
                <div>
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    Qual dispositivo precisa de reparo?
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Selecione para ver soluções ou iniciar agendamento</p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-1 rounded border border-blue-800/60">
                  Suportec
                </span>
              </div>

              {/* Service Cards Grid */}
              <div className="space-y-2.5">
                {quickCategories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectService(item.id)}
                      className={`group p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        item.highlight
                          ? 'bg-blue-950/70 border-blue-500/50 hover:border-blue-400 hover:bg-blue-900/60'
                          : 'bg-[#080E24]/60 border-blue-900/30 hover:border-blue-700/60 hover:bg-[#0C163D]'
                      }`}
                      id={`hero-card-${item.id}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-lg shrink-0 ${
                          item.highlight 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                            : 'bg-blue-950 text-blue-400 border border-blue-800/40 group-hover:text-white group-hover:bg-blue-700'
                        } transition-colors`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                              {item.name}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              item.highlight 
                                ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30' 
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      <div className="text-slate-500 group-hover:text-blue-300 group-hover:translate-x-1 transition-all pl-2 shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Status */}
              <div className="mt-5 pt-4 border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Orçamentos em até 24h
                </span>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-blue-400 hover:text-blue-300 font-semibold underline text-xs"
                >
                  Abrir agendamento direto &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Numbers Strip */}
        <div className="mt-16 pt-10 border-t border-blue-900/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              +8.500
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Aparelhos Reparados</span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight">
              98.7%
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Índice de Satisfação</span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              180 Dias
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Garantia em Serviços</span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
              In-Loco
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Técnicos de Campo Credenciados</span>
          </div>
        </div>

      </div>
    </section>
  );
};
