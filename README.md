# VALORANT RACE

Painel web de evolução da equipe, feito com React, Vite e uma API Node/Express.

## Executar no Windows

1. Copie `.env.example` para `.env` e substitua `ADMIN_PASSWORD` por uma senha sua. Não compartilhe o `.env`.
2. Instale as dependências e inicie o app:

```powershell
npm.cmd install
npm.cmd run dev
```

3. Abra `http://localhost:5173/`. A área **Administração** solicita a senha configurada no `.env`.

O comando `npm run dev` inicia o Vite e a API. A edição dos objetivos é validada e protegida no servidor; as versões anteriores ficam em `server/data/objectives.json`. Novas avaliações guardam uma cópia dos objetivos vigentes.

## Persistência e limites atuais

Os objetivos e seu histórico ficam no arquivo JSON do servidor. Avaliações, feedbacks e outras informações continuam no `localStorage` do navegador, então ainda não sincronizam entre dispositivos. Para hospedar o app, configure HTTPS, `ADMIN_PASSWORD` e um `SESSION_SECRET` forte no ambiente do servidor. Nunca publique segredos no frontend.

## Estrutura

- `src/App.jsx`: telas, ranking, perfis, avaliações e área administrativa.
- `src/data.js`: dados iniciais e categorias.
- `src/styles.css`: identidade visual responsiva.
- `server/index.js`: autenticação de sessão e API de objetivos.
- `vite.config.js`: proxy local da API.
