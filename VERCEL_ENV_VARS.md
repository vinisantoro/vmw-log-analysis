# Variáveis de Ambiente para Vercel

## Como Adicionar na Vercel

1. Acesse o projeto na Vercel: https://vercel.com/dashboard
2. Vá em **Settings** > **Environment Variables**
3. Adicione cada variável abaixo (uma por uma ou importe em lote)

## Variáveis Necessárias

Copie e cole estas variáveis na Vercel:

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

## Configuração por Ambiente

Configure para **Production**, **Preview** e **Development**:
- Clique em cada variável
- Marque os ambientes desejados
- Salve

## Importante

- `NEXT_PUBLIC_APP_URL` deve ser `https://vmw-log-analysis.dailytech.bits` em produção
- Para preview, você pode usar a URL da Vercel temporária
- Após adicionar as variáveis, faça um novo deploy

## Verificação

Após o deploy, verifique se:
1. A aplicação carrega corretamente
2. O Firebase está conectado (verifique o console do navegador)
3. O upload de logs funciona

