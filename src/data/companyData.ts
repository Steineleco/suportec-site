import { CompanyLocation, ServiceItem, Testimonial, FAQItem } from '../types';

export const COMPANY_INFO: CompanyLocation = {
  name: "Suportec Empresa",
  tagline: "Serviços Técnicos Especializados & Suporte de Campo",
  cnpj: "34.892.105/0001-47",
  street: "Avenida Paulista",
  number: "1500",
  complement: "Conjunto 102 - Bela Vista",
  neighborhood: "Bela Vista",
  city: "São Paulo",
  state: "SP",
  zipCode: "01310-200",
  fullAddress: "Av. Paulista, 1500 - Conj. 102 - Bela Vista, São Paulo - SP, CEP 01310-200",
  phone: "(11) 3254-8900",
  whatsapp: "5511998765432",
  whatsappFormatted: "(11) 99876-5432",
  email: "contato@suportecempresa.com.br",
  workingHoursWeekday: "Segunda a Sexta: 08:30 às 18:30",
  workingHoursSaturday: "Sábado: 09:00 às 13:30",
  workingHoursSunday: "Domingo e Feriados: Fechado (Plantão emergencial corporativo)",
  // Standard, clean Google Maps embed for the business location
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197368095166!2d-46.65706592398416!3d-23.561346761596766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201500%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1710500000000!5m2!1spt-BR!2sbr",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Av.+Paulista,+1500+-+Bela+Vista,+S%C3%A3o+Paulo+-+SP",
  latitude: -23.561346,
  longitude: -46.654877,
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "notebooks",
    category: "notebook",
    title: "Reparo em Notebooks",
    badge: "Laboratório Especializado",
    iconName: "Laptop",
    summary: "Conserto avançado de placas, telas, teclados e upgrades para todas as marcas.",
    description: "Diagnóstico eletrônico em nível de componentes com microscópio térmico e bancadas ESD. Atendemos Dell, Lenovo, HP, Acer, Asus, Apple MacBook e demais fabricantes.",
    commonProblems: [
      "Notebook não liga ou desliga sozinho repentinamente",
      "Tela quebrada, piscando, listras ou sem imagem (Black screen)",
      "Lentidão extrema, travamentos e superaquecimento com cooler barulhento",
      "Teclas falhando ou teclado travado após derramamento de líquido",
      "Dobradiças e carcaça quebradas ou soltas",
      "Bateria viciada ou notebook só funciona conectado à tomada"
    ],
    keySolutions: [
      "Reparo em placa-mãe (curto-circuito, reguladores de tensão e BGA)",
      "Substituição de telas LCD/LED/OLED de alta taxa de atualização",
      "Upgrade acelerado com SSD NVMe M.2 e expansão de memória RAM",
      "Troca de pasta térmica de alta performance (Thermal Grizzly/Arctic) e desoxidação",
      "Restauração de dobradiças estruturais e reconstrução de carcaça"
    ],
    estimatedTime: "Diagnóstico em até 24h • Reparos rápidos em 24h a 48h",
    warranty: "Garantia formal de 90 a 180 dias com nota fiscal",
    highlight: true,
  },
  {
    id: "desktops",
    category: "desktop",
    title: "Reparo em Desktops & PCs Gamer",
    badge: "Alta Performance & Corporativo",
    iconName: "Monitor",
    summary: "Manutenção preventiva, corretiva, montagem sob medida e reparos de hardware.",
    description: "Estrutura completa para computadores corporativos, estações de trabalho (Workstations) e PCs Gamer de alta potência, com testes de estresse térmico e voltagem.",
    commonProblems: [
      "PC liga mas não dá vídeo ou emite bips sonoros sucessivos",
      "Travamentos durante jogos ou renderizações (Blue Screen / Tela Azul)",
      "Fonte queimada ou com cheiro de aquecimento após oscilação elétrica",
      "Sistema corrompido, lentidão ou infecção por vírus e malwares",
      "Placa de vídeo com artefatos visuais ou superaquecendo"
    ],
    keySolutions: [
      "Troca e teste com carga real de Fontes de Alimentação certificadas 80 Plus",
      "Limpeza profunda por ultrassom de contatos e cable management profissional",
      "Reparo e teste de Placas de Vídeo (GPU) e Placas-mãe gamer/workstation",
      "Instalação de Sistemas Operacionais limpos com retenção e backup de arquivos",
      "Dimensionamento e montagem personalizada com Water Coolers e Air Coolers"
    ],
    estimatedTime: "Diagnóstico em 12h a 24h • Suporte prioritário",
    warranty: "Garantia de 90 a 180 dias",
  },
  {
    id: "smartphones",
    category: "smartphone",
    title: "Reparo em Celulares & Smartphones",
    badge: "Agilidade & Peças Premium",
    iconName: "Smartphone",
    summary: "Troca rápida de tela, baterias originais, conectores de carga e recuperação de placas.",
    description: "Reparos de alta precisão para iPhone (Apple), Samsung Galaxy, Motorola, Xiaomi e outras marcas. Garantia de sensibilidade de toque, cores vivas e vedação adequada.",
    commonProblems: [
      "Display trincado, touch screen que não responde ou manchas pretas",
      "Aparelho descarregando rapidamente ou desligando com 20-30%",
      "Conector de carga frouxo, com mau contato ou que não carrega",
      "Celular caiu na água ou parou de emitir áudio nas ligações",
      "Aparelho travado no logotipo da marca (Bootloop)"
    ],
    keySolutions: [
      "Troca de módulo frontal completo (vidro + display) com calibragem TrueTone/Touch",
      "Substituição de baterias com selo de qualidade e 100% de saúde",
      "Troca de conector dock Tipo-C / Lightning e microfones",
      "Desoxidação química com banho ultrassônico para aparelhos molhados",
      "Reparo avançado em microeletrônica (CI de carga, áudio e RF)"
    ],
    estimatedTime: "Troca de tela e bateria em 1h a 3h sob agendamento",
    warranty: "Garantia de 90 a 120 dias nas peças",
  },
  {
    id: "tablets",
    category: "tablet",
    title: "Reparo em Tablets & iPads",
    badge: "Precisão & Acabamento",
    iconName: "Tablet",
    summary: "Manutenção para iPads Apple, Samsung Galaxy Tabs e tablets corporativos.",
    description: "Especialistas em separação térmica de vidros, colagem industrial de touch e reparos nos botões e baterias de alta capacidade para tablets de estudo, trabalho e ponto de venda (PDV).",
    commonProblems: [
      "Vidro frontal quebrado mantendo o display aceso ou touch inoperante",
      "Bateria inchada estufando a tela do tablet",
      "Conector de carga danificado por puxões de cabos ou uso contínuo",
      "Tablet não responde ao carregador ou desliga de repente",
      "Botão liga/desliga afundado ou controle de volume travado"
    ],
    keySolutions: [
      "Troca de touch screen e painéis laminados de alta resolução",
      "Substituição segura de baterias de polímero de lítio",
      "Recondicionamento de conectores e circuitos de alimentação",
      "Recuperação de carcaças de alumínio empenadas ou amassadas",
      "Atualização de firmware e restauração de sistema operacional"
    ],
    estimatedTime: "Diagnóstico em até 24h • Reparo em 24h a 48h",
    warranty: "Garantia de 90 dias",
  },
  {
    id: "suporte-campo",
    category: "field_support",
    title: "Suporte Técnico de Campo (In-Loco)",
    badge: "Atendimento Agendado",
    iconName: "Truck",
    summary: "Visita técnica no seu escritório, empresa ou residência para resolver tudo no local.",
    description: "Nossos técnicos credenciados vão até você com kit profissional de testes, ferramentas e cabos. Ideal para redes, infraestrutura, impressoras compartilhadas e empresas que não podem parar suas operações.",
    commonProblems: [
      "Rede Wi-Fi oscilando, caindo ou áreas de sombra sem sinal na empresa/casa",
      "Servidor ou estações de trabalho desconectando da rede local",
      "Impressoras de rede e scanners sem comunicação com os computadores",
      "Necessidade de instalação e padronização de múltiplos computadores novos",
      "Computador do escritório parado impedindo o faturamento ou atendimento",
      "Câmeras de segurança (CFTV) ou backups locais com falhas"
    ],
    keySolutions: [
      "Atendimento presencial com hora marcada agendada previamente",
      "Estruturação e certificação de cabeamento estruturado e roteadores Mesh",
      "Configuração de servidores de arquivos, permissões e rotinas de backup seguro",
      "Instalação, mapeamento de impressoras e configuração de softwares corporativos",
      "Manutenção preventiva periódica em parque de máquinas para empresas",
      "Coleta assistida caso o equipamento precise de laboratório e devolução entregue"
    ],
    estimatedTime: "Atendimento no mesmo dia ou no próximo dia útil conforme agendamento",
    warranty: "Garantia de serviço executado com relatório técnico de visita",
    highlight: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Roberto Albuquerque",
    roleOrCompany: "Diretor na NovaTech Soluções",
    rating: 5,
    date: "Há 2 semanas",
    serviceRendered: "Suporte Técnico de Campo (In-Loco)",
    comment: "Excelente atendimento! Nossa rede e 8 computadores da empresa foram reconfigurados no mesmo dia pela equipe de campo da Suportec. Pontualidade britânica e competência exemplar.",
    verified: true,
  },
  {
    id: "2",
    author: "Mariana Siqueira",
    roleOrCompany: "Arquiteta Autônoma",
    rating: 5,
    date: "Há 1 mês",
    serviceRendered: "Reparo em Notebook Dell XPS",
    comment: "Meu notebook de trabalho sofreu um curto na placa e outras assistências queriam condenar a máquina. A Suportec recuperou a placa e salvou todos os meus projetos em 48 horas. Recomendo de olhos fechados!",
    verified: true,
  },
  {
    id: "3",
    author: "Carlos Eduardo Mendes",
    roleOrCompany: "Engenheiro de Software",
    rating: 5,
    date: "Há 3 semanas",
    serviceRendered: "Reparo em Desktop Gamer & Upgrade",
    comment: "Trabalho impecável no meu PC. Troca de fonte, limpeza térmica e montagem impecável. Sem falar no atendimento rápido pelo WhatsApp e endereço super acessível na Paulista.",
    verified: true,
  },
  {
    id: "4",
    author: "Patrícia Fernandes",
    roleOrCompany: "Advocacia Fernandes & Associados",
    rating: 5,
    date: "Há 1 mês",
    serviceRendered: "Reparo de iPad & Celulares Corporativos",
    comment: "Trocamos as telas de 3 tablets e 2 celulares da equipe. Peças de alta qualidade, tela com as cores originais perfeitas e garantia de verdade. Nota 10.",
    verified: true,
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "f1",
    category: "geral",
    question: "Como funciona o agendamento do Suporte Técnico de Campo?",
    answer: "Você pode agendar diretamente pelo formulário em nosso site ou pelo WhatsApp. Nossa equipe confirma a data, o horário e o endereço solicitado. O técnico chega uniformizado, identificado e com ferramental completo para efetuar os testes e reparos no local.",
  },
  {
    id: "f2",
    category: "prazos",
    question: "Qual é o tempo médio para diagnóstico de computadores e notebooks no laboratório?",
    answer: "Para a grande maioria dos aparelhos recebidos em nosso balcão, o diagnóstico conclusivo é apresentado em até 24 horas úteis, discriminando as peças necessárias, o valor exato e o prazo de entrega.",
  },
  {
    id: "f3",
    category: "garantia",
    question: "Quais são as garantias oferecidas pela Suportec Empresa?",
    answer: "Todos os nossos serviços contam com garantia legal e formal expressa em ordem de serviço, variando de 90 a 180 dias dependendo do tipo de reparo e componente substituído. Utilizamos componentes de procedência assegurada.",
  },
  {
    id: "f4",
    category: "geral",
    question: "Meus dados e arquivos confidenciais ficam seguros durante o conserto?",
    answer: "Totalmente. Adotamos protocolos rigorosos de privacidade e integridade de dados (LGPD). Não acessamos arquivos pessoais nem apagamos discos sem autorização prévia por escrito. Recomendamos e também executamos backups preventivos.",
  },
  {
    id: "f5",
    category: "campo",
    question: "Qual é a área de cobertura para o atendimento técnico presencial de campo?",
    answer: "Cobrimos toda a capital de São Paulo e região metropolitana / Grande ABC. Para empresas e contratos corporativos, atendemos demandas sob medida com acordos de nível de serviço (SLA).",
  },
  {
    id: "f6",
    category: "prazos",
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos cartões de crédito (em até 12x), cartões de débito, PIX com desconto à vista e faturamento via boleto bancário para empresas cadastradas mediante análise cadastral.",
  },
];
