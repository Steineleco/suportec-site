import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { DeviceCategory, ServiceModality, AppointmentFormData, BookingConfirmation } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Tablet, 
  Truck, 
  MessageSquare, 
  Send,
  User,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface BookingSectionProps {
  initialCategory?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ initialCategory = 'notebook' }) => {
  const [modality, setModality] = useState<ServiceModality>(
    initialCategory === 'field_support' ? 'field_support' : 'laboratory'
  );

  const [category, setCategory] = useState<DeviceCategory>(
    (initialCategory as DeviceCategory) || 'notebook'
  );

  const [formData, setFormData] = useState<AppointmentFormData>({
    customerName: '',
    phone: '',
    email: '',
    category: (initialCategory as DeviceCategory) || 'notebook',
    deviceModel: '',
    modality: initialCategory === 'field_support' ? 'field_support' : 'laboratory',
    problemSummary: '',
    preferredDate: '',
    preferredPeriod: 'morning',
    addressStreet: '',
    addressNeighborhood: '',
    notes: '',
  });

  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  const deviceTypes = [
    { id: 'notebook', label: 'Notebook', icon: Laptop },
    { id: 'desktop', label: 'Desktop / PC', icon: Monitor },
    { id: 'smartphone', label: 'Celular', icon: Smartphone },
    { id: 'tablet', label: 'Tablet / iPad', icon: Tablet },
    { id: 'field_support', label: 'Rede / Infra', icon: Truck },
  ];

  const commonSymptomQuickSelect = {
    notebook: ['Tela quebrada/listras', 'Não liga ou desliga', 'Superaquecimento/Barulho', 'Lentidão/Formatação', 'Teclado com falhas'],
    desktop: ['Não dá vídeo / Bips', 'Desliga em jogos', 'Fonte queimada', 'Limpeza preventiva', 'Upgrade SSD/Memória'],
    smartphone: ['Display trincado', 'Bateria descarrega rápido', 'Conector de carga', 'Caiu na água', 'Travado na logo'],
    tablet: ['Vidro touch quebrado', 'Bateria estufada', 'Não liga', 'Botão power afundado', 'Conector danificado'],
    field_support: ['Wi-Fi caindo/Instável', 'Impressora sem conectar', 'Servidor inacessível', 'Manutenção empresarial', 'Cabeamento estruturado'],
  };

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickSymptomClick = (symptom: string) => {
    setFormData(prev => {
      const current = prev.problemSummary ? prev.problemSummary.split(', ') : [];
      if (current.includes(symptom)) {
        return { ...prev, problemSummary: current.filter(s => s !== symptom).join(', ') };
      } else {
        return { ...prev, problemSummary: [...current, symptom].join(', ') };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      alert('Por favor, preencha seu nome e telefone para contato.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocolCode = `SPT-${new Date().getFullYear()}-${randomNum}`;

    const newBooking: BookingConfirmation = {
      protocol: protocolCode,
      formData: {
        ...formData,
        modality,
        category,
      },
      submittedAt: new Date().toLocaleString('pt-BR'),
    };

    setConfirmation(newBooking);
  };

  const generateWhatsAppMessage = () => {
    if (!confirmation) return '';
    const { formData: d, protocol } = confirmation;
    const modalityText = d.modality === 'field_support' 
      ? 'Visita Técnica de Campo (In-Loco)' 
      : 'Atendimento no Balcão (Laboratório)';

    const msg = `*Solicitação de Agendamento - Suportec Empresa*\n` +
      `*Protocolo:* ${protocol}\n\n` +
      `*Cliente:* ${d.customerName}\n` +
      `*Telefone:* ${d.phone}\n` +
      `*Modalidade:* ${modalityText}\n` +
      `*Dispositivo:* ${d.category.toUpperCase()} - ${d.deviceModel || 'Não especificado'}\n` +
      `*Defeito/Necessidade:* ${d.problemSummary || 'A ser avaliado'}\n` +
      `*Data Preferencial:* ${d.preferredDate || 'A combinar'} (${d.preferredPeriod === 'morning' ? 'Manhã' : d.preferredPeriod === 'afternoon' ? 'Tarde' : 'Comercial'})\n` +
      (d.modality === 'field_support' && d.addressStreet ? `*Endereço:* ${d.addressStreet}, ${d.addressNeighborhood || ''}\n` : '') +
      `\nAguardo confirmação da equipe técnica!`;

    return encodeURIComponent(msg);
  };

  const copyProtocolToClipboard = () => {
    if (confirmation?.protocol) {
      navigator.clipboard.writeText(confirmation.protocol);
      setCopiedProtocol(true);
      setTimeout(() => setCopiedProtocol(false), 3000);
    }
  };

  return (
    <section id="agendamento" className="py-20 bg-[#070D22] border-t border-blue-900/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Agendamento Rápido & Sem Compromisso
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Agende seu Reparo ou Visita Técnica
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Escolha se prefere levar seu aparelho ao nosso balcão ou receber um técnico qualificado no seu endereço.
          </p>
        </div>

        {/* If Confirmation is Active */}
        {confirmation ? (
          <div className="bg-[#0B1536] border border-blue-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Agendamento Registrado com Sucesso!
              </span>

              <h3 className="text-2xl font-extrabold text-white mt-1">
                Protocolo: <span className="text-sky-400 font-mono">{confirmation.protocol}</span>
              </h3>

              <p className="text-xs text-slate-300 mt-2">
                Guarde seu protocolo. Nossa equipe técnica já recebeu a sua solicitação e entrará em contato para confirmação.
              </p>

              {/* Protocol copy box */}
              <div className="mt-5 p-3 bg-blue-950/70 border border-blue-800/60 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400">Código de Acompanhamento:</span>
                <button
                  onClick={copyProtocolToClipboard}
                  className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors bg-blue-900/60 px-3 py-1.5 rounded-lg border border-blue-700/50"
                >
                  {copiedProtocol ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Protocolo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Card */}
              <div className="mt-6 text-left bg-[#070E24] border border-blue-900/50 rounded-xl p-4 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between border-b border-blue-950 pb-1.5">
                  <span className="text-slate-400">Cliente:</span>
                  <strong className="text-white">{confirmation.formData.customerName}</strong>
                </div>
                <div className="flex justify-between border-b border-blue-950 pb-1.5">
                  <span className="text-slate-400">Contato:</span>
                  <span className="text-white">{confirmation.formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-blue-950 pb-1.5">
                  <span className="text-slate-400">Modalidade:</span>
                  <span className="text-sky-300 font-semibold">
                    {confirmation.formData.modality === 'field_support' ? 'Visita Técnica In-Loco' : 'Balcão (Laboratório Paulista)'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-blue-950 pb-1.5">
                  <span className="text-slate-400">Dispositivo:</span>
                  <span className="text-white">{confirmation.formData.category.toUpperCase()} - {confirmation.formData.deviceModel || 'Não especificado'}</span>
                </div>
                {confirmation.formData.problemSummary && (
                  <div className="flex justify-between border-b border-blue-950 pb-1.5">
                    <span className="text-slate-400">Defeito relatado:</span>
                    <span className="text-amber-300 text-right">{confirmation.formData.problemSummary}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Data Preferencial:</span>
                  <span className="text-white">{confirmation.formData.preferredDate || 'A combinar'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm"
                  id="btn-confirm-whatsapp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Protocolo no WhatsApp Oficial</span>
                </a>

                <button
                  onClick={() => setConfirmation(null)}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm"
                >
                  Novo Agendamento
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* The Interactive Booking Form */
          <form 
            onSubmit={handleSubmit}
            className="bg-[#0B1536]/90 backdrop-blur-md border border-blue-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            {/* Step 1: Modality Switch (Balcão vs Visita de Campo) */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                1. Onde você prefere o atendimento?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setModality('laboratory');
                    handleInputChange('modality', 'laboratory');
                  }}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                    modality === 'laboratory'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                      : 'bg-[#080E24] text-slate-300 border-blue-900/40 hover:border-blue-700 hover:bg-[#0A122E]'
                  }`}
                  id="modality-lab"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${modality === 'laboratory' ? 'bg-blue-700 text-white' : 'bg-blue-950 text-blue-400'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold">Levar ao Balcão da Loja</strong>
                    <span className="text-xs opacity-90 block mt-0.5">
                      Av. Paulista, 1500 - Próx. Metrô Trianon. Diagnóstico rápido e recepção técnica.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModality('field_support');
                    handleInputChange('modality', 'field_support');
                  }}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                    modality === 'field_support'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                      : 'bg-[#080E24] text-slate-300 border-blue-900/40 hover:border-blue-700 hover:bg-[#0A122E]'
                  }`}
                  id="modality-field"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${modality === 'field_support' ? 'bg-blue-700 text-white' : 'bg-blue-950 text-amber-400'}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold">Suporte de Campo (In-Loco)</strong>
                    <span className="text-xs opacity-90 block mt-0.5">
                      Técnico credenciado vai até seu endereço/empresa no dia e horário agendados.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Device Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                2. Qual equipamento necessita de assistência?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {deviceTypes.map(d => {
                  const Icon = d.icon;
                  const isSelected = category === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setCategory(d.id as DeviceCategory);
                        handleInputChange('category', d.id);
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        isSelected
                          ? 'bg-blue-600/30 border-sky-400 text-white shadow-md'
                          : 'bg-[#080E24] border-blue-900/30 text-slate-400 hover:text-white hover:bg-blue-950/40'
                      }`}
                      id={`device-type-${d.id}`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-sky-300' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold">{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Model & Symptoms */}
            <div className="mb-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Modelo / Marca do Dispositivo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Dell Inspiron 15, iPhone 13 Pro, Samsung Galaxy Tab S8, PC Gamer Ryzen..."
                  value={formData.deviceModel}
                  onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                  className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  id="input-device-model"
                />
              </div>

              {/* Quick Problem Pills */}
              <div>
                <span className="block text-xs text-slate-400 mb-2">Selecione os defeitos mais comuns:</span>
                <div className="flex flex-wrap gap-2">
                  {commonSymptomQuickSelect[category]?.map((symptom, idx) => {
                    const isSelected = formData.problemSummary.includes(symptom);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickSymptomClick(symptom)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-blue-950/40 border-blue-900/50 text-slate-300 hover:text-white hover:bg-blue-900/50'
                        }`}
                      >
                        {symptom}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Problem Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Descreva o problema com suas palavras:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: O aparelho estava esquentando muito e parou de ligar. Já tentei carregar mas nenhuma luz acende..."
                  value={formData.problemSummary}
                  onChange={(e) => handleInputChange('problemSummary', e.target.value)}
                  className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  id="input-problem-desc"
                />
              </div>
            </div>

            {/* Step 4: Date & Turn Preference */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                4. Data e Turno Preferencial
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Data Desejada:
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    id="input-preferred-date"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Período do Dia:
                  </label>
                  <select
                    value={formData.preferredPeriod}
                    onChange={(e) => handleInputChange('preferredPeriod', e.target.value as any)}
                    className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    id="select-preferred-period"
                  >
                    <option value="morning">Manhã (08:30 às 12:00)</option>
                    <option value="afternoon">Tarde (13:00 às 18:00)</option>
                    <option value="commercial">Comercial Flexível (Qualquer horário)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Field Support Address (shown only if field support is active) */}
            {modality === 'field_support' && (
              <div className="mb-8 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Endereço para a Visita Técnica</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Rua / Avenida, Número e Complemento"
                    value={formData.addressStreet || ''}
                    onChange={(e) => handleInputChange('addressStreet', e.target.value)}
                    className="bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    id="input-field-street"
                  />
                  <input
                    type="text"
                    placeholder="Bairro e Cidade (Ex: Bela Vista, São Paulo)"
                    value={formData.addressNeighborhood || ''}
                    onChange={(e) => handleInputChange('addressNeighborhood', e.target.value)}
                    className="bg-[#070D22] border border-blue-900/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    id="input-field-neighborhood"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Customer Contact */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                5. Seus Dados de Contato
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Seu Nome Completo *"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      id="input-customer-name"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Telefone *"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      id="input-customer-phone"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="E-mail (opcional)"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-[#070D22] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      id="input-customer-email"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Nenhum valor é cobrado no momento do agendamento.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                id="btn-submit-booking"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar e Gerar Protocolo</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
