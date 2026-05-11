import { Box, UnderlineNav } from '@primer/react';
import {
  CodeIcon,
  MailIcon ,
  GitPullRequestIcon,
  PencilIcon,
  ProjectIcon,
  BookIcon,
} from '@primer/octicons-react';

const items = [
  { label: 'Code', icon: CodeIcon, href: 'https://github.com/ganesankar/git-switch-f-infy' },
  { label: 'Issues', icon: MailIcon , count: 0, href: 'https://github.com/ganesankar/git-switch-f-infy/issues' },
  { label: 'Pull requests', icon: GitPullRequestIcon, count: 1, active: true, href: 'https://ganesankar.github.io/git-switch-f-infy/' },
  { label: 'Writing', icon: PencilIcon, href: 'https://ganesan.dev/blog' },
  { label: 'History', icon: ProjectIcon, href: 'https://ganesan.dev/resume' },
  { label: 'Wiki', icon: BookIcon, href: 'http://ganesan.dev' },
   ];

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
      <Box >
        <UnderlineNav aria-label="Repository">
          {items.map((it) => (
            <UnderlineNav.Item
              key={it.label}
              icon={it.icon}
              counter={it.count}
              aria-current={it.active ? 'page' : undefined}
              onSelect={(e) => { e.preventDefault(); window.open(it.href, '_blank'); }}
            >
              {it.label}
            </UnderlineNav.Item>
          ))}
        </UnderlineNav>
      </Box>
    </Box>
  );
}
