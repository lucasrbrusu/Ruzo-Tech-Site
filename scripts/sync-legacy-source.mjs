import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const publicAssetsDir = path.join(publicDir, 'assets');
const legacyDir = path.join(rootDir, 'legacy');

const legacyPages = [
  'index.html',
  'services.html',
  'about.html',
  'request.html',
  'privacy.html',
  'terms.html',
  'cookies.html',
];

const publicFiles = ['styles.css', 'robots.txt', 'sitemap.xml', 'CNAME'];

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(publicAssetsDir, { recursive: true });
fs.mkdirSync(legacyDir, { recursive: true });

for (const fileName of legacyPages) {
  fs.copyFileSync(path.join(rootDir, fileName), path.join(legacyDir, fileName));
}

for (const fileName of publicFiles) {
  fs.copyFileSync(path.join(rootDir, fileName), path.join(publicDir, fileName));
}

fs.cpSync(path.join(rootDir, 'assets'), publicAssetsDir, {
  force: true,
  recursive: true,
});
