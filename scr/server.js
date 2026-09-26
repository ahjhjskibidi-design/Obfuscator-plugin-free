/**
 * Lua Obf — Server entry point.
 * Starts Express, serves /public, mounts /api.
 */

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRouter from './api.js';
import { errorHandler, requestLogger } from './middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 3000;

const app = express();

// Trust proxy (Codespaces, Railway, etc.)
app.set('trust proxy', 1);

// Body parser — Lua scripts can be large
app.use(express.json({ limit: '10mb' }));
app.use(express.text({ limit: '10mb', type: 'text/plain' }));

// CORS — allow any origin for the API
app.use(cors());

// Request logging
app.use(requestLogger);

// Serve frontend
app.use(express.static(path.join(ROOT, 'public'), {
  etag: true,
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));

// API routes
app.use('/api', apiRouter);

// Docs redirect
app.get('/docs', (req, res) => {
  res.redirect('https://github.com/ahjhjskibidi-design/lua-obf/tree/main/docs');
});

// Root fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'public', 'index.html'));
});

// 404 for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start
const server = app.listen(PORT, '0.0.0.0', () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`[lua-obf] listening on http://0.0.0.0:${PORT} (${env})`);
  console.log(`[lua-obf] open http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[lua-obf] SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('[lua-obf] SIGINT received, shutting down...');
  server.close(() => process.exit(0));
});

export default app;