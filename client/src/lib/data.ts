export interface Prestador {
  id: string;
  nome: string;
  categoria: string;
  bairro: string;
  descricao: string;
  avaliacao: number;
  servicos: string[];
  disponivel: boolean;
  telefone: string;
}

export interface Pedido {
  id: string;
  prestadorId: string;
  prestadorNome: string;
  categoria: string;
  solicitanteNome: string;
  solicitanteTelefone?: string;
  descricao: string;
  data: string;
  status: "pendente" | "aceito" | "concluido";
}

export const categorias = [
  "Encanador",
  "Eletricista",
  "Pintor",
  "Limpeza",
  "Beleza",
  "Informática",
  "Pedreiro",
  "Jardinagem",
];

export const bairros = [
  "Vila Nova",
  "Jardim das Flores",
  "Centro",
  "Boa Vista",
  "São Jorge",
];

export const prestadores: Prestador[] = [
  {
    id: "1",
    nome: "Carlos Encanamentos",
    categoria: "Encanador",
    bairro: "Vila Nova",
    descricao: "Serviços de encanamento residencial e comercial. Desentupimento, instalação e manutenção hidráulica.",
    avaliacao: 4.8,
    servicos: ["Desentupimento", "Instalação de torneiras", "Reparo de vazamentos"],
    disponivel: true,
    telefone: "(11) 99999-0001",
  },
  {
    id: "2",
    nome: "Elétrica do Marcos",
    categoria: "Eletricista",
    bairro: "Jardim das Flores",
    descricao: "Instalações elétricas, troca de fiação, quadros de energia e iluminação residencial.",
    avaliacao: 4.6,
    servicos: ["Troca de fiação", "Instalação de tomadas", "Quadros de energia"],
    disponivel: true,
    telefone: "(11) 99999-0002",
  },
  {
    id: "3",
    nome: "Pintura & Arte - Dona Lúcia",
    categoria: "Pintor",
    bairro: "Vila Nova",
    descricao: "Pintura residencial interna e externa, textura, grafiato e acabamentos especiais.",
    avaliacao: 4.9,
    servicos: ["Pintura interna", "Pintura externa", "Textura e grafiato"],
    disponivel: false,
    telefone: "(11) 99999-0003",
  },
  {
    id: "4",
    nome: "LimpaBem Serviços",
    categoria: "Limpeza",
    bairro: "Centro",
    descricao: "Limpeza residencial, pós-obra, limpeza de estofados e higienização de ambientes.",
    avaliacao: 4.5,
    servicos: ["Limpeza residencial", "Pós-obra", "Higienização de estofados"],
    disponivel: true,
    telefone: "(11) 99999-0004",
  },
  {
    id: "5",
    nome: "Salão da Rê",
    categoria: "Beleza",
    bairro: "Boa Vista",
    descricao: "Cortes, coloração, tratamentos capilares, manicure e pedicure a domicílio.",
    avaliacao: 4.7,
    servicos: ["Corte feminino", "Coloração", "Manicure e pedicure"],
    disponivel: true,
    telefone: "(11) 99999-0005",
  },
  {
    id: "6",
    nome: "TechBairro - Suporte",
    categoria: "Informática",
    bairro: "São Jorge",
    descricao: "Manutenção de computadores, formatação, redes Wi-Fi e suporte técnico remoto.",
    avaliacao: 4.4,
    servicos: ["Formatação", "Configuração de rede", "Suporte remoto"],
    disponivel: true,
    telefone: "(11) 99999-0006",
  },
  {
    id: "7",
    nome: "Pedreiro Silva",
    categoria: "Pedreiro",
    bairro: "Vila Nova",
    descricao: "Construção, reforma, reboco, contrapiso e pequenos reparos em alvenaria.",
    avaliacao: 4.3,
    servicos: ["Reforma", "Reboco", "Contrapiso"],
    disponivel: false,
    telefone: "(11) 99999-0007",
  },
  {
    id: "8",
    nome: "Jardins do Bairro",
    categoria: "Jardinagem",
    bairro: "Jardim das Flores",
    descricao: "Manutenção de jardins, poda, plantio, paisagismo e cuidados com gramados.",
    avaliacao: 4.6,
    servicos: ["Poda", "Plantio", "Manutenção de gramado"],
    disponivel: true,
    telefone: "(11) 99999-0008",
  },
];

// Simulated orders stored in localStorage
const PEDIDOS_KEY = "conectamei_pedidos";

export function getPedidos(): Pedido[] {
  try {
    const stored = localStorage.getItem(PEDIDOS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addPedido(pedido: Omit<Pedido, "id" | "data" | "status">): Pedido {
  const pedidos = getPedidos();
  const novo: Pedido = {
    ...pedido,
    id: crypto.randomUUID(),
    data: new Date().toISOString(),
    status: "pendente",
  };
  pedidos.push(novo);
  localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));
  return novo;
}

export function updatePedidoStatus(id: string, status: Pedido["status"]) {
  const pedidos = getPedidos();
  const idx = pedidos.findIndex((p) => p.id === id);
  if (idx >= 0) {
    pedidos[idx].status = status;
    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));
  }
}
