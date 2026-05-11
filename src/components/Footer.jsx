import { Box, Link, Text } from '@primer/react';
import {
  CodeIcon,
  MailIcon,
  GitPullRequestIcon,
  PencilIcon,
  ProjectIcon,
  BookIcon,
} from '@primer/octicons-react';

const items = [
  { label: 'Website', icon: CodeIcon, href: 'https://ganesan.dev' },
  { label: 'Code', icon: MailIcon, count: 0, href: 'https://github.com/ganesankar/git-switch-f-infy' },
  { label: 'LinkedIn', icon: GitPullRequestIcon, count: 1, active: true, href: 'https://www.linkedin.com/in/ganesankar/' },
  { label: 'Github', icon: PencilIcon, href: 'https://github.com/ganesankar' },
];

export default function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'border.muted',
        color: 'fg.muted',
        fontSize: 0,
        py: 3,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Text>© 2026 Ganesan Karuppaiya</Text>
        {items.map((it, key) => (
          <Text key={it.label} >
            <Text aria-hidden sx={{

            }}>&nbsp;· &nbsp;</Text>
            <Link as="a"

              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); window.open(it.href, '_blank'); }}
            >
              {it.label}
            </Link>

          </Text>
        ))}


      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Text> Do not share any personal information here.</Text>
        <Text aria-hidden>·</Text>
        <Text> GitHub-themed on purpose — a thank-you for a decade of commits.</Text>

      </Box>

    </Box>
  );
}
