// Single source of truth for the page header, repo identity, status,
// merge-box copy, lock banner, and giscus. Edit values here — no other file
// needs to change.

export const site = {
  // Topbar repo path: "<owner> / <repo>"
  owner: 'ganesankar',
  repo: 'git-switch -f infosys',
  visibility: 'public',          // adds the lock icon next to the repo path
  enterpriseTag: 'Infosys',      // small pill on the right of the topbar

  // PR-style header
  prTitle: 'git switch -c new-endeavors -f infosys',
  prTitleEmoji: '\u{1F44B}',      // shown after the title — set to '' to hide
  prNumber: 'v1.0-farewell',

  // PR status badge: 'open' | 'draft' | 'closed' | 'merged' | 'unmerged'
  prStatus: 'unmerged',

  // Branches shown in the meta line
  baseBranch: 'new-endeavors',
  headBranch: 'infosys',

  // Number of commits shown in the meta line. For the farewell page we use a
  // string so we can write '\u221E commits' (∞ commits).
  commitsLabel: '\u221E commits',

  // Default author for posts (shown on each comment card and the PR meta)
  defaultAuthor: {
    name: 'Ganesan Karuppaiya',
    handle: 'ganesankar',
    initials: 'GK',
    avatarUrl: 'https://avatars.githubusercontent.com/u/242106?v=4&size=64',
  },

  // Optional named authors used by `postAuthors` below to override the default
  // author on a per-conversation-post basis.
  authors: {
    ganesan: {
      name: 'Ganesan Karuppaiya',
      handle: 'ganesankar',
      initials: 'GK',
      avatarUrl: 'https://avatars.githubusercontent.com/u/242106?v=4&size=64',
    },
    copilot: {
      name: 'Copilot AI',
      handle: 'copilot[bot]',
      initials: 'CP',
      avatarUrl: null,
      icon: 'copilot',
    },
    infyMgmt: {
      name: 'Scan at Source',
      handle: 'infy-mgmt',
      initials: 'IM',
      avatarUrl: null,
      icon: 'shield',
    },
  },

  // Map a conversation file slug -> author key from `authors` above.
  // The slug is the filename minus the `YYYY-MM-DD-` date prefix and `.md`.
  postAuthors: {
    '1-init':     'ganesan',
    '2-copilot':  'copilot',
    '3-approved': 'infyMgmt',
  },

  // External links shown in the footer. Update these to your real URLs.
  links: {
    linkedin: 'https://www.linkedin.com/in/ganesankar/',
    website:  'https://ganesankar.dev',
  },

  // Status box shown after the timeline (replaces the green Merge button).
  mergeBox: {
    rows: [
      {
        kind: 'unmerged',
        title: 'Unmerged',
        sub: 'Closed by Ganesan Karuppaiya — the branch is preserved exactly as it is.',
      },
      {
        kind: 'muted',
        title: 'All checks have passed',
        sub: 'Lifetime of growth · friendships · gratitude — all green.',
      },
      {
        kind: 'muted',
        title: 'No conflicts with base branch',
        sub: 'Branch preserved — nothing was force-pushed away.',
      },
    ],
  },
};

// giscus configuration. While repoId/categoryId are empty, a friendly
// placeholder card is shown instead of the giscus widget.
export const giscus = {
  repo: 'ganesankar/git-switch-f-infy',
  repoId: 'R_kgDOSYufvg',
  category: 'General',
  categoryId: 'DIC_kwDOSYufvs4C8qBN',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'en',
  crossorigin:"anonymous",
  loading:"lazy"
};
