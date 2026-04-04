import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');
const routes = ['about', 'services', 'request', 'privacy', 'terms', 'cookies'];

for (const route of routes) {
  const sourceFile = path.join(outDir, route, 'index.html');
  const targetFile = path.join(outDir, `${route}.html`);

  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Missing exported page for route "${route}" at ${sourceFile}`);
  }

  fs.copyFileSync(sourceFile, targetFile);
}
