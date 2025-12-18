# Deployment

## Ambiente de Desenvolvimento

1. Instalar dependências: `npm install`
2. Configurar `.env.dev` com credenciais Firebase (já configurado)
3. Executar: `npm run dev`
4. Acessar: http://localhost:3000

## Configuração do Firebase

O projeto está configurado com as seguintes credenciais de desenvolvimento:

- **Project ID**: `vmw-analysis-d308f`
- **Auth Domain**: `vmw-analysis-d308f.firebaseapp.com`
- **Storage Bucket**: `vmw-analysis-d308f.firebasestorage.app`

**Importante**: O Firebase está em modo desenvolvimento sem regras de segurança. Isso deve ser mantido até que o projeto esteja pronto para produção.

## Ambiente de Produção (Vercel)

### Configuração Inicial

1. **Conectar repositório à Vercel**:
   - Acesse [Vercel Dashboard](https://vercel.com/dashboard)
   - Clique em "Add New Project"
   - Conecte o repositório: `https://github.com/vinisantoro/vmw-log-analysis`
   - Nome do projeto: `vmw-log-analysis`

2. **Configurar variáveis de ambiente na Vercel**:
   - Vá em Settings > Environment Variables
   - Adicione todas as variáveis do `.env.dev`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_APP_URL` (use o domínio da Vercel ou o customizado)
     - `NEXT_PUBLIC_MAX_FILE_SIZE`
     - `NEXT_PUBLIC_ALLOWED_FILE_TYPES`

3. **Configurar domínio customizado**:
   - Vá em Settings > Domains
   - Adicione: `vmw-log-analysis.dailytech.bits`
   - Siga as instruções de DNS fornecidas pela Vercel
   - Configure os registros DNS no provedor do domínio

### Deploy Automático

O deploy automático está configurado via Git:
- Push para `main` → Deploy de produção
- Push para outras branches → Preview deployments

### Build

```bash
npm run build
npm start
```

## Variáveis de Ambiente Necessárias

### Desenvolvimento (`.env.dev`)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIRESTORE_DATABASE_URL` (opcional)
- `NEXT_PUBLIC_APP_URL` (http://localhost:3000)
- `NEXT_PUBLIC_MAX_FILE_SIZE` (10485760 = 10MB)
- `NEXT_PUBLIC_ALLOWED_FILE_TYPES` (.log,.txt)

### Produção (Vercel)
- Mesmas variáveis acima, mas com:
  - `NEXT_PUBLIC_APP_URL` = `https://vmw-log-analysis.dailytech.bits`

## Domínio Customizado

- **Domínio**: `vmw-log-analysis.dailytech.bits`
- **Configuração**: Via Vercel Dashboard > Settings > Domains
- **SSL**: Automático via Vercel (Let's Encrypt)

## Próximos Passos para Produção

1. Configurar regras de segurança do Firestore
2. Configurar autenticação (quando necessário)
3. Revisar e atualizar variáveis de ambiente de produção
4. Configurar monitoramento e alertas
5. Revisar configurações de segurança
