import { Box, Button, ButtonGroup, ActionMenu, ActionList } from '@primer/react';
import { MarkGithubIcon, LockIcon, MailIcon } from '@primer/octicons-react';
import { socialLinks, topbarLinks } from '../site.config.js';

export default function TopBar({ owner, repo, visibility }) {
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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'fg.default',
        }}
      >
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
          {owner}
        </a>
        <Box as="span" sx={{ color: 'fg.muted' }}>
          /
        </Box>
        <a
          href="#"
          style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
        >
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
      <ButtonGroup variant="invisible" sx={{ pt: 1, fontSize: 3 }}>
        <Button
          as="a"
          href={topbarLinks.website.url}
          target="_blank"
          rel="noreferrer"
          aria-label={topbarLinks.website.label}
          leadingVisual={topbarLinks.website.icon}
        >
          {topbarLinks.website.label}
        </Button>
        <Button
          as="a"
          href={topbarLinks.mail.url}
          aria-label={topbarLinks.mail.ariaLabel}
          leadingVisual={MailIcon}
        >
          {topbarLinks.mail.label}
        </Button>
        <ActionMenu>
          <ActionMenu.Button>Social</ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <ActionList.Item
                    key={link.title}
                    onSelect={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'fg.muted',
                      }}
                    >
                      <Icon size={16} /> {link.title}
                    </Box>
                  </ActionList.Item>
                );
              })}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </ButtonGroup>
    </Box>
  );
}
