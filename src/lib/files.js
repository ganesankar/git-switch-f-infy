// Each .md import in src/files/ is pre-compiled to
// { filename, slug, additions, html, ... } by the Vite markdown plugin.
// These files don't carry a date (they're undated artifacts like README.md
// and LICENSE.md), so we sort alphabetically — the way GitHub displays
// changed files in a PR.
//
// Each entry also gets a `path` field used for display.

const modules = import.meta.glob('../content/files/*.md', { eager: true, import: 'default' });

export function getFiles() {
  return Object.values(modules)
    .filter((p) => p && p.html)
    .map((p) => ({ ...p, path: p.filename }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}
