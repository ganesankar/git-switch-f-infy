// Single source of truth for the page header, repo identity, status,
// merge-box copy, lock banner, giscus, plus the lists of items rendered by
// the top bar, repo nav, PR sub-nav, conversation timeline, and sidebar.
// Edit values here — components consume from this file.

import {
  CommentDiscussionIcon,
  GitCommitIcon,
  CheckCircleIcon,
  FileDiffIcon,
  CodeIcon,
  MailIcon,
  GitPullRequestIcon,
  PencilIcon,
  ProjectIcon,
  BookIcon,
  EyeIcon,
  CheckIcon,
  GitPullRequestClosedIcon,
} from '@primer/octicons-react';
import {
  IoEarth,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoSnapchat,
} from 'react-icons/io5';
import { BsTwitterX, BsTelegram } from 'react-icons/bs';

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
      avatarUrl: 'https://cdn-icons-png.flaticon.com/32/12208/12208150.png',
      icon: 'copilot',
    },
    infyMgmt: {
      name: 'Scan at Source',
      handle: 'infy-mgmt',
      initials: 'IM',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/32/9195/9195850.png',
      icon: 'shield',
    },
  },

  // Map a conversation file slug -> author key from `authors` above.
  // The slug is the filename minus the `YYYY-MM-DD-` date prefix and `.md`.
  postAuthors: {
    '1-init': 'ganesan',
    '2-copilot': 'copilot',
    '3-approved': 'infyMgmt',
  },

  // External links shown in the footer and elsewhere.
  links: {
    linkedin: 'https://www.linkedin.com/in/ganesankar/',
    website: 'https://ganesankar.dev',
    blog: 'https://ganesan.dev/blog',
    about: 'https://about.me/ganesankar/',
    mailto: 'mailto:ganesank@live.com?subject=Hello',
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
  crossorigin: 'anonymous',
  loading: 'lazy',
};

// ---------- PR sub-nav tabs ----------

export const TAB_IDS = {
  conversation: 'conversation',
  commits: 'commits',
  checks: 'checks',
  files: 'files',
};

export const prTabs = [
  { id: TAB_IDS.conversation, label: 'Conversation',    icon: CommentDiscussionIcon },
  { id: TAB_IDS.commits,      label: 'Commits',         icon: GitCommitIcon },
  { id: TAB_IDS.checks,       label: 'Checks',          icon: CheckCircleIcon },
  { id: TAB_IDS.files,        label: 'Files changed',   icon: FileDiffIcon },
];

// ---------- Repo-level nav (under the topbar) ----------

export const repoNavItems = [
  { label: 'Code',          icon: CodeIcon,            href: 'https://github.com/ganesankar/git-switch-f-infy' },
  { label: 'Issues',        icon: MailIcon,            href: 'https://github.com/ganesankar/git-switch-f-infy/issues', count: 0 },
  { label: 'Pull requests', icon: GitPullRequestIcon,  href: 'https://ganesankar.github.io/git-switch-f-infy/',         count: 1, active: true },
  { label: 'Writing',       icon: PencilIcon,          href: 'https://ganesan.dev/blog' },
  { label: 'History',       icon: ProjectIcon,         href: 'https://ganesan.dev/resume' },
  { label: 'Wiki',          icon: BookIcon,            href: 'http://ganesan.dev' },
];

// ---------- Topbar social menu + primary links ----------

export const topbarLinks = {
  website: { url: 'https://www.ganesan.dev', label: 'Website', icon: IoEarth },
  mail:    { url: site.links.mailto,         label: 'Mail',    ariaLabel: 'Email Ganesan' },
};

export const socialLinks = [
  { icon: IoLogoLinkedin,  title: 'LinkedIn',  url: 'https://www.linkedin.com/in/ganesankar/' },
  { icon: IoLogoGithub,    title: 'Github',    url: 'https://github.com/ganesankar' },
  { icon: IoLogoFacebook,  title: 'Facebook',  url: 'https://www.facebook.com/ganesankars' },
  { icon: IoLogoInstagram, title: 'Instagram', url: 'https://www.instagram.com/ganesankar' },
  { icon: BsTwitterX,      title: 'Twitter',   url: 'https://www.twitter.com/ganesankar' },
  { icon: IoLogoSnapchat,  title: 'Snapchat',  url: 'https://www.snapchat.com/add/ganesankar' },
  { icon: BsTelegram,      title: 'Telegram',  url: 'https://t.me/ganesankar' },
];

// ---------- Sidebar (right rail) — reviewers ----------

export const reviewers = [
  { name: 'Copilot',                avatar: 'https://cdn-icons-png.flaticon.com/32/12208/12208150.png', status: 'comment'  },
  { name: 'Security Scan Bot',      avatar: 'https://cdn-icons-png.flaticon.com/32/9195/9195850.png',   status: 'approved' },
  { name: 'Everyone in this Journey', avatar: 'https://cdn-icons-png.flaticon.com/64/4570/4570603.png', status: 'pending'  },
];

// ---------- Conversation timeline events ----------
//
// `body` is an array of mixed plain strings and `{ bold: '...' }` objects.
// The component renders strings as text and { bold } as a bold <Text>. This
// keeps the config file pure data (no JSX).

export const timelineEvents = [
  {
    id: 'commit',
    icon: GitCommitIcon,
    iconLabel: 'Commit',
    body: [{ bold: 'Ganesan Karuppaiya' }, ' committed 4 files'],
  },
  {
    id: 'review-requested',
    icon: EyeIcon,
    iconLabel: 'Review requested',
    body: [
      { bold: 'Ganesan Karuppaiya' },
      ' requested a review from ',
      { bold: 'Everyone in this Journey' },
    ],
  },
  {
    id: 'approved',
    icon: CheckIcon,
    iconLabel: 'Approved',
    badgeSx: { bg: 'success.emphasis', color: 'fg.onEmphasis' },
    body: [{ bold: 'Copilot' }, ' approved these changes with comments'],
  },
  {
    id: 'unmerged',
    icon: GitPullRequestClosedIcon,
    iconLabel: 'Unmerged',
    badgeSx: { bg: 'closed.emphasis', color: 'fg.onEmphasis' },
    body: [{ bold: 'Ganesan Karuppaiya' }, ' unmerged this pull request'],
  },
];
