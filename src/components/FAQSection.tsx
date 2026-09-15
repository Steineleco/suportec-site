import React, { useState } from 'react';
import { FAQ_LIST, COMPANY_INFO } from '../data/companyData';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  onOpenChat?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenChat }) => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-[#060B1E] border-t border-blue-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Tudo o que você precisa saber sobre nossos reparos, visita de campo e garantias.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#0A122E] border border-blue-900/40 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-blue-950/40 transition-colors"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-950/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt to speak directly */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-950/50 border border-blue-800/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-white text-sm">Ainda com alguma dúvida específica?</h4>
            <p className="text-xs text-slate-300 mt-0.5">Tire dúvidas imediatas com nossa IA ou fale diretamente no WhatsApp.</p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-4 py-2.5 bg-blue-700/80 hover:bg-blue-600 text-cyan-200 hover:text-white border border-blue-500/40 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Simular com Suportec IA</span>
              </button>
            )}

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre os serviços da Suportec Empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar com Técnico</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
