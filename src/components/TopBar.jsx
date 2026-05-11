import { Box, IconButton } from '@primer/react';
import {
  MarkGithubIcon,
  LockIcon,
  SearchIcon,
  PlusIcon,
  BellIcon,
} from '@primer/octicons-react';

export default function TopBar({ owner, repo, visibility, enterpriseTag }) {
  return (
    <Box
      as="header"
      sx={{
        bg: 'canvas.inset',
        borderColor: 'border.default',
        px: 3,
        py: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        fontSize: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'fg.default' }}>
        <MarkGithubIcon size={22} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'fg.default' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{owner}</a>
        <Box as="span" sx={{ color: 'fg.muted' }}>/</Box>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
          {repo}
        </a>
        {visibility === 'private' && (
          <Box
            as="span"
            sx={{ color: 'fg.muted', display: 'inline-flex', ml: 1 }}
            title="Private"
            aria-label="Private repository"
          >
            <LockIcon size={14} />
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1 }} />

      {enterpriseTag && (
        <Box
          as="span"
          sx={{
            fontSize: 0,
            color: 'fg.muted',
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 999,
            px: 2,
            py: '2px',
            lineHeight: 1.2,
          }}
        >
          {enterpriseTag}
        </Box>
      )}

      <IconButton icon={SearchIcon} aria-label="Search" size="small" variant="invisible" />
      <IconButton icon={PlusIcon}   aria-label="New"    size="small" variant="invisible" />
      <IconButton icon={BellIcon}   aria-label="Notifications" size="small" variant="invisible" />
    </Box>
  );
}
