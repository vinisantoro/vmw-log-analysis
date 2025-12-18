# Deployment

## Ambiente de Desenvolvimento

1. Instalar dependências: `npm install`
2. Configurar `.env.dev` com credenciais Firebase
3. Executar: `npm run dev`
4. Acessar: http://localhost:3000

## Ambiente de Produção (Vercel)

1. Conectar repositório à Vercel
2. Configurar variáveis de ambiente na Vercel
3. Deploy automático via Git push
4. Configurar domínio customizado (opcional)

## Variáveis de Ambiente Necessárias

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIRESTORE_DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_MAX_FILE_SIZE`
- `NEXT_PUBLIC_ALLOWED_FILE_TYPES`

## Build

```bash
npm run build
npm start
```
