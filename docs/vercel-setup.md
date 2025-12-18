# Configuração Vercel - Passo a Passo

## 1. Conectar Repositório

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em "Add New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub (se ainda não estiver conectada)
5. Selecione o repositório: `vinisantoro/vmw-log-analysis`
6. Clique em "Import"

## 2. Configurar Projeto

### Configurações do Projeto:
- **Project Name**: `vmw-log-analysis`
- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `./` (raiz)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install` (padrão)

## 3. Configurar Variáveis de Ambiente

Na tela de configuração, vá para "Environment Variables" e adicione:

### Production, Preview e Development:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC5t6iHbnte4w2FckxccLcRndIxYOWwrl0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vmw-analysis-d308f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vmw-analysis-d308f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vmw-analysis-d308f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=975540500752
NEXT_PUBLIC_FIREBASE_APP_ID=1:975540500752:web:b37be551004df09eba4d95
NEXT_PUBLIC_APP_URL=https://vmw-log-analysis.dailytech.bits
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=.log,.txt
NODE_ENV=production
```

**Nota**: Para Preview e Development, você pode usar URLs diferentes se necessário.

## 4. Deploy Inicial

1. Clique em "Deploy"
2. Aguarde o build completar (pode levar alguns minutos)
3. Após o deploy, você receberá uma URL temporária da Vercel (ex: `vmw-log-analysis.vercel.app`)

## 5. Configurar Domínio Customizado

1. Após o deploy, vá em **Settings > Domains**
2. Clique em "Add Domain"
3. Digite: `vmw-log-analysis.dailytech.bits`
4. Clique em "Add"

### Configuração DNS

A Vercel fornecerá instruções de DNS. Você precisará adicionar um registro no seu provedor de DNS:

**Opção 1 - A Record (Recomendado)**:
```
Type: A
Name: vmw-log-analysis (ou @ se for domínio raiz)
Value: [IP fornecido pela Vercel]
```

**Opção 2 - CNAME (Mais fácil)**:
```
Type: CNAME
Name: vmw-log-analysis
Value: cname.vercel-dns.com
```

5. Após configurar o DNS, aguarde a propagação (pode levar até 48h, geralmente menos)
6. A Vercel configurará automaticamente o SSL (HTTPS) via Let's Encrypt

## 6. Verificar Deploy

1. Acesse `https://vmw-log-analysis.dailytech.bits`
2. Verifique se a aplicação está funcionando
3. Teste o upload de logs
4. Verifique se o Firebase está conectado corretamente

## 7. Configurações Adicionais

### Deploy Automático

Por padrão, a Vercel faz deploy automático quando você faz push para:
- `main` branch → Production
- Outras branches → Preview deployments

### Build Settings

Se necessário, você pode ajustar em **Settings > General > Build & Development Settings**

## Troubleshooting

### Erro de Build
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique os logs de build na Vercel
- Certifique-se de que `npm install` está funcionando localmente

### Erro de Firebase
- Verifique se as credenciais do Firebase estão corretas
- Certifique-se de que o Firestore está habilitado no Firebase Console
- Verifique as regras de segurança do Firestore (devem estar abertas para desenvolvimento)

### Problemas com Domínio
- Verifique se o DNS está configurado corretamente
- Use ferramentas como `dig` ou `nslookup` para verificar a propagação
- Aguarde até 48h para propagação completa

## Próximos Passos

Após configurar na Vercel:
1. Testar a aplicação em produção
2. Configurar monitoramento (opcional)
3. Configurar alertas (opcional)
4. Revisar logs de produção

