# VMware Log Analysis System

Sistema web para análise de logs VMware (NSX, HCX, ESXi, vCenter, etc) com timeline visual, drilldown por componentes, filtros avançados e page builder para customização visual.

## 🌐 Links

- **Repositório**: [https://github.com/vinisantoro/vmw-log-analysis](https://github.com/vinisantoro/vmw-log-analysis)
- **Produção**: [https://vmw-log-analysis.dailytech.bits](https://vmw-log-analysis.dailytech.bits)
- **Vercel**: [https://vercel.com/dashboard](https://vercel.com/dashboard)

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Firebase/Firestore** - Banco de dados
- **shadcn/ui** - Componentes UI

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase com Firestore habilitado

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.dev
```

Edite `.env.dev` com suas credenciais do Firebase.

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

- `src/app/` - Rotas e páginas (Next.js App Router)
- `src/components/` - Componentes React
- `src/lib/` - Utilitários, parsers, configurações
- `src/hooks/` - Custom hooks
- `docs/` - Documentação técnica
- `.cursor/rules/` - Regras, memórias e especificações do projeto

## Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run test` - Executa testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com cobertura

## Documentação

Consulte a pasta `docs/` para documentação técnica detalhada:
- [Arquitetura](docs/architecture.md)
- [API](docs/api.md)
- [Deployment](docs/deployment.md)
- [Setup Vercel](docs/vercel-setup.md)

## Configuração do Firebase

O projeto está configurado com Firebase em modo desenvolvimento:
- **Project ID**: `vmw-analysis-d308f`
- **Status**: Desenvolvimento (sem regras de segurança)

**Importante**: As credenciais estão no arquivo `.env.dev` (não versionado). Para produção, configure as variáveis de ambiente na Vercel.

## Deploy

O projeto está configurado para deploy automático na Vercel:
- Push para `main` → Deploy de produção
- Domínio: `vmw-log-analysis.dailytech.bits`

Consulte [docs/vercel-setup.md](docs/vercel-setup.md) para instruções detalhadas de configuração.

## Licença

MIT
