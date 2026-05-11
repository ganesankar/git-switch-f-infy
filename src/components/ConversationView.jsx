import { Box, Text, Timeline } from '@primer/react';
import ConversationCard from './ConversationCard.jsx';
import MergeBox from './MergeBox.jsx';
import GiscusComments from './GiscusComments.jsx';
import { timelineEvents } from '../site.config.js';

const Bold = ({ children }) => (
  <Text sx={{ fontWeight: 'bold' }}>{children}</Text>
);

// `parts` is the data-only shape from site.config.js: an array of plain
// strings and `{ bold: '...' }` objects. Render strings as text and bold
// fragments as a Primer <Text fontWeight="bold">.
function renderBody(parts) {
  return parts.map((part, i) =>
    typeof part === 'string'
      ? <span key={i}>{part}</span>
      : <Bold key={i}>{part.bold}</Bold>
  );
}

export default function ConversationView({ posts, author, mergeRows }) {
  if (posts.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          color: 'fg.muted',
          textAlign: 'center',
        }}
      >
        No posts yet. Drop a markdown file into <code>src/posts/</code> named{' '}
        <code>YYYY-MM-DD-slug.md</code> and it'll appear here.
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {posts.map((post) => (
          <ConversationCard
            key={post.filename}
            post={post}
            author={post.author || author}
          />
        ))}
      </Box>

      <Box sx={{ px: 8, my: -3 }}>
        <Timeline>
          {timelineEvents.map(({ id, icon: Icon, iconLabel, badgeSx, body }) => (
            <Timeline.Item key={id}>
              <Timeline.Badge sx={badgeSx}>
                <Icon aria-label={iconLabel} />
              </Timeline.Badge>
              <Timeline.Body>{renderBody(body)}</Timeline.Body>
            </Timeline.Item>
          ))}
          <Timeline.Break />
        </Timeline>
      </Box>

      <Box sx={{ pl: 6 }}>
        &nbsp;
        <MergeBox rows={mergeRows} />
      </Box>

      <Box id="comment-section" sx={{ py: 4, pl: 6 }}>
        <GiscusComments />
      </Box>
    </>
  );
}
