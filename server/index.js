import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_DATA } from '../src/data.js';

const app = express();
const port = Number(process.env.API_PORT || 3001);
const here = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(here, 'data', 'objectives.json');
const adminPassword = process.env.ADMIN_PASSWORD;

app.use(express.json({ limit: '20kb' }));
app.use(session({
  name: 'valorant-race-admin',
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

async function readStore() {
  try { return JSON.parse(await fs.readFile(dataFile, 'utf8')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const initial = { objectives: INITIAL_DATA.objectives, history: {} };
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(initial, null, 2));
    return initial;
  }
}

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: 'Acesso administrativo necessário.' });
}

app.get('/api/objectives', async (_req, res, next) => {
  try { res.json(await readStore()); } catch (error) { next(error); }
});

app.get('/api/auth/me', (req, res) => res.json({ authenticated: Boolean(req.session?.isAdmin) }));

app.post('/api/auth/login', (req, res) => {
  if (!adminPassword) return res.status(503).json({ error: 'Configure ADMIN_PASSWORD no arquivo .env do servidor.' });
  if (typeof req.body?.password !== 'string' || req.body.password !== adminPassword) return res.status(401).json({ error: 'Senha incorreta.' });
  req.session.isAdmin = true;
  return req.session.save(error => error ? res.status(500).json({ error: 'Não foi possível iniciar a sessão.' }) : res.json({ authenticated: true }));
});

app.post('/api/auth/logout', (req, res) => req.session.destroy(() => res.json({ authenticated: false })));

app.put('/api/objectives/:playerId', requireAdmin, async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const descriptions = req.body?.objectives;
    if (!INITIAL_DATA.players.some(player => player.id === playerId)) return res.status(404).json({ error: 'Jogador não encontrado.' });
    if (!Array.isArray(descriptions) || descriptions.length !== 5 || descriptions.some(value => typeof value !== 'string' || !value.trim() || value.length > 140)) {
      return res.status(400).json({ error: 'Informe exatamente cinco objetivos, com até 140 caracteres cada.' });
    }
    const store = await readStore();
    const previous = store.objectives[playerId] || [];
    const history = store.history[playerId] || [];
    descriptions.forEach((description, index) => {
      if (previous[index] && previous[index] !== description.trim()) history.push({ description: previous[index], status: 'Substituído', changedAt: new Date().toISOString() });
    });
    store.objectives[playerId] = descriptions.map(value => value.trim());
    store.history[playerId] = history;
    await fs.writeFile(dataFile, JSON.stringify(store, null, 2));
    return res.json(store);
  } catch (error) { return next(error); }
});

app.listen(port, () => {
  console.log(`VALORANT RACE API disponível em http://localhost:${port}`);
  if (!adminPassword) console.warn('Configure ADMIN_PASSWORD no .env para habilitar o login administrativo.');
});
