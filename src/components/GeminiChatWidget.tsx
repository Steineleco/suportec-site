import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  MessageCircle, 
  MapPin, 
  ChevronDown, 
  AlertCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ChatMessage } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface GeminiChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking?: (category?: string) => void;
  onOpenLocation?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'model',
    text: `Olá! Sou o **Assistente Virtual da Suportec Empresa** 🛠️\n\nEstou aqui para responder suas dúvidas sobre nossos serviços especializados:\n- **Reparo de Notebooks & Desktops** (placas, telas, upgrades)\n- **Celulares & Tablets** (telas em 1h a 3h, baterias)\n- **Suporte de Campo In-Loco** (empresas e residências)\n- **Prazos, garantias de 90 a 180 dias e localização**\n\nSelecione uma dúvida frequente abaixo ou digite sua pergunta!`,
    timestamp: 'Agora',
  },
];

const SUGGESTED_QUESTIONS = [
  { label: '⏱️ Tempo de diagnóstico', query: 'Qual é o prazo para diagnóstico de um notebook ou computador no laboratório?' },
  { label: '🚗 Visita técnica na empresa', query: 'Como funciona o suporte técnico de campo presencial na minha empresa?' },
  { label: '📱 Troca de tela de celular', query: 'Quanto tempo demora a troca de tela e bateria de celular?' },
  { label: '🛡️ Garantia e Nota Fiscal', query: 'Qual a garantia oferecida pela Suportec e vocês emitem Nota Fiscal?' },
  { label: '📍 Onde fica e horários', query: 'Onde fica a assistência técnica da Suportec e qual o horário de funcionamento?' },
  { label: '🔒 Segurança dos meus dados', query: 'Meus arquivos e dados confidenciais estão seguros durante o conserto?' },
];

export const GeminiChatWidget: React.FC<GeminiChatWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
  onOpenLocation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [geminiConnected, setGeminiConnected] = useState<boolean | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check backend Gemini status on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setGeminiConnected(data.geminiConfigured);
        }
      })
      .catch(() => {
        setGeminiConnected(false);
      });
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to backend Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: newHistory.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor');
      }

      const data = await response.json();
      const replyText = data.reply || 'Recebemos sua mensagem. Nossos técnicos também estão à disposição no WhatsApp para esclarecimentos rápidos.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSimulated: data.isSimulated,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (err) {
      console.error('Erro no chat widget:', err);
      // Fallback message
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: `Estamos com alta demanda no momento, mas os procedimentos da **Suportec Empresa** são ágeis:\n\n- **Diagnóstico:** até 24h sem custo na bancada.\n- **Garantia:** 90 a 180 dias.\n- **Localização:** Av. Paulista, 1500 (Metrô Trianon-MASP).\n\nPara atendimento imediato com um técnico, utilize o botão do WhatsApp ou agende sua visita pelo site!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSimulated: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  // Helper to format text with simple markdown (bold, lists, paragraphs)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format bold text **word**
          const formattedParts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-400 mt-1 text-xs">•</span>
                <span className="flex-1 text-slate-200">{formattedParts.slice(1)}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-slate-200">
              {formattedParts}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 bg-[#0A1435] text-slate-200 text-xs py-1.5 px-3 rounded-xl border border-blue-500/40 shadow-xl flex items-center gap-2 animate-pulse hidden sm:flex">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Simule dúvidas com o Assistente Gemini</span>
          </div>
        )}

        <button
          onClick={onToggle}
          id="trigger-gemini-chat-btn"
          aria-label="Abrir assistente virtual inteligente"
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white border border-blue-400/50 shadow-blue-900/50 hover:shadow-blue-600/40 hover:scale-105 active:scale-95'
          }`}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#050A1A] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#050A1A]" />
          </div>
          <span className="font-semibold text-sm tracking-wide">
            {isOpen ? 'Fechar Assistente' : 'Dúvidas com IA'}
          </span>
          {hasNewMessage && !isOpen && (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          )}
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div
          id="gemini-chat-widget-container"
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-[#08102B] border border-blue-900/70 rounded-2xl overflow-hidden backdrop-blur-md ${
            isExpanded
              ? 'inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[540px] sm:h-[680px]'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0B173E] via-[#0E1E52] to-[#0A153A] px-4 py-3 border-b border-blue-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-md relative">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B173E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm tracking-tight">Suportec IA</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-500/20 text-cyan-300 border border-blue-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                    Gemini 3.8 Flash
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Atendente Virtual • Suporte & Procedimentos
                </p>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                title="Reiniciar conversa"
                className="p-1.5 hover:text-white hover:bg-blue-950/60 rounded-lg transition-colors"
                aria-label="Reiniciar conversa"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Reduzir tamanho' : 'Expandir janela'}
                className="p-1.5 hover:text-white hover:bg-blue-950/60 rounded-lg transition-colors hidden sm:block"
                aria-label="Expandir ou reduzir janela"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                title="Fechar assistente"
                className="p-1.5 hover:text-white hover:bg-blue-950/60 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="bg-[#050C22] px-4 py-2 border-b border-blue-950 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Simulação de dúvidas técnicas e normas da empresa</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Av. Paulista, 1500</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-blue-700/60 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-cyan-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none border border-blue-500'
                        : 'bg-[#0B173B] text-slate-200 rounded-bl-none border border-blue-900/60'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <>
                        {renderFormattedText(msg.text)}

                        {/* Smart Quick Actions based on bot content */}
                        <div className="mt-3 pt-2.5 border-t border-blue-900/50 flex flex-wrap gap-1.5">
                          {msg.text.toLowerCase().includes('agend') && (
                            <button
                              onClick={() => {
                                onToggle();
                                onOpenBooking?.();
                              }}
                              className="inline-flex items-center gap-1 text-xs bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 px-2.5 py-1 rounded-lg transition-colors"
                            >
                              <Calendar className="w-3 h-3 text-cyan-300" />
                              <span>Ir para Agendamento</span>
                            </button>
                          )}

                          {msg.text.toLowerCase().includes('whatsapp') && (
                            <a
                              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Olá! Estava tirando dúvidas com o Assistente IA da Suportec e gostaria de falar com um técnico.')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-400" />
                              <span>Falar no WhatsApp</span>
                            </a>
                          )}

                          {(msg.text.toLowerCase().includes('paulista') || msg.text.toLowerCase().includes('localiza') || msg.text.toLowerCase().includes('onde fica')) && (
                            <button
                              onClick={() => {
                                onToggle();
                                onOpenLocation?.();
                              }}
                              className="inline-flex items-center gap-1 text-xs bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 px-2.5 py-1 rounded-lg transition-colors"
                            >
                              <MapPin className="w-3 h-3 text-indigo-300" />
                              <span>Ver no Google Maps</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}

                    <div
                      className={`text-[10px] mt-1.5 ${
                        isUser ? 'text-blue-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-700/60 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-cyan-300 animate-spin" />
                </div>
                <div className="bg-[#0B173B] border border-blue-900/60 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                  <span className="text-slate-300">Suportec IA consultando procedimentos...</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Simulation Chips */}
          <div className="bg-[#060D24] px-3 py-2 border-t border-blue-950 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider shrink-0 font-medium pl-1">
              Dúvidas:
            </span>
            {SUGGESTED_QUESTIONS.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(item.query)}
                disabled={isLoading}
                className="shrink-0 text-xs bg-blue-950/70 hover:bg-blue-800/60 text-slate-200 hover:text-white px-2.5 py-1 rounded-full border border-blue-800/50 transition-colors disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Footer Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#08112E] border-t border-blue-900/60 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida sobre serviços ou procedimentos..."
              disabled={isLoading}
              className="flex-1 bg-[#04091A] border border-blue-900/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white disabled:text-slate-500 flex items-center justify-center transition-all shadow-md shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
