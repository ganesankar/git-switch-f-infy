import { Box } from '@primer/react';
import ConversationCard from './ConversationCard.jsx';
import MergeBox from './MergeBox.jsx';
import GiscusComments from './GiscusComments.jsx';
import { useRef } from 'react';

export default function ConversationView({ posts, author, mergeRows }) {
  const bottomRef = useRef(null);

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
      {posts.map((post) => (
        <ConversationCard
          key={post.filename}
          post={post}
          author={post.author || author}
        />
      ))}
      <MergeBox rows={mergeRows} />
      <Box ref={bottomRef} id="comment-section" sx={{ py: 4 }}>
        <GiscusComments />
      </Box>
    </>
  );
}
