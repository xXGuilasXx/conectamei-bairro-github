# ConectaMEI Bairro

Plataforma web comunitária para conexão entre moradores e Microempreendedores Individuais (MEIs) locais.

## Sobre o Projeto

O **ConectaMEI Bairro** é uma aplicação web que facilita a conexão organizada entre moradores de um bairro e MEIs que prestam serviços locais (encanamento, eletricidade, pintura, limpeza, jardinagem, beleza, entre outros). A plataforma oferece catálogo de prestadores com filtros por categoria e bairro, formulário de solicitação de orçamento, painel de acompanhamento de pedidos e sistema de feedback/avaliação.

## Funcionalidades

- **Catálogo de Prestadores:** Listagem de MEIs com filtros por categoria de serviço e bairro de atuação.
- **Solicitação de Orçamento:** Formulário para moradores solicitarem orçamentos diretamente aos prestadores.
- **Painel de Pedidos:** Acompanhamento do status das solicitações (pendente, aceito, concluído).
- **Feedback e Avaliações:** Sistema de avaliação com estrelas e comentários sobre os serviços prestados.
- **Interface Responsiva:** Design adaptável para desktop, tablet e dispositivos móveis.

## Tecnologias Utilizadas

| Componente   | Tecnologia                        |
| ------------ | --------------------------------- |
| Frontend     | React 19 + TypeScript             |
| Estilização  | Tailwind CSS 4 + shadcn/ui        |
| Build Tool   | Vite 7                            |
| Persistência | localStorage (simulação para MVP) |
| Ícones       | Lucide React                      |
| Animações    | Framer Motion                     |
| Roteamento   | Wouter                            |

## Pré-requisitos

- Node.js 18 ou superior
- pnpm via Corepack ou instalação global

## Instalação e Execução

```bash
# Clonar o repositório
git clone <link-do-repositorio>

# Entrar no diretório
cd conectamei-bairro

# Instalar dependências
corepack pnpm install

# Executar em modo de desenvolvimento
corepack pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
conectamei-bairro/
├── client/
│   ├── index.html              # HTML principal
│   ├── public/                 # Arquivos estáticos
│   └── src/
│       ├── pages/              # Páginas da aplicação
│       │   ├── Home.tsx        # Página inicial
│       │   ├── Catalogo.tsx    # Catálogo de prestadores
│       │   ├── SolicitarOrcamento.tsx  # Formulário de orçamento
│       │   ├── Pedidos.tsx     # Painel de pedidos
│       │   └── Feedback.tsx    # Avaliações
│       ├── components/         # Componentes reutilizáveis
│       │   ├── Layout.tsx      # Layout principal (header + footer)
│       │   └── ui/             # Componentes de interface (shadcn/ui)
│       ├── lib/
│       │   └── data.ts         # Dados mock e funções de persistência
│       ├── contexts/           # Contextos React
│       ├── hooks/              # Hooks customizados
│       ├── App.tsx             # Configuração de rotas
│       ├── main.tsx            # Ponto de entrada
│       └── index.css           # Estilos globais e tokens de design
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Scripts Disponíveis

| Comando                 | Descrição                            |
| ----------------------- | ------------------------------------ |
| `corepack pnpm dev`     | Inicia o servidor de desenvolvimento |
| `corepack pnpm build`   | Gera o build de produção             |
| `corepack pnpm preview` | Visualiza o build de produção        |
| `corepack pnpm check`   | Verifica tipos TypeScript            |
| `corepack pnpm format`  | Formata o código com Prettier        |

## Contexto Acadêmico

Este projeto foi desenvolvido como trabalho da disciplina de Análise e Desenvolvimento de Sistemas da Universidade do Vale do Itajaí (UNIVALI), utilizando metodologia Scrum, Canvas de Proposta de Valor, Business Model Canvas e Canvas MVP.

## Autores

**Guilherme Amaral Cardoso** e **Juliano Boaventura**  
Curso de Análise e Desenvolvimento de Sistemas — Universidade do Vale do Itajaí (UNIVALI)

## Licença

Este projeto é de uso acadêmico. Todos os direitos reservados.
