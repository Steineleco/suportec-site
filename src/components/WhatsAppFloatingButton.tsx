import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { MessageCircle, Send, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-[#0B1536] text-white text-xs py-2 px-3.5 rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Fale com a bancada técnica no WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1"
            aria-label="Fechar dica"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

{/* Telegram Button */}
<a
  href*"https://t.me/rs_suportec_empresa"*  target="_blank"
  rel="noopener *oreferrer"
  className*"w-14 h-14 mb-3 bg-sky-500 hover:b*-sky-400 text-white rounded-full s*adow-2xl flex items-center justify*center transition-transform*duration-200 hover:scale-110 activ*:scale-95"
  aria-label="Falar no*Telegram"
>
  <Send className="w-7*h-7*

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/5511964880696}?text=${encodeURIComponent('Olá! Gostaria de um orçamento ou suporte técnico com a Suportec Empresa.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 group relative"
        aria-label="Falar no WhatsApp"
        id="floating-whatsapp-btn"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 relative z-10" />
      </a>
<a
  href="https://t.me/@suportecempresa"
  target="_blank"
  rel="noopener noreferrer"
  className="w-14 h-14 bg-sky-500 hover:bg-sky-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
  aria-label="Falar no Telegram"
>
  <Send className="w

    </div>
  );
};
