# Arquitetura do Sistema

## Visão Geral

Sistema web para análise de logs VMware com arquitetura baseada em Next.js 16, utilizando App Router, Firestore para persistência e componentes reutilizáveis.

## Fluxo de Dados

```
Upload → Parser → Normalizador → Firestore → Timeline → Drilldown → Análise
```

## Componentes Principais

### Frontend

- **Next.js 16 App Router**: Roteamento e renderização
- **React Server Components**: Para performance
- **Client Components**: Para interatividade
- **Tailwind CSS v4**: Estilização

### Backend

- **Next.js API Routes**: Endpoints para upload e processamento
- **Firestore**: Banco de dados NoSQL
- **Parsers**: Processamento de logs por tipo VMware

## Estrutura de Coleções Firestore

- `logs`: Logs normalizados
- `components`: Componentes extraídos
- `files`: Metadados de arquivos uploadados
- `layouts`: Layouts customizados do page builder

## Segurança

- Validação de uploads
- Sanitização de dados
- Rate limiting
- Headers de segurança
- CORS configurado
