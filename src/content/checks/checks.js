// Source of truth for the "Checks" tab.
//
// The seven verbs from the README footer become the seven required check
// runs. All passing — this is a farewell, not a CI fail.

export const checks = [
  { name: 'checked out',  duration: '6y 9mo',  sub: 'Clone landed clean. Working tree set up with care.' },
  { name: 'collaborated', duration: '6y 9mo',  sub: 'Reviewed, paired, mentored — every PR a conversation.' },
  { name: 'committed',    duration: '6y 9mo',  sub: 'Showed up. Every day. With intent.' },
  { name: 'cherished',    duration: '6y 9mo',  sub: 'Every relationship. Every coffee chat. Every win.' },
  { name: 'celebrated',   duration: '6y 9mo',  sub: 'Launches, awards, birthdays, baby announcements.' },
  { name: 'consolidated', duration: '6y 9mo',  sub: 'Lessons merged into who I am — squashed for life.' },
  { name: 'concluding',   duration: 'moments', sub: 'Tagging this chapter — gently, gratefully.' },
];
