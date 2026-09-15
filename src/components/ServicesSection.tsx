import React, { useState } from 'react';
import { SERVICES_LIST, COMPANY_INFO } from '../data/companyData';
import { ServiceItem } from '../types';
import { 
  Laptop, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Shield, 
  ArrowRight,
  MessageSquare,
  Wrench,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (category: string) => void;
  activeFilter?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceForBooking,
  activeFilter = 'all'
}) => {
  const [currentFilter, setCurrentFilter] = useState<string>(activeFilter);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Laptop': return Laptop;
      case 'Monitor': return Monitor;
      case 'Smartphone': return Smartphone;
      case 'Tablet': return Tablet;
      case 'Truck': return Truck;
      default: return Wrench;
    }
  };

  const filterTabs = [
    { id: 'all', label: 'Todos os Serviços' },
    { id: 'notebook', label: 'Notebooks', icon: Laptop },
    { id: 'desktop', label: 'Desktops & PCs', icon: Monitor },
    { id: 'smartphone', label: 'Celulares', icon: Smartphone },
    { id: 'tablet', label: 'Tablets & iPads', icon: Tablet },
    { id: 'field_support', label: 'Suporte de Campo', icon: Truck },
  ];

  const filteredServices = currentFilter === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === currentFilter);

  return (
    <section id="servicos" className="py-20 bg-[#060B1E] border-t border-b border-blue-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Especialidades Suportec
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Serviços Técnicos Especializados
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Reparo com bancada equipada com proteção antiestática ESD, instrumental de precisão e técnicos capacitados para resolver desde problemas cotidianos a falhas complexas de placa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentFilter(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                    : 'bg-[#0B1536]/70 text-slate-300 hover:text-white hover:bg-blue-900/40 border border-blue-900/30'
                }`}
                id={`filter-btn-${tab.id}`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.iconName);
            const isFieldSupport = service.category === 'field_support';

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
                  isFieldSupport
                    ? 'bg-gradient-to-b from-[#0F2050] to-[#081230] border-blue-500/60 shadow-xl shadow-blue-950/50'
                    : 'bg-[#09122C]/90 hover:bg-[#0C1738] border-blue-900/40 hover:border-blue-700/60 shadow-lg'
                }`}
                id={`service-card-${service.id}`}
              >
                {/* Accent top banner */}
                <div className={`h-1.5 w-full ${isFieldSupport ? 'bg-gradient-to-r from-amber-400 via-sky-400 to-blue-500' : 'bg-blue-600'}`} />

                <div className="p-6">
                  {/* Top Bar with Badge & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      isFieldSupport 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-blue-950/80 text-blue-400 border border-blue-800/50 group-hover:bg-blue-600 group-hover:text-white transition-colors'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isFieldSupport
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                    }`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Key Common Problems bullet list */}
                  <div className="mt-5 pt-4 border-t border-blue-900/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                      Defeitos Mais Comuns:
                    </h4>
                    <ul className="space-y-1.5">
                      {service.commonProblems.slice(0, 3).map((problem, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span className="line-clamp-2">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time & Warranty badges */}
                  <div className="mt-5 pt-4 border-t border-blue-900/30 flex flex-col gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{service.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-medium">{service.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 mt-2 space-y-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service.category)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      isFieldSupport
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                        : 'bg-blue-900/50 hover:bg-blue-600 text-white border border-blue-700/50'
                    }`}
                    id={`btn-agendar-${service.id}`}
                  >
                    <span>{isFieldSupport ? 'Agendar Visita Técnica' : 'Agendar Reparo'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Olá Suportec! Gostaria de tirar dúvidas sobre ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dúvida rápida no WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
