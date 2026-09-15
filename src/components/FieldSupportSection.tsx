import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Truck, 
  Wifi, 
  Server, 
  Printer, 
  Briefcase, 
  CalendarCheck, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';

interface FieldSupportSectionProps {
  onOpenBooking: (category?: string) => void;
}

export const FieldSupportSection: React.FC<FieldSupportSectionProps> = ({ onOpenBooking }) => {
  const fieldCapabilities = [
    {
      icon: Wifi,
      title: 'Redes Wi-Fi & Cabeamento',
      desc: 'Eliminação de pontos cegos, roteadores Mesh, cabeamento estruturado Cat6 e switches gigabit.',
    },
    {
      icon: Server,
      title: 'Servidores & Compartilhamento',
      desc: 'Servidores locais de arquivos, controle de permissões de usuários e rotinas de backup automáticas.',
    },
    {
      icon: Printer,
      title: 'Impressoras & Periféricos',
      desc: 'Configuração de impressoras em rede, scanners de alta velocidade e digitalização integrada.',
    },
    {
      icon: Briefcase,
      title: 'Parque de Máquinas & Desktops',
      desc: 'Manutenção preventiva periódica para empresas, formatação padronizada e upgrades em lote.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Agendamento Online',
      desc: 'Escolha a data, o turno e descreva a demanda pelo nosso formulário ou WhatsApp.',
    },
    {
      step: '02',
      title: 'Deslocamento Técnico',
      desc: 'Técnico credenciado e uniformizado chega ao endereço com kit completo de instrumental.',
    },
    {
      step: '03',
      title: 'Resolução No Local',
      desc: 'Diagnóstico e reparo imediato na sua infraestrutura, sem você precisar tirar nada do lugar.',
    },
    {
      step: '04',
      title: 'Relatório & Garantia',
      desc: 'Emissão de relatório técnico de visita e garantia assegurada pela Suportec Empresa.',
    },
  ];

  return (
    <section id="suporte-campo" className="py-20 bg-gradient-to-b from-[#070E24] via-[#091538] to-[#060B1E] text-white relative overflow-hidden">
      {/* Background graphic elements */}
      <div className="absolute -right-20 top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-3">
              <Truck className="w-3.5 h-3.5" />
              <span>Atendimento Corporativo & Residencial In-Loco</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Suporte Técnico de Campo:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                A Suportec Vai Até Você
              </span>
            </h2>

            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Não desmonte seus computadores nem interrompa a produtividade do seu negócio. Nossa equipe de campo realiza visitas técnicas programadas para diagnosticar e resolver problemas de hardware, sistemas, roteadores e infraestrutura diretamente no local.
            </p>

            {/* Quick Badges */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sem necessidade de transporte de máquinas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hora marcada com pontualidade</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Profissionais com crachá e EPIs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendimento avulso ou contratos mensais</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking('field_support')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                id="cta-agendar-campo"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Agendar Visita Técnica Agora</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá Suportec! Gostaria de agendar uma visita técnica no meu endereço/empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-sm flex items-center gap-2"
              >
                <span>Consultar Disponibilidade Hoje</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fieldCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={index}
                  className="p-5 rounded-xl bg-[#0B1536]/80 border border-blue-800/40 hover:border-blue-500/50 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-900/60 border border-blue-700/40 flex items-center justify-center text-sky-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">{cap.title}</h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Timeline */}
        <div className="mt-16 pt-12 border-t border-blue-900/40">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Como Funciona a Visita de Campo
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Processo padronizado para total transparência e tranquilidade do cliente
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((s, idx) => (
              <div 
                key={idx}
                className="relative bg-[#09122E]/80 border border-blue-900/50 p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-blue-500/40 block mb-2 font-mono">
                    {s.step}
                  </span>
                  <h4 className="text-base font-bold text-white">{s.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-900/30 flex items-center gap-1 text-[11px] text-sky-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Procedimento Seguro</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
