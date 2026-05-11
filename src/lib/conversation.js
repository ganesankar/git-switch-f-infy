// Each .md import in src/content/conversation/ is pre-compiled to
// { filename, slug, date, title, additions, html } by the Vite markdown
// plugin. We glob them, drop anything without a parsed date (the
// Conversation tab needs dates for the relative-time labels), attach the
// per-post author from site.config.js, and sort chronologically with a
// filename tie-break so same-date posts render in a stable order.

import { site } from '../site.config.js';

const modules = import.meta.glob('../content/conversation/*.md', { eager: true, import: 'default' });

function resolveAuthor(post) {
  const key = site.postAuthors?.[post.slug];
  if (key && site.authors?.[key]) return site.authors[key];
  return site.defaultAuthor;
}

export function getConversation() {
  return Object.values(modules)
    .filter((p) => p && p.html && p.date)
    .map((p) => ({
      ...p,
      date: new Date(p.date),
      author: resolveAuthor(p),
    }))
    .sort((a, b) => {
      const dateDiff = a.date - b.date;
      if (dateDiff !== 0) return dateDiff;
      return a.filename.localeCompare(b.filename);
    });
}
