import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  Clock, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  Building2,
  Car,
  Compass,
  Train
} from 'lucide-react';

export const GoogleMapsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState(COMPANY_INFO.fullAddress);
  const [mapAddressQuery, setMapAddressQuery] = useState('Av. Paulista, 1500 - Bela Vista, São Paulo - SP');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(customAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setMapAddressQuery(customAddress);
    setIsEditingAddress(false);
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddressQuery)}`;
  const searchMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddressQuery)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddressQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="localizacao" className="py-20 bg-[#060B1E] border-t border-blue-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Localização & Acesso Fácil
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Venha ao Nosso Laboratório
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Localização privilegiada no coração de São Paulo, de fácil acesso por metrô, ônibus ou carro com estacionamento no local.
          </p>
        </div>

        {/* Two-Column Layout: Info Card + Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address & Details Card */}
          <div className="lg:col-span-5 bg-[#0A122E] border border-blue-800/40 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header with quick edit option */}
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-sky-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Sede Suportec Empresa</h3>
                    <span className="text-xs text-slate-400">Laboratório e Recepção Balcão</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 underline"
                  title="Personalizar endereço para exibição"
                >
                  {isEditingAddress ? 'Fechar' : 'Alterar Endereço'}
                </button>
              </div>

              {/* Form to edit address if desired */}
              {isEditingAddress && (
                <form onSubmit={handleUpdateAddress} className="p-3 bg-blue-950/60 rounded-xl border border-blue-800/50 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Definir endereço da sua unidade:
                  </label>
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    className="w-full bg-[#070D22] border border-blue-900/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                    placeholder="Ex: Av. Paulista, 1500 - São Paulo, SP"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold"
                    >
                      Atualizar Mapa
                    </button>
                  </div>
                </form>
              )}

              {/* Physical Address Block */}
              <div className="bg-[#070D22] border border-blue-900/50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white leading-snug">
                      {customAddress}
                    </p>
                    <p className="text-xs text-slate-400">
                      Edifício Paulista Corporate • 1º Andar • Sala 102
                    </p>
                  </div>
                </div>

                {/* Quick Copy Button */}
                <div className="mt-3.5 pt-3 border-t border-blue-950 flex items-center justify-between">
                  <span className="text-xs text-slate-400">CEP: 01310-200</span>
                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                    id="btn-copy-address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Endereço Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Endereço</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Points of Reference & Accessibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#080F29] border border-blue-900/40 rounded-xl flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Metrô Trianon-MASP</strong>
                    <span className="text-slate-400 text-[11px]">Apenas 2 minutos a pé (150m)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#080F29] border border-blue-900/40 rounded-xl flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Estacionamento</strong>
                    <span className="text-slate-400 text-[11px]">Conveniado no subsolo</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-3.5 bg-blue-950/30 border border-blue-900/40 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-sky-400 font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Horários de Atendimento no Balcão</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Segunda a Sexta:</span>
                  <strong className="text-white">08:30 às 18:30</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Sábado:</span>
                  <strong className="text-white">09:00 às 13:30</strong>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-blue-950">
                  <span>Domingo / Feriados:</span>
                  <span className="text-amber-400">Plantão de campo para empresas</span>
                </div>
              </div>

            </div>

            {/* Direct Map Action Buttons */}
            <div className="pt-6 mt-6 border-t border-blue-900/40 space-y-2.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                id="btn-tracar-rota-maps"
              >
                <Navigation className="w-4 h-4" />
                <span>Traçar Rota no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                  className="py-2.5 px-3 bg-[#080E24] hover:bg-blue-950 text-slate-200 border border-blue-900/50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ligar: {COMPANY_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Estou a caminho da loja física da Suportec e gostaria de tirar uma dúvida.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#080E24] hover:bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Google Maps Interactive Window */}
          <div className="lg:col-span-7 bg-[#0A122E] border border-blue-800/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Map Top Bar */}
            <div className="bg-[#080E24] px-4 py-3 border-b border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-white">Google Maps Interativo</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 truncate max-w-[200px] sm:max-w-xs">{mapAddressQuery}</span>
              </div>

              <a
                href={searchMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Tela cheia</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Maps Iframe */}
            <div className="w-full flex-1 min-h-[380px] sm:min-h-[440px] relative bg-slate-900">
              <iframe
                title="Localização Suportec Empresa no Google Maps"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.05]"
              />
            </div>

            {/* Map Bottom Helper Bar */}
            <div className="bg-[#070D22] px-4 py-2.5 border-t border-blue-900/40 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Dica: Você pode dar zoom, alternar para satélite ou arrastar o mapa.
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-semibold"
              >
                Abrir navegação GPS no celular &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
