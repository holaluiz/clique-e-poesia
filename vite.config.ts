import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function uploadPlugin(): Plugin {
  return {
    name: 'hero-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-hero', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              if (dataUrl && dataUrl.startsWith('data:image/')) {
                const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const publicDir = path.resolve(import.meta.dirname, 'public');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }
                fs.writeFileSync(path.join(publicDir, 'BG 01.png'), buffer);
                fs.writeFileSync(path.join(publicDir, 'BG_01.png'), buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: '/BG 01.png' }));
                return;
              }
            } catch (err) {
              console.error(err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          res.writeHead(405).end();
        }
      });

      server.middlewares.use('/api/upload-logo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl, content } = JSON.parse(body);
              const publicDir = path.resolve(import.meta.dirname, 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              if (content) {
                // Raw SVG content - writes to the single official logo asset
                fs.writeFileSync(path.join(publicDir, 'LOGO BRANCA HORIZONTAL.svg'), content);
                const distDir = path.resolve(import.meta.dirname, 'dist');
                if (fs.existsSync(distDir)) {
                  fs.writeFileSync(path.join(distDir, 'LOGO BRANCA HORIZONTAL.svg'), content);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                return;
              } else if (dataUrl) {
                const base64Data = dataUrl.replace(/^data:image\/[^;]+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(path.join(publicDir, 'LOGO BRANCA HORIZONTAL.svg'), buffer);
                const distDir = path.resolve(import.meta.dirname, 'dist');
                if (fs.existsSync(distDir)) {
                  fs.writeFileSync(path.join(distDir, 'LOGO BRANCA HORIZONTAL.svg'), buffer);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                return;
              }
            } catch (err) {
              console.error(err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          res.writeHead(405).end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), uploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
