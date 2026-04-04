import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import parse from 'html-react-parser';

const contentCache = new Map();

export function getLegacyMainContent(fileName) {
  if (contentCache.has(fileName)) {
    return contentCache.get(fileName);
  }

  const filePath = path.join(process.cwd(), 'legacy', fileName);
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);
  const main = $('main').first();

  if (!main.length) {
    throw new Error(`Missing <main> in ${fileName}`);
  }

  const content = parse($.html(main));
  contentCache.set(fileName, content);
  return content;
}
