import { Box, Heading, IconButton, Label ,Avatar} from '@primer/react';
import { CodeIcon, CopyIcon, VerifiedIcon, TagIcon } from '@primer/octicons-react';
import toast from 'react-hot-toast';

const askMe = () =>
  toast(
    "if you know me, you already know the story. if you don't — well, knowing me is the prerequisite.",
    { icon: '😏' },
  );

const MONTH = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
const DAY   = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' });
const RTF   = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

function relativeDays(date) {
  const days   = Math.round((date.getTime() - Date.now()) / 86400000);
  const months = Math.round(days / 30);
  const years  = Math.round(days / 365);
  if (Math.abs(years)  >= 1) return RTF.format(years,  'year');
  if (Math.abs(months) >= 1) return RTF.format(months, 'month');
  return RTF.format(days, 'day');
}

// djb2 → 7-char hex hash. Deterministic per commit, looks like a real short SHA.
function shortSha(seed) {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) + hash + seed.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16).padStart(7, '0').slice(0, 7);
}

function commitTitle(c) {
  let prefix = '';
  if (c.type && c.scope)      prefix = `${c.type}(${c.scope}): `;
  else if (c.type)            prefix = `${c.type}: `;
  return `${prefix}${c.subject}${c.emoji ? ' ' + c.emoji : ''}`;
}

function groupByMonth(commits) {
  const groups = new Map();
  for (const c of commits) {
    const key = MONTH.format(c.date);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  }
  return [...groups.entries()];
}

function AuthorAvatar({ author }) {
  return (
    <Box
      aria-label={author.name}
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1f6feb, #8957e5)',
        color: '#fff',
        fontWeight: 600,
        fontSize: 10,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {author.initials}
    </Box>
  );
}

function CommitRow({ commit, author, isLast }) {
  const seed  = `${commit.type}-${commit.scope}-${commit.subject}`;
  const sha   = shortSha(seed);
  const title = commitTitle(commit);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: 3,
        borderBottom: isLast ? 0 : '1px solid',
        borderColor: 'border.muted',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          as="a"
          href="#"
          sx={{
            color: 'fg.default',
            fontWeight: 600,
            fontSize: 1,
            textDecoration: 'none',
            '&:hover': { color: 'accent.fg', textDecoration: 'underline' },
          }}
        >
          {title}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, color: 'fg.muted', fontSize: 0, flexWrap: 'wrap' }}>
        <Avatar src={author.avatarUrl} alt={author.name} size={24} />
          <Box as="strong" sx={{ color: 'fg.default', fontWeight: 600 }}>
            {author.name}
          </Box>
          <Box as="span">committed {relativeDays(commit.date)}</Box>
          <Label size="small" variant="success" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <VerifiedIcon size={12} /> Verified
          </Label>
          {commit.tags?.map((t) => (
            <Label key={t} size="small" variant="accent" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <TagIcon size={12} /> {t}
            </Label>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <Box
          as="code"
          sx={{
            fontFamily: 'mono',
            fontSize: 0,
            color: 'accent.fg',
            bg: 'canvas.subtle',
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 2,
            px: 2,
            py: '2px',
          }}
        >
          {sha}
        </Box>
        <IconButton icon={CopyIcon} aria-label="Copy SHA"                   size="small" variant="invisible" onClick={askMe} />
        <IconButton icon={CodeIcon} aria-label="Browse files at this commit" size="small" variant="invisible" onClick={askMe} />
      </Box>
    </Box>
  );
}

export default function CommitsView({ commits, author }) {
  // Normalize the date strings to Date objects, then show newest first
  // (GitHub's default order on the Commits tab).
  const sorted = [...commits]
    .map((c) => ({ ...c, date: new Date(c.date) }))
    .sort((a, b) => b.date - a.date);

  const groups = groupByMonth(sorted);

  return (
    <Box>
      {groups.map(([month, items]) => (
        <Box key={month} sx={{ mb: 4 }}>
          <Heading
            as="h2"
            sx={{ fontSize: 1, fontWeight: 600, color: 'fg.muted', mb: 2 }}
          >
            Commits on {month}
          </Heading>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: 2,
              bg: 'canvas.default',
              overflow: 'hidden',
            }}
          >
            {items.map((commit, i) => (
              <CommitRow
                key={commit.subject + commit.date}
                commit={commit}
                author={author}
                isLast={i === items.length - 1}
              />
            ))}
          </Box>
          <Box sx={{ mt: 1, color: 'fg.subtle', fontSize: 0 }}>
            {items.length} commit{items.length === 1 ? '' : 's'} · most recent on {DAY.format(items[0].date)}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
