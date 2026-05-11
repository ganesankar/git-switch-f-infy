# git-switch-f-infy

[![Deploy to GitHub Pages](https://github.com/ganesankar/git-switch-f-infy/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/ganesankar/git-switch-f-infy/actions/workflows/deploy.yml)

A single-page React app that displays a chronological log of markdown files,
styled to look like a GitHub Pull Request conversation.

Built with **Vite**, **React 18**, and **[Primer React](https://primer.style/react)**
(GitHub's design system). No router, no state library — just plain `useState`.

---

## Quick start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

```bash
npm run build      # production build → dist/
npm run preview    # preview the prod build locally
```

---

## Adding a post

1. Create a new file under `src/posts/` named:

   ```
   YYYY-MM-DD-some-slug.md
   ```

   The date prefix is required — it controls the timeline order (oldest first).

2. Write your markdown. The first `# H1` becomes the post title.
   Everything below is rendered as the comment body.

3. Save. Vite hot-reloads and the post appears as a new comment card on the timeline.

That's it. No frontmatter required.

---

## Configuration

All site-level config (repo name, PR title, status, branches, default author,
giscus credentials) lives in **one file**: [`src/site.config.js`](./src/site.config.js).

Edit there — no other file needs to change.

### PR status options

`prStatus` in `site.config.js` accepts: `'open'`, `'draft'`, `'merged'`, `'closed'`, `'unmerged'`.

---

## Enabling comments (giscus)

[giscus](https://giscus.app) backs the comment box with **GitHub Discussions** and
themes itself to match GitHub's UI.

### 1. Prerequisites on the repo (one-time)

All three must be true on the repo you point giscus at:

- **Repo is public.** giscus reads via the unauthenticated GitHub API.
  Settings → General → Danger Zone → Change visibility.
- **Discussions are enabled.** Settings → General → Features → tick **Discussions**.
- **The giscus GitHub App is installed on it.** Visit
  <https://github.com/apps/giscus> → Install/Configure → "Only select repositories"
  → choose your repo.

If any one is missing, the configurator on the next step will print the exact error.

### 2. Get your IDs from giscus.app

Open <https://giscus.app> and fill in:

| Field | Use |
|---|---|
| Repository | `<owner>/<repo>` (e.g. `ganesankar/git-switch-f-infy`) |
| Page ↔ Discussions Mapping | **Discussion title contains page pathname** (matches `mapping: 'pathname'`) |
| Discussion Category | **General** (or any existing announcement-style category) |
| Features | Tick **Enable reactions for the main post** |
| Theme | **Light** |

The page generates a `<script>` snippet at the bottom. You don't need the
`<script>` itself — only the four `data-*` attributes inside it.

### 3. Map the script attributes into `src/site.config.js`

| `<script>` attribute | `site.config.js` key |
|---|---|
| `data-repo` | `repo` |
| `data-repo-id` | `repoId` |
| `data-category` | `category` |
| `data-category-id` | `categoryId` |

> **Gotcha:** `repo` must be the slug `owner/name` (e.g. `ganesankar/git-switch-f-infy`) —
> **not** a full `https://github.com/...` URL. A URL there silently produces a
> blank iframe instead of an error.

Filled-in example:

```js
export const giscus = {
  repo:        'ganesankar/git-switch-f-infy',
  repoId:      'R_kgDOXXXXXXX',          // from data-repo-id
  category:    'General',
  categoryId:  'DIC_kwDOXXXXXXXXXX',     // from data-category-id
  mapping:     'pathname',
  reactionsEnabled: '1',
  emitMetadata:     '0',
  inputPosition:    'bottom',
  theme:            'light',
  lang:             'en',
};
```

### 4. Verify

Refresh the dev server. At the bottom of the **Conversation** tab you should
see the giscus iframe load with "0 comments" and a sign-in-with-GitHub box.

Until `repo`, `repoId`, and `categoryId` are all filled in, a dashed
"Comments are not configured yet" placeholder is shown instead — see
[`src/components/GiscusComments.jsx`](./src/components/GiscusComments.jsx).

---

## Project layout

```
git-switch-f-infy/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx              ← React entry
│   ├── App.jsx               ← top-level layout
│   ├── site.config.js        ← single source of truth for site config
│   ├── styles.css            ← markdown body styles + global resets
│   ├── lib/
│   │   └── posts.js          ← loads & sorts .md files at build time
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── RepoNav.jsx
│   │   ├── PrHeader.jsx
│   │   ├── PrSubNav.jsx
│   │   ├── ConversationCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── GiscusComments.jsx
│   └── posts/                ← drop new .md files here
│       ├── 2024-01-15-getting-started.md
│       ├── 2024-02-20-a-month-later.md
│       └── 2024-04-01-spring-update.md
```

---

## Markdown highlighting

Code blocks are highlighted with **[rehype-pretty-code](https://rehype-pretty.pages.dev/)**
(powered by Shiki), themed with `github-dark-dimmed` to match Primer and giscus.
Highlighting happens **at build time** — Shiki never ships to the browser.

A small custom Vite plugin in [`vite.config.js`](./vite.config.js) intercepts every
`*.md` import, runs it through `unified → remark-gfm → remark-rehype → rehype-pretty-code`,
and exports `{ filename, slug, date, title, html }` as a normal JS module.

Supported features inside code fences (see `src/posts/2024-04-01-spring-update.md`):

- `` ```js title="filename.js" `` — file-title bar above the block
- `` ```js showLineNumbers `` — gutter line numbers
- `` ```js {1-3,5} `` — highlight specific lines
- `` ```js /word/ `` — highlight matching characters
- Inline highlighted code: `` `const x = 1{:js}` ``

---

## Dependencies

### Runtime (ships to the browser)

| Package | Why |
|---|---|
| `@primer/react` | GitHub's design system (Box, Heading, UnderlineNav, Avatar, Label, Button, …) |
| `@primer/octicons-react` | Icons (peer dependency of Primer) |
| `styled-components` | Peer dependency of Primer |
| `@giscus/react` | Comment widget backed by GitHub Discussions |
| `react`, `react-dom` | The framework |

### Build-time only (never ships)

| Package | Why |
|---|---|
| `vite`, `@vitejs/plugin-react` | Build & dev server |
| `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-stringify` | Markdown → HTML pipeline |
| `rehype-pretty-code`, `shiki` | Editor-grade syntax highlighting (github-dark-dimmed) |
