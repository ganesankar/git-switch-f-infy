import Giscus from '@giscus/react';
import { Box, Text, Heading, Link } from '@primer/react';
import { CommentIcon } from '@primer/octicons-react';
import { giscus as cfg } from '../site.config.js';

const isConfigured = Boolean(cfg.repo && cfg.repoId && cfg.categoryId);

export default function GiscusComments() {
  if (!isConfigured) {
    return (
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px dashed',
          borderColor: 'border.default',
          borderRadius: 2,
          bg: 'canvas.subtle',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <CommentIcon />
          <Heading as="h3" sx={{ fontSize: 2, m: 0 }}>
            Comments are not configured yet
          </Heading>
        </Box>
        <Text as="p" sx={{ color: 'fg.muted', fontSize: 1, m: 0 }}>
          Once enabled, a GitHub Discussions–backed comment thread will appear
          here. To enable, follow the steps in{' '}
          <Box as="code" sx={{ bg: 'neutral.muted', px: 1, borderRadius: 1 }}>
            src/site.config.js
          </Box>
          {' '}or visit{' '}
          <Link href="https://giscus.app" target="_blank" rel="noopener">
            giscus.app
          </Link>{' '}
          to grab your repo IDs.
        </Text>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Giscus
        repo={cfg.repo}
        repoId={cfg.repoId}
        category={cfg.category}
        categoryId={cfg.categoryId}
        mapping={cfg.mapping}
        reactionsEnabled={cfg.reactionsEnabled}
        emitMetadata={cfg.emitMetadata}
        inputPosition={cfg.inputPosition}
        theme={cfg.theme}
        lang={cfg.lang}
        loading="lazy"
      />
    </Box>
  );
}
