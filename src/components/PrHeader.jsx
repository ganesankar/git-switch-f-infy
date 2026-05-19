import { Box, Heading, Text, Token, Button } from '@primer/react';
import {
  PencilIcon,
  GitPullRequestIcon,
  GitPullRequestDraftIcon,
  GitMergeIcon,
  GitPullRequestClosedIcon,
} from '@primer/octicons-react';

const STATUS = {
  open:     { label: 'Open',     bg: '#238636', Icon: GitPullRequestIcon },
  draft:    { label: 'Draft',    bg: '#6e7681', Icon: GitPullRequestDraftIcon },
  merged:   { label: 'Merged',   bg: '#8957e5', Icon: GitMergeIcon },
  closed:   { label: 'Closed',   bg: '#da3633', Icon: GitPullRequestClosedIcon },
  unmerged: { label: 'Unmerged', bg: '#d29922', Icon: GitPullRequestClosedIcon },
};

const STATUS_VERB = {
  open:     'wants to add posts to',
  draft:    'is preparing to add posts to',
  merged:   'merged this pull request — ',
  closed:   'closed this pull request — ',
  unmerged: 'opened this pull (out) request with',
};

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.open;
  const { Icon } = s;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: s.bg,
        color: '#ffffff',
        fontWeight: 500,
        fontSize: 12,
        padding: '8px 10px',
        borderRadius: 999,
        lineHeight: 1,
      }}
    >
      <Icon size={14} />
      {s.label}
    </span>
  );
}

export default function PrHeader({
  title,
  titleEmoji,
  number,
  status = 'draft',
  baseBranch,
  headBranch,
  authorName,
  authorHandle,
  commitsLabel,
  onSubmitReview,
}) {
  const verb = STATUS_VERB[status] || STATUS_VERB.open;
  const displayAuthor = authorHandle ? `${authorName} (${authorHandle})` : authorName;

  return (
    <Box sx={{ maxWidth: 1280, mx: 'auto', px: 4, pt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Heading
          as="h1"
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: 5,
            fontWeight: 'normal',
            lineHeight: 1.25,
            color: 'fg.default',
            wordBreak: 'break-word',
          }}
        >
          {title}{' '}
          <Box as="span" sx={{ color: 'fg.muted', fontWeight: 300 }}>
            #{number}
          </Box>
          {titleEmoji && (
            <Box as="span" sx={{ ml: 2, fontSize: 4 }}>
              {titleEmoji}
            </Box>
          )}
        </Heading>

        {onSubmitReview && (
          <Button variant="primary" leadingVisual={PencilIcon} onClick={onSubmitReview}>
            Submit Comment
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          color: 'fg.muted',
          fontSize: 1,
          pb: 3,
        }}
      >
        <StatusBadge status={status} />
        <Text>
          <Box
            as="a"
            href="#"
            sx={{ color: 'accent.fg', textDecoration: 'none', fontWeight: 600 }}
          >
            {displayAuthor}
          </Box>
          {' '}
          {verb}
          {commitsLabel && (
            <>
              {' '}
              <Box as="strong" sx={{ color: 'fg.default' }}>{commitsLabel}</Box>
              {' '}into{' '}
            </>
          )}
          {!commitsLabel && ' into '}
          <Token text={baseBranch} sx={{ fontFamily: 'mono' }} />
          {' from '}
          <Token text={headBranch} sx={{ fontFamily: 'mono' }} />
        </Text>
      </Box>
    </Box>
  );
}
