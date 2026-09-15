import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual Inteligente da "Suportec Empresa - Serviços Técnicos".
Seu papel é responder dúvidas de clientes sobre os serviços oferecidos, procedimentos de reparo, prazos, garantias, formas de pagamento, localização e suporte de campo in-loco.

INFORMAÇÕES DA EMPRESA:
- Nome: Suportec Empresa - Serviços Técnicos
- Endereço físico: Av. Paulista, 1500 - Conjunto 102 - Bela Vista, São Paulo - SP, CEP 01310-200 (a 150 metros da estação Trianon-MASP).
- Telefone fixo: (11) 3254-8900
- WhatsApp técnico: (11) 99876-5432
- Horário de Atendimento: Segunda a Sexta das 08:30 às 18:30 | Sábados das 09:00 às 13:30 | Domingo/Feriados fechado (plantão corporativo sob contrato).

SERVIÇOS PRESTADOS:
1. Notebooks: Reparo avançado em placa-mãe (BGA, curtos), troca de telas LED/OLED/IPS, teclados, dobradiças, troca de baterias, upgrades com SSD NVMe e memória RAM, limpeza térmica com pasta de alta condutividade. Todas as marcas (Dell, Apple MacBook, Lenovo, HP, Acer, Asus, etc.).
2. Desktops & PCs Gamer: Fontes reais 80 Plus, placas de vídeo (GPU), limpeza preventiva profunda, cable management, montagem personalizada e testes de estresse.
3. Celulares & Smartphones: Troca rápida de telas (displays originais e premium), troca de baterias com 100% de saúde, conectores Tipo-C e Lightning, desoxidação ultrassônica após contato com líquidos. (iPhone, Samsung Galaxy, Motorola, Xiaomi, etc.).
4. Tablets & iPads: Troca de vidro touch e telas laminadas, substituição de baterias, conectores e recuperação de carcaça.
5. Suporte Técnico de Campo (In-Loco): Visita presencial agendada na empresa, escritório ou residência. Redes Wi-Fi empresariais e roteadores Mesh, servidores de arquivos e backups, impressoras de rede, padronização de parque de computadores e atendimento corporativo com SLA. Atendemos toda São Paulo e Grande SP/ABC.

PROCEDIMENTOS E POLÍTICAS:
- Diagnóstico em bancada: Apresentado em até 24 horas úteis. Orçamento discriminado sem compromisso.
- Prazos de reparo: Trocas de tela e bateria de celular em 1h a 3h sob agendamento. Reparos em notebooks e desktops em 24h a 48h após aprovação.
- Garantia: 90 a 180 dias com Nota Fiscal e ordem de serviço detalhada.
- Segurança dos Dados (LGPD): Protocolo rigoroso de privacidade. Nenhum arquivo é apagado ou visualizado sem consentimento por escrito. Backups preventivos disponíveis.
- Formas de Pagamento: Cartão de crédito em até 12x, cartão de débito, PIX à vista e boleto faturado para empresas cadastradas.
- Agendamento: O cliente pode agendar diretamente pelo site (seção de Agendamento) ou pelo WhatsApp comercial da empresa.

DIRETRIZES DE COMUNICAÇÃO:
- Seja sempre cordial, profissional, ágil e técnico na medida certa (fácil para o leigo entender).
- Use tópicos claros com bullet points e negrito para destacar prazos e benefícios.
- Responda em Português do Brasil com excelente ortografia.
- Ao final das respostas sobre problemas no aparelho, convide gentilmente o cliente a fazer um agendamento no site ou a entrar em contato pelo WhatsApp com a bancada técnica para agilizar o atendimento.
`;

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback simulator if GEMINI_API_KEY is not configured or in case of temporary provider maintenance
function generateSimulatedResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  // Greetings
  if (lower.startsWith('olá') || lower.startsWith('ola') || lower.startsWith('oi') || lower.startsWith('bom dia') || lower.startsWith('boa tarde') || lower.startsWith('boa noite')) {
    return "Olá! Sou o assistente virtual da **Suportec Empresa - Serviços Técnicos** 🛠️\n\nComo posso te ajudar hoje? Posso tirar dúvidas sobre:\n- **Prazos de diagnóstico e reparo**\n- **Garantias formais de 90 a 180 dias**\n- **Conserto de Notebooks, Desktops, Celulares e Tablets**\n- **Suporte Técnico de Campo (In-Loco)** para empresas e residências\n- **Localização na Av. Paulista** ou agendamento de visita.";
  }

  // Deadlines & Diagnostics
  if (lower.includes("prazo") || lower.includes("tempo") || lower.includes("demora") || lower.includes("diagnóstico") || lower.includes("diagnostico") || lower.includes("laudo")) {
    return "⏱️ **Prazos de Diagnóstico & Reparo na Suportec:**\n\n- **Diagnóstico em bancada:** Realizado em até **24 horas úteis** com laudo detalhado e orçamento discriminado sem compromisso.\n- **Celulares e Tablets (Telas e Baterias):** De **1 a 3 horas** com agendamento prévio.\n- **Notebooks e Desktops:** Reparos em placa, componentes e upgrades entre **24h e 48h** após a aprovação.\n- **Suporte de Campo In-Loco:** Atendimento no mesmo dia ou próximo dia útil com hora marcada!\n\nDeseja que eu te auxilie a agendar seu atendimento agora mesmo?";
  }

  // Warranties & Invoices
  if (lower.includes("garantia") || lower.includes("nota fiscal") || lower.includes("nf") || lower.includes("procedência") || lower.includes("procedencia")) {
    return "🛡️ **Garantia & Procedência Garantida:**\n\nTodos os serviços da **Suportec Empresa** contam com garantia legal e formal documentada em Ordem de Serviço:\n\n- **Prazo de Garantia:** De **90 a 180 dias** (cobrindo peças e mão de obra técnica).\n- **Componentes:** Trabalhamos apenas com peças novas, homologadas e com selo de procedência.\n- **Nota Fiscal Eletrônica:** Emitida para todos os atendimentos (Pessoa Física e Jurídica).";
  }

  // Location, Address & Hours
  if (lower.includes("onde") || lower.includes("endereço") || lower.includes("endereco") || lower.includes("localização") || lower.includes("localizacao") || lower.includes("perto") || lower.includes("metrô") || lower.includes("metro") || lower.includes("horário") || lower.includes("horario")) {
    return "📍 **Localização & Horário de Atendimento:**\n\nEstamos centralizados no coração financeiro de São Paulo:\n- **Endereço:** Av. Paulista, 1500 - Conjunto 102 - Bela Vista, São Paulo / SP (CEP 01310-200).\n- **Referência:** A apenas **150 metros da estação Trianon-MASP** do Metrô (Linha 2-Verde).\n- **Estacionamento:** Conveniado no próprio edifício com manobrista.\n- **Horário:** Segunda a Sexta das **08:30 às 18:30** | Sábados das **09:00 às 13:30**.";
  }

  // Field support / In-Loco / Corporate visits
  if (lower.includes("campo") || lower.includes("visita") || lower.includes("empresa") || lower.includes("in loco") || lower.includes("in-loco") || lower.includes("escritório") || lower.includes("escritorio") || lower.includes("rede") || lower.includes("servidor") || lower.includes("wi-fi") || lower.includes("wifi")) {
    return "🚗 **Suporte Técnico de Campo (In-Loco):**\n\nNossa equipe móvel vai até a sua empresa, condomínio ou residência com hora marcada:\n\n- **Redes & Wi-Fi:** Instalação de roteadores Mesh, certificação de cabeamento Cat6 e eliminação de pontos cegos.\n- **Servidores e Backups:** Configuração de storages NAS, permissões de usuários e segurança de dados.\n- **Impressoras compartilhadas** e padronização de estações de trabalho.\n- **Área de Cobertura:** Toda a capital de São Paulo, Grande SP e região do ABC.\n\nVocê pode solicitar o agendamento de campo pelo nosso formulário online ou direto no WhatsApp!";
  }

  // Notebooks
  if (lower.includes("notebook") || lower.includes("laptop") || lower.includes("macbook") || lower.includes("dell") || lower.includes("lenovo") || lower.includes("carcaça") || lower.includes("dobradiça") || lower.includes("dobradica") || lower.includes("teclado")) {
    return "💻 **Serviços Especializados em Notebooks:**\n\nAtendemos todas as marcas (Dell, Apple MacBook, Lenovo ThinkPad, HP, Asus, Acer, Samsung):\n\n- **Placa-mãe:** Reparo em nível de componente, curto-circuito, reguladores de tensão e reballing BGA.\n- **Telas:** Troca de displays LED, IPS e OLED de alta taxa de atualização.\n- **Estrutural:** Restauração de carcaças rompidas e reconstrução de buchas de dobradiças.\n- **Upgrades:** Aceleração com SSD NVMe M.2 (até 10x mais rápido) e expansão de RAM.\n- **Prevenção:** Limpeza do sistema térmico com pasta térmica de alta condutividade.\n\nTraga para diagnóstico de bancada em até 24h úteis!";
  }

  // Desktops & Gamer PCs
  if (lower.includes("desktop") || lower.includes("computador") || lower.includes("pc") || lower.includes("gamer") || lower.includes("placa de vídeo") || lower.includes("gpu") || lower.includes("fonte") || lower.includes("water cooler") || lower.includes("pasta térmica")) {
    return "🖥️ **Reparo em Desktops & PCs Gamer:**\n\nEstrutura laboratorial completa com testes de estresse e carga real:\n\n- **Fontes de Alimentação:** Diagnóstico de voltagem e substituição por fontes certificadas 80 Plus.\n- **Placas de Vídeo (GPU):** Reparo de artefatos visuais, troca de thermal pads e pasta condutiva.\n- **Sistemas:** Instalação limpa de Windows 11/10 com retenção completa dos seus arquivos pessoais.\n- **Montagem personalizada:** Cable management impecável, otimização de fluxo de ar e refrigeração líquida.";
  }

  // Smartphones & Celulares
  if (lower.includes("celular") || lower.includes("smartphone") || lower.includes("iphone") || lower.includes("samsung") || lower.includes("motorola") || lower.includes("xiaomi") || lower.includes("display") || lower.includes("touch") || lower.includes("vidro") || lower.includes("bateria")) {
    return "📱 **Manutenção em Celulares & Smartphones:**\n\nAgilidade e componentes de primeira linha:\n\n- **Troca de Tela:** Painéis frontais com calibragem de toque e preservação de funções (como TrueTone no iPhone).\n- **Troca de Bateria:** Baterias novas com 100% de saúde e selo de segurança.\n- **Conector de Carga:** Reparo em conectores USB Tipo-C e Lightning com mau contato.\n- **Tempo de Execução:** Trocas de tela e bateria realizadas em **1h a 3h** mediante agendamento!";
  }

  // Water damage / Spill / Desoxidação
  if (lower.includes("água") || lower.includes("agua") || lower.includes("molhou") || lower.includes("líquido") || lower.includes("liquido") || lower.includes("café") || lower.includes("cafe") || lower.includes("desoxidação") || lower.includes("desoxidacao")) {
    return "💧 **Aparelho Molhado / Queda em Líquido:**\n\nRecomendação imediata de emergência:\n1. **Não ligue o aparelho** e não conecte ao carregador de forma alguma.\n2. Traga o mais rápido possível à nossa bancada na Av. Paulista, 1500.\n3. Realizamos **banho ultrassônico químico** para desoxidação dos circuitos da placa-mãe antes que ocorra corrosão galvânica permanente.";
  }

  // Prices & Payments
  if (lower.includes("preço") || lower.includes("preco") || lower.includes("valor") || lower.includes("quanto custa") || lower.includes("pagamento") || lower.includes("parcela") || lower.includes("pix") || lower.includes("cartão") || lower.includes("cartao") || lower.includes("boleto")) {
    return "💳 **Condições de Pagamento & Orçamentos:**\n\n- **Orçamento de Bancada:** Análise técnica transparente em até 24h sem custo para avaliação do cliente.\n- **Cartões de Crédito:** Parcelamento em até **12x**.\n- **PIX:** Desconto especial à vista.\n- **Faturamento Corporativo:** Emissão de boleto bancário a prazo para empresas cadastradas.\n\nO valor exato depende do modelo e componente específico, que discriminamos detalhadamente no laudo.";
  }

  // Data Privacy & LGPD
  if (lower.includes("dado") || lower.includes("arquivo") || lower.includes("foto") || lower.includes("segurança") || lower.includes("seguranca") || lower.includes("lgpd") || lower.includes("privacidade") || lower.includes("formatar")) {
    return "🔒 **Privacidade & Segurança de Dados (LGPD):**\n\nSegurança total para os seus arquivos e documentos:\n- Cumprimos rigorosamente a **LGPD** com termo de confidencialidade.\n- Não acessamos pastas pessoais, fotos ou e-mails do cliente.\n- Nenhum disco é formatado sem autorização prévia por escrito.\n- Oferecemos o serviço de **Backup Preventivo Completo** antes de qualquer intervenção física ou de sistema.";
  }

  // How to schedule
  if (lower.includes("agendar") || lower.includes("agendamento") || lower.includes("marcar") || lower.includes("horario") || lower.includes("atendimento")) {
    return "📅 **Como Agendar seu Atendimento:**\n\n1. Role até a seção **Agendamento** no nosso site ou clique no botão 'Ir para Agendamento'.\n2. Escolha entre **Atendimento em Balcão** ou **Visita Técnica de Campo**.\n3. Selecione o dispositivo e o período de preferência.\n4. Nosso sistema gera um **Protocolo Instantâneo** e você pode enviá-lo com 1 clique para o nosso WhatsApp!";
  }

  return "Olá! Sou o assistente virtual da **Suportec Empresa**. Oferecemos assistência especializada em **Notebooks**, **Desktops & PCs Gamer**, **Smartphones**, **Tablets** e **Suporte Técnico de Campo (In-Loco)** na Grande São Paulo.\n\nComo posso te ajudar hoje? Posso tirar dúvidas sobre prazos de diagnóstico (em até 24h), garantias de 90 a 180 dias, nossa localização na Av. Paulista, 1500 ou procedimentos para agendar uma visita técnica.";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
    res.json({
      status: "ok",
      geminiConfigured: hasKey,
      model: "gemini-3.8-flash",
    });
  });

  // Chat API endpoint using Gemini API
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        res.status(400).json({ error: "Mensagem obrigatória" });
        return;
      }

      const client = getGeminiClient();

      // If Gemini client is not initialized (no key yet), use the realistic simulation engine
      if (!client) {
        const simulatedAnswer = generateSimulatedResponse(message);
        res.json({
          reply: simulatedAnswer,
          isSimulated: true,
          notice: "Resposta gerada pelo motor de simulação inteligente da Suportec. Chave GEMINI_API_KEY pode ser conectada nas configurações para IA ativa.",
        });
        return;
      }

      // Format conversation contents for Gemini SDK
      type ChatHistoryItem = { role: "user" | "model"; content: string };
      const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of (history as ChatHistoryItem[]).slice(-8)) {
          if ((item.role === "user" || item.role === "model") && typeof item.content === "string") {
            formattedContents.push({
              role: item.role,
              parts: [{ text: item.content }],
            });
          }
        }
      }

      // Append current user message
      formattedContents.push({
        role: "user",
        parts: [{ text: message.trim() }],
      });

      // Call Gemini 3.8 Flash model
      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Desculpe, não consegui processar a resposta no momento. Por favor, tente novamente ou fale conosco pelo WhatsApp.";

      res.json({
        reply,
        isSimulated: false,
      });
    } catch (error: unknown) {
      console.error("Erro ao chamar API do Gemini:", error);
      // Fallback gracefully so customer experience is uninterrupted
      const fallbackMsg = generateSimulatedResponse(req.body?.message || "");
      res.json({
        reply: fallbackMsg,
        isSimulated: true,
        fallbackReason: "Ativação de contingência temporária do assistente.",
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Suportec server rodando na porta ${PORT}`);
  });
}

startServer();
