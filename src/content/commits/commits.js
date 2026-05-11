// Source of truth for the "Commits" tab.
//
// Each entry corresponds to one bullet from the HIGHLIGHTS section of the
// original README, in conventional-commits format:
//   `<type>(<scope>): <subject> <emoji>`
//
// Dates are approximations of when each chapter actually happened in the
// 2018 → 2025 arc, so the Commits tab groups them sensibly by month/year.

export const commits = [
  // Tip of the branch — the farewell tag itself
  {
    type: 'release',
    scope: 'farewell',
    subject: 'Farewell, with gratitude',
    emoji: '🌸',
    date: '2026-06-10',
    tags: ['HEAD -> new-endeavors', 'v1.0-farewell'],
  },

  // Final months — winding down
  { type: 'release', scope: 'production', subject: 'many launches, calm midnights — predictability earned, not given', emoji: '📦', date: '2018-11-15' },
  { type: 'experiment', scope: 'playground', subject: 'POCs, hackathons, side quests — never stopped tinkering', emoji: '🧪', date: '2022-01-01' },
  { type: 'style', scope: 'craft', subject: 'code reviews, design systems, accessibility — quality as a default', emoji: '🎨', date: '2022-01-01' },
  { type: 'hotfix', scope: 'production', subject: 'showed up for the fires, not just mine — calm hands, clear heads', emoji: '🔥', date: '2020-02-18' },
  { type: 'docs', scope: 'awards', subject: 'continuously recognized and appreciated for the work — forever humbled', emoji: '🙏', date: '2018-09-14' },

  // Mid-tenure — building, mentoring, leading
  { type: 'chore', scope: 'interviews', subject: 'brought new talent into the organization — every "yes" felt like a win', emoji: '🧑‍💻', date: '2019-11-08' },
  { type: 'merge', scope: 'friendships', subject: 'the colleagues who became family — quietly, completely, they built me', emoji: '🤝', date: '2019-01-01' },
  { type: 'ops', scope: 'rfp', subject: 'led RFPs across multiple pursuits — won some, learned from all', emoji: '📑', date: '2022-04-05' },
  { type: 'refactor', scope: 'full-stack', subject: 'UI → API → Infra → Data — given the room to learn every layer', emoji: '🔁', date: '2021-06-12' },

  // The geography arc
  { type: 'feat', scope: 'homecoming', subject: 'returned home — an unavoidable situation called me back', emoji: '🇮🇳 🏠', date: '2025-10-30' },
  { type: 'feat', scope: 'usa', subject: 'Moved to Beaverton, Nike World Headquarters — privileged to work alongside great people', emoji: '🇺🇸 ✨', date: '2024-03-15' },
  { type: 'feat', scope: 'canada', subject: 'Moved to Vancouver — explored a beautiful country', emoji: '🇨🇦 🍁', date: '2021-11-01' },
  { type: 'feat', scope: 'nike', subject: 'shipped multiple internal applications for Nike — from concept to scale', emoji: '👟', date: '2019-01-17' },
  { type: 'feat', scope: 'ajio', subject: 'Bangalore travel — built a retail B2B application for AJIO from the ground up', emoji: '🛍️', date: '2018-06-05' },

  // The first months — finding the values
  { type: 'learn', scope: '', subject: 'people > process, kindness > KPIs', emoji: '💛', date: '2018-03-15' },
  { type: 'feat', scope: 'joined', subject: 'as a Tech Lead — huge expectations, hungrier mind', emoji: '🌱', date: '2018-02-19' },
  { type: '', scope: '', subject: 'Initial commit: a stranger walked in', emoji: '👋', date: '2018-02-19' },
];
