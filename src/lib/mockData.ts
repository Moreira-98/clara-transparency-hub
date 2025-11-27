// Mock data for the Clara platform

export const blocks = [
  {
    id: "safira",
    name: "Bloco Safira",
    purpose: "Crédito para PMEs do Agronegócio",
    sector: "Agronegócio",
    managedBy: "Núclea",
    riskLevel: "Moderado",
    riskScore: 7.6,
    avgScore: 8.5,
    targetAmount: 500000000,
    currentAmount: 300000000,
    status: "captacao",
    companies: [
      { name: "Semear Agro Ltda", sector: "Agronegócio", value: 150000, rate: "8.5% a.a.", term: "24 meses", score: 9.1, status: "Em dia" },
      { name: "Colheita Verde S.A.", sector: "Agricultura", value: 120000, rate: "8.0% a.a.", term: "18 meses", score: 8.7, status: "Em dia" },
      { name: "AgroTech Solutions", sector: "Tecnologia Agrícola", value: 100000, rate: "9.0% a.a.", term: "36 meses", score: 8.9, status: "Em dia" },
      { name: "Fazenda São João", sector: "Pecuária", value: 80000, rate: "7.8% a.a.", term: "24 meses", score: 7.8, status: "Pendente" },
      { name: "Grãos do Sul", sector: "Comércio de Grãos", value: 50000, rate: "8.2% a.a.", term: "12 meses", score: 8.2, status: "Em dia" },
    ]
  },
  {
    id: "esmeralda",
    name: "Bloco Esmeralda",
    purpose: "Capital de Giro para Varejo",
    sector: "Varejo",
    managedBy: "Núclea",
    riskLevel: "Baixo",
    riskScore: 8.2,
    avgScore: 8.8,
    targetAmount: 300000000,
    currentAmount: 250000000,
    status: "captacao",
    companies: [
      { name: "Varejo Plus SA", sector: "Varejo", value: 200000, rate: "7.5% a.a.", term: "18 meses", score: 8.3, status: "Em dia" },
      { name: "SuperMercado Central", sector: "Alimentação", value: 150000, rate: "7.8% a.a.", term: "24 meses", score: 8.9, status: "Em dia" },
      { name: "Moda Brasil Ltda", sector: "Vestuário", value: 100000, rate: "8.0% a.a.", term: "12 meses", score: 9.2, status: "Em dia" },
    ]
  },
  {
    id: "rubi",
    name: "Bloco Rubi",
    purpose: "Expansão Industrial",
    sector: "Indústria",
    managedBy: "Parceira Alpha",
    riskLevel: "Alto",
    riskScore: 6.8,
    avgScore: 7.5,
    targetAmount: 400000000,
    currentAmount: 150000000,
    status: "captacao",
    companies: [
      { name: "Metalúrgica Forte", sector: "Metalurgia", value: 300000, rate: "10.5% a.a.", term: "36 meses", score: 7.2, status: "Em dia" },
      { name: "Plásticos Modernos", sector: "Química", value: 180000, rate: "9.8% a.a.", term: "24 meses", score: 7.8, status: "Pendente" },
    ]
  },
];

export const investorPortfolio = [
  { blockId: "safira", investedAmount: 1500000, currentValue: 1580000, return: 5.33 },
  { blockId: "esmeralda", investedAmount: 1000000, currentValue: 1045000, return: 4.5 },
];

export const monthlyReturns = [
  { month: "Mai/24", accumulated: 15420, monthReturn: 3200 },
  { month: "Jun/24", accumulated: 18650, monthReturn: 3230 },
  { month: "Jul/24", accumulated: 22100, monthReturn: 3450 },
  { month: "Ago/24", accumulated: 25800, monthReturn: 3700 },
  { month: "Set/24", accumulated: 29650, monthReturn: 3850 },
  { month: "Out/24", accumulated: 33500, monthReturn: 3850 },
  { month: "Nov/24", accumulated: 37800, monthReturn: 4300 },
  { month: "Dez/24", accumulated: 42150, monthReturn: 4350 },
];

export const companyDetails: Record<string, any> = {
  "Semear Agro Ltda": {
    name: "Semear Agro Ltda",
    sector: "Agronegócio",
    score: 9.1,
    badges: ["Score Baseado em ML", "Histórico Limpo ML", "Múltiplas Fontes"],
    components: [
      { criterion: "Pagamentos no Prazo (Clara)", weight: 40, score: 9.2, contribution: 3.68, source: "Clara FIDC" },
      { criterion: "Histórico em Outros Sistemas (Nuclea)", weight: 30, score: 9.3, contribution: 2.79, source: "Nuclea Proprietário" },
      { criterion: "Compliance e Regularidade Fiscal", weight: 20, score: 8.5, contribution: 1.70, source: "Receita Federal / BACEN" },
      { criterion: "Análise de Crédito Externa", weight: 10, score: 8.9, contribution: 0.89, source: "Serasa / Boa Vista" },
    ],
    monthlyScores: [
      { month: "Mai/24", score: 8.8 },
      { month: "Jun/24", score: 8.9 },
      { month: "Jul/24", score: 9.0 },
      { month: "Ago/24", score: 9.0 },
      { month: "Set/24", score: 9.1 },
      { month: "Out/24", score: 9.1 },
      { month: "Nov/24", score: 9.1 },
    ],
  },
  "Colheita Verde S.A.": {
    name: "Colheita Verde S.A.",
    sector: "Agricultura",
    score: 8.7,
    badges: ["Score Baseado em ML", "Histórico Limpo ML", "Múltiplas Fontes"],
    components: [
      { criterion: "Pagamentos no Prazo (Clara)", weight: 40, score: 8.8, contribution: 3.52, source: "Clara FIDC" },
      { criterion: "Histórico em Outros Sistemas (Nuclea)", weight: 30, score: 8.9, contribution: 2.67, source: "Nuclea Proprietário" },
      { criterion: "Compliance e Regularidade Fiscal", weight: 20, score: 8.5, contribution: 1.70, source: "Receita Federal / BACEN" },
      { criterion: "Análise de Crédito Externa", weight: 10, score: 8.0, contribution: 0.80, source: "Serasa / Boa Vista" },
    ],
    monthlyScores: [
      { month: "Mai/24", score: 8.3 },
      { month: "Jun/24", score: 8.4 },
      { month: "Jul/24", score: 8.5 },
      { month: "Ago/24", score: 8.6 },
      { month: "Set/24", score: 8.6 },
      { month: "Out/24", score: 8.7 },
      { month: "Nov/24", score: 8.7 },
    ],
  },
  "Varejo Plus SA": {
    name: "Varejo Plus SA",
    sector: "Varejo",
    score: 8.3,
    badges: ["Score Baseado em ML", "Histórico Limpo ML", "Múltiplas Fontes"],
    components: [
      { criterion: "Pagamentos no Prazo (Clara)", weight: 40, score: 8.5, contribution: 3.40, source: "Clara FIDC" },
      { criterion: "Histórico em Outros Sistemas (Nuclea)", weight: 30, score: 8.2, contribution: 2.46, source: "Nuclea Proprietário" },
      { criterion: "Compliance e Regularidade Fiscal", weight: 20, score: 8.0, contribution: 1.60, source: "Receita Federal / BACEN" },
      { criterion: "Análise de Crédito Externa", weight: 10, score: 8.7, contribution: 0.87, source: "Serasa / Boa Vista" },
    ],
    monthlyScores: [
      { month: "Mai/24", score: 8.0 },
      { month: "Jun/24", score: 8.1 },
      { month: "Jul/24", score: 8.1 },
      { month: "Ago/24", score: 8.2 },
      { month: "Set/24", score: 8.2 },
      { month: "Out/24", score: 8.3 },
      { month: "Nov/24", score: 8.3 },
    ],
  },
};

export const reports = [
  {
    id: "rep-1",
    blockId: "safira",
    blockName: "Bloco Safira",
    period: "Novembro/2024",
    investor: "Investidor Baleia ABC",
    totalInvestment: 500000,
    riskLevel: "Moderado",
    riskScore: 7.6,
    emittedDate: "Novembro 2024",
  },
  {
    id: "rep-2",
    blockId: "esmeralda",
    blockName: "Bloco Esmeralda",
    period: "Novembro/2024",
    investor: "Investidor Baleia ABC",
    totalInvestment: 300000,
    riskLevel: "Baixo",
    riskScore: 8.2,
    emittedDate: "Novembro 2024",
  },
];

export const managerKPIs = {
  tct: { current: 94, target: 95, trend: "up" },
  adoption: { current: 78, target: 85, trend: "up" },
  creditResult: { current: 22, target: 25, trend: "down" },
};

export const blockPerformance = [
  { name: "Safira", tct: 94, inadimplencia: 3.2 },
  { name: "Esmeralda", tct: 96, inadimplencia: 2.1 },
  { name: "Rubi", tct: 88, inadimplencia: 5.8 },
];

export const sectorDistribution = [
  { sector: "Agronegócio", value: 450000000, avgScore: 8.5 },
  { sector: "Varejo", value: 350000000, avgScore: 8.8 },
  { sector: "Indústria", value: 200000000, avgScore: 7.5 },
];
