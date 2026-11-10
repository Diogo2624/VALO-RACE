# VALORANT RACE

Página pública e somente para leitura no GitHub Pages. O placar, objetivos e histórico são carregados de `public/data/competition.json`, um arquivo versionado no próprio repositório. Não há serviço pago nem banco hospedado.

## Como o Dudu publica uma atualização

A atualização é feita no painel local. O site público não mostra controles administrativos.

1. Clone/puxe a branch `main` no computador do Dudu.
2. Na primeira vez, crie o arquivo local `.env` a partir de `.env.example` e escolha `ADMIN_PASSWORD` e `SESSION_SECRET`. Nunca envie `.env` ao GitHub.
3. No diretório do projeto, rode uma vez `npm.cmd install` e, nas sessões de edição, `npm.cmd run dev`.
4. Acesse `http://localhost:5173/`, entre em Administração e salve avaliações ou objetivos. O servidor local grava as mudanças em `public/data/competition.json`.
5. Faça commit e push desse JSON para `main` (pelo GitHub Desktop ou Git):

```powershell
git add public/data/competition.json
git commit -m "Atualiza dados da competição"
git push origin main
```

O GitHub Actions compila e publica a nova versão. Os visitantes só abrem o site; não precisam de Node.js, terminal ou servidor local. A atualização aparece depois que o workflow terminar.

## Configurar o GitHub Pages

No repositório, abra **Settings → Pages → Build and deployment** e escolha **GitHub Actions** como fonte. A URL padrão do projeto é `https://diogo2624.github.io/VALO-RACE/`.

## Acesso e privacidade

O repositório é público, então `public/data/competition.json` e seu histórico de commits também são públicos. Qualquer pessoa pode ler os resultados; somente colaboradores com permissão de escrita no GitHub podem enviar atualizações para `main`. O site publicado não recebe gravações do navegador.

## Arquivos principais

- `src/App.jsx`: painel público e formulário de administração local.
- `public/data/competition.json`: fonte versionada dos dados compartilhados.
- `server/index.js`: serviço local autenticado que edita o JSON.
- `.github/workflows/pages.yml`: build e publicação automática do Pages após push em `main`.
