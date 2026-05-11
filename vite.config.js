import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const FILENAME_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/i;

// Compile every src/posts/*.md to a JS module exporting { filename, slug,
// date, title, html } where `html` is fully syntax-highlighted by Shiki at
// build time (rehype-pretty-code, github-dark-dimmed theme).
function markdownPlugin() {
  let processor;

  function getProcessor() {
    if (!processor) {
      processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePrettyCode, {
          theme: 'github-light',
          keepBackground: true,
        })
        .use(rehypeStringify, { allowDangerousHtml: true });
    }
    return processor;
  }

  return {
    name: 'git-switch-f-infy:markdown',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;

      const filename = path.basename(id);
      const m = filename.match(FILENAME_DATE_RE);

      // Dated filenames (YYYY-MM-DD-slug.md) get a real date and stripped slug.
      // Undated filenames (README.md, LICENSE.md, etc.) keep their full name as
      // the slug and get a null date — used by non-timeline tabs like Files.
      let date, slug;
      if (m) {
        date = new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00Z`).toISOString();
        slug = m[4];
      } else {
        date = null;
        slug = filename.replace(/\.md$/i, '');
      }

      const titleMatch = code.match(/^#\s+(.+?)\s*$/m);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');
      const body  = titleMatch ? code.replace(/^#\s+.+?\s*\r?\n/, '') : code;

      const file = await getProcessor().process(body);
      const html = String(file);

      // Used by the "Files changed" tab as the +additions diff stat.
      const additions = body.split('\n').filter((l) => l.trim().length > 0).length;

      const meta = { filename, slug, date, title, additions, html };
      return { code: `export default ${JSON.stringify(meta)};`, map: null };
    },
  };
}

export default defineConfig({
  // BASE_PATH is injected by the GitHub Pages workflow (e.g. "/git-switch-f-infy/").
  // Falls back to "/" so `npm run dev` and `npm run preview` keep working locally.
  base: process.env.BASE_PATH || '/',
  plugins: [markdownPlugin(), react()],
  server: { port: 3000, open: true },
});
