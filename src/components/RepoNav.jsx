import { Box, UnderlineNav } from '@primer/react';
import { repoNavItems } from '../site.config.js';

export default function RepoNav() {
  return (
    <Box
      sx={{
        bg: 'canvas.inset',
        borderColor: 'border.default',
        px: 0,
        py: 0,
        fontSize: 1,
      }}
    >
      <UnderlineNav aria-label="Repository">
        {repoNavItems.map((it) => (
          <UnderlineNav.Item
            key={it.label}
            icon={it.icon}
            counter={it.count}
            aria-current={it.active ? 'page' : undefined}
            onSelect={(e) => {
              e.preventDefault();
              window.open(it.href, '_blank', 'noopener,noreferrer');
            }}
          >
            {it.label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>
    </Box>
  );
}
