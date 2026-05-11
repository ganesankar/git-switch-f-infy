import { Box, Avatar, Text, IconButton } from '@primer/react';
import {
  KebabHorizontalIcon,
  CopilotIcon,
  ShieldIcon,
} from '@primer/octicons-react';

const ICON_AVATARS = {
  copilot: { Icon: CopilotIcon, bg: 'linear-gradient(135deg, #1f2328, #4a4f56)' },
  shield:  { Icon: ShieldIcon,  bg: 'linear-gradient(135deg, #0969da, #0a3069)' },
};

const DTF = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' });

function AuthorAvatar({ author }) {
  if (author.avatarUrl) {
    return <Avatar src={author.avatarUrl} alt={author.name} size={32} />;
  }
  const iconCfg = author.icon && ICON_AVATARS[author.icon];
  const background =
    iconCfg?.bg || 'linear-gradient(135deg, #1f6feb, #8957e5)';
  return (
    <Box
      aria-label={author.name}
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background,
        color: '#fff',
        fontWeight: 600,
        fontSize: 12,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {iconCfg ? <iconCfg.Icon size={16} /> : author.initials}
    </Box>
  );
}

export default function ConversationCard({ post, author }) {
  return (
    <Box
      as="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: '40px minmax(0, 1fr)',
        gap: 2,
        mb: 3,
      }}
    >
      <AuthorAvatar author={author} />

      <Box
        sx={{
          minWidth: 0,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          bg: 'canvas.default',
          position: 'relative',
        }}
      >
        <Box
          className="timeline-comment--caret"
          sx={{
            bg: 'canvas.subtle',
            borderBottom: '1px solid',
            borderColor: 'border.default',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'fg.muted',
            fontSize: 1,
          }}
        >
          <Text sx={{ color: 'fg.default', fontWeight: 600 }}> {author.name}</Text>
          <Text sx={{ color: 'fg.subtle' }}>· {DTF.format(post.date)}</Text>
          <Box sx={{ flex: 1 }} />
          <IconButton
            icon={KebabHorizontalIcon}
            aria-label="More"
            size="small"
            variant="invisible"
          />
        </Box>

        <Box sx={{ p: 3 }}> 
          {/* Pre-compiled HTML from src/posts/*.md (Shiki-highlighted at build) */}
          <Box className="gl-md" dangerouslySetInnerHTML={{ __html: post.html }} />

       
        </Box>
      </Box>
    </Box>
  );
}
