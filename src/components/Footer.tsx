import React from 'react';
import { SuportecLogo } from './SuportecLogo';
import { COMPANY_INFO } from '../data/companyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040816] text-slate-300 border-t border-blue-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-950/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <SuportecLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Assistência técnica corporativa e especializada em reparo de notebooks, computadores desktops e gamer, celulares smartphones, tablets e suporte técnico presencial de campo sob agendamento.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-sky-400">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>CNPJ: {COMPANY_INFO.cnpj} • Laboratório ESD Certificado</span>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Serviços Especializados
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#servicos" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Reparo em Notebooks</span>
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Reparo em Desktops & Gamer</span>
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Conserto de Celulares (Smartphones)</span>
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Conserto de Tablets & iPads</span>
                </a>
              </li>
              <li>
                <a href="#suporte-campo" className="text-sky-300 font-semibold hover:text-sky-200 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                  <span>Suporte Técnico de Campo (In-Loco)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Schedules */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#inicio" className="text-slate-400 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-slate-400 hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#agendamento" className="text-slate-400 hover:text-white transition-colors">
                  Agendar Atendimento
                </a>
              </li>
              <li>
                <a href="#localizacao" className="text-slate-400 hover:text-white transition-colors">
                  Onde Estamos (Google Maps)
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact and Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Endereço & Contato
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <a 
                href="#localizacao" 
                className="flex items-start gap-2 text-slate-300 hover:text-blue-300 transition-colors"
              >
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.fullAddress}</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`} className="hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da Suportec Empresa.')}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  WhatsApp: {COMPANY_INFO.whatsappFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">
                  {COMPANY_INFO.workingHoursWeekday} | {COMPANY_INFO.workingHoursSaturday}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Suportec Empresa - Serviços Técnicos. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Garantia</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacidade LGPD</span>
            <span>•</span>
            <a href="#inicio" className="text-blue-400 hover:text-blue-300 font-medium">
              Voltar ao topo ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
