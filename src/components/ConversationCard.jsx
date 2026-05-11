import { Box, Avatar, Text, IconButton, Label } from '@primer/react';
import {
  KebabHorizontalIcon,
  SmileyIcon,
  CopilotIcon,
  ShieldIcon,
} from '@primer/octicons-react';

const ICON_AVATARS = {
  copilot: { Icon: CopilotIcon,  bg: 'linear-gradient(135deg, #1f2328, #4a4f56)' },
  shield:  { Icon: ShieldIcon,   bg: 'linear-gradient(135deg, #0969da, #0a3069)' },
};

const RTF = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const DTF = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' });

function relativeTime(date) {
  const diffMs  = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr  = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  const diffMon = Math.round(diffDay / 30);
  const diffYr  = Math.round(diffDay / 365);

  if (Math.abs(diffYr) >= 1)  return RTF.format(diffYr,  'year');
  if (Math.abs(diffMon) >= 1) return RTF.format(diffMon, 'month');
  if (Math.abs(diffDay) >= 1) return RTF.format(diffDay, 'day');
  if (Math.abs(diffHr) >= 1)  return RTF.format(diffHr,  'hour');
  if (Math.abs(diffMin) >= 1) return RTF.format(diffMin, 'minute');
  return RTF.format(diffSec, 'second');
}

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
        gridTemplateColumns: '40px 1fr',
        gap: 2,
        mb: 3,
      }}
    >
      <AuthorAvatar author={author} />

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          bg: 'canvas.default',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Speech-bubble triangle pointing to the avatar */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: -8,
            top: 12,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid',
            borderRightColor: 'border.default',
          }}
        />

        <Box
          sx={{
            bg: 'canvas.subtle',
            borderBottom: '1px solid',
            borderColor: 'border.default',
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
