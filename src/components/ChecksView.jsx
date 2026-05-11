import { Box, Heading, Text } from '@primer/react';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import toast from 'react-hot-toast';
import { site } from '../site.config.js';

const showBlogToast = () =>
  toast(
    (
      <span>
        if you know me, this is old check. if you don't — that's the first thing to{' '}
        <a
          href={site.links.blog}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0969da', textDecoration: 'none', fontWeight: 600 }}
        >
          check out me personally
        </a>{' '}
        :P
      </span>
    ),
    { icon: '😜', duration: 6000 },
  );

function CheckRow({ check, isLast }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 3,
        p: 3,
        borderBottom: isLast ? 0 : '1px solid',
        borderColor: 'border.muted',
      }}
    >
      <Box sx={{ color: 'success.fg', display: 'inline-flex', mt: '2px', flexShrink: 0 }}>
        <CheckCircleFillIcon size={16} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Text sx={{ color: 'fg.default', fontWeight: 600 }}>{check.name}</Text>
          <Text sx={{ color: 'fg.muted', fontSize: 1 }}>
            / Successful in {check.duration}
          </Text>
        </Box>
        <Text sx={{ color: 'fg.muted', fontSize: 0, display: 'block', mt: 1 }}>
          {check.sub}
        </Text>
      </Box>

      <Box
        as="button"
        type="button"
        onClick={showBlogToast}
        sx={{
          border: 0,
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
          color: 'accent.fg',
          fontSize: 0,
          fontFamily: 'inherit',
          flexShrink: 0,
          alignSelf: 'center',
          '&:hover': { textDecoration: 'underline' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'accent.fg',
            outlineOffset: 2,
            borderRadius: 2,
          },
        }}
      >
        Details
      </Box>
    </Box>
  );
}

export default function ChecksView({ checks = [] }) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          p: 3,
          border: '1px solid',
          borderColor: 'success.emphasis',
          bg: 'success.subtle',
          borderRadius: 2,
        }}
      >
        <Box sx={{ color: 'success.fg', display: 'inline-flex' }}>
          <CheckCircleFillIcon size={20} />
        </Box>
        <Box>
          <Heading as="h2" sx={{ fontSize: 2, fontWeight: 600, color: 'fg.default', m: 0 }}>
            All checks have passed
          </Heading>
          <Text sx={{ color: 'fg.muted', fontSize: 1 }}>
            {checks.length} successful checks
          </Text>
        </Box>
      </Box>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          bg: 'canvas.default',
          overflow: 'hidden',
        }}
      >
        {checks.map((c, i) => (
          <CheckRow key={c.name} check={c} isLast={i === checks.length - 1} />
        ))}
      </Box>
    </Box>
  );
}
