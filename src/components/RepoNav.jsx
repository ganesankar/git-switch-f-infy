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
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            icon={it.icon}
            counter={it.count}
            aria-current={it.active ? 'page' : undefined}
          >
            {it.label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>
    </Box>
  );
}
