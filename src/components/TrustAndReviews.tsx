import React from 'react';
import { TESTIMONIALS } from '../data/companyData';
import { 
  Star, 
  ShieldCheck, 
  Cpu, 
  Award, 
  CheckCircle, 
  Quote, 
  Wrench, 
  Search, 
  FileCheck2, 
  Sparkles
} from 'lucide-react';

export const TrustAndReviews: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Diagnóstico Técnico',
      desc: 'Análise detalhada em bancada ESD para identificar a causa raiz do problema.',
      icon: Search,
    },
    {
      num: '2',
      title: 'Orçamento Transparente',
      desc: 'Apresentação clara dos componentes, valores e prazos sem nenhuma taxa oculta.',
      icon: FileCheck2,
    },
    {
      num: '3',
      title: 'Reparo com Peças Certificadas',
      desc: 'Execução por técnicos capacitados utilizando componentes de alta durabilidade.',
      icon: Wrench,
    },
    {
      num: '4',
      title: 'Controle de Qualidade & Garantia',
      desc: 'Bateria de testes de estresse antes da liberação e garantia formal de 90 a 180 dias.',
      icon: ShieldCheck,
    },
  ];

  const brandNames = [
    'Apple', 'Dell', 'Lenovo', 'HP', 'Samsung', 'Asus', 'Acer', 'Motorola', 'Xiaomi', 'Intel', 'AMD', 'Kingston'
  ];

  return (
    <section id="como-funciona" className="py-20 bg-[#070E24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: 4-Step Process */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Fluxo de Atendimento
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Como Funciona Nosso Trabalho
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Transparência do primeiro contato até a entrega do seu equipamento funcionando perfeitamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-[#091436]/70 border border-blue-900/40 hover:border-blue-600/50 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-2xl font-black text-blue-500/30">
                      0{step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brands Supported Strip */}
        <div className="bg-[#0A122E] border border-blue-900/40 rounded-2xl p-6 mb-20 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4">
            Especialistas no Reparo das Principais Marcas Globais
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {brandNames.map((brand, i) => (
              <span 
                key={i} 
                className="text-xs sm:text-sm font-semibold text-slate-300 bg-blue-950/60 px-3.5 py-1.5 rounded-lg border border-blue-900/40"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Section 2: Real Google Reviews & Testimonials */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-white ml-1.5">4.9 / 5.0 no Google Avaliações</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Depoimentos de empresas e clientes atendidos pela Suportec Empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#0A122E] border border-blue-900/40 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{t.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-blue-950 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{t.author}</h4>
                  <span className="text-[11px] text-slate-400 block">{t.roleOrCompany}</span>
                </div>
                <span className="text-[11px] font-semibold text-sky-400 bg-blue-950 px-2.5 py-1 rounded-md border border-blue-900/60">
                  {t.serviceRendered}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
