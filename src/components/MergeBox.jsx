import { Box, Text } from '@primer/react';
import { CheckIcon, AlertIcon } from '@primer/octicons-react';

const KIND = {
  ok:       { bg: '#238636', Icon: CheckIcon },  // green
  muted:    { bg: '#6e7681', Icon: CheckIcon },  // grey check (passive ok)
  unmerged: { bg: '#d29922', Icon: AlertIcon },  // amber alert
};

function Check({ kind }) {
  const k = KIND[kind] || KIND.ok;
  const { Icon } = k;
  return (
    <Box
      aria-hidden
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        bg: k.bg,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={14} />
    </Box>
  );
}

export default function MergeBox({ rows = [] }) {
  return (
    <Box
      as="section"
      aria-label="Pull request status"
      sx={{
        mt: 4,
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        bg: 'canvas.default',
        overflow: 'hidden',
      }}
    >
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 3,
            borderBottom: i === rows.length - 1 ? 0 : '1px solid',
            borderColor: 'border.muted',
            color: 'fg.default',
          }}
        >
          <Check kind={row.kind} />
          <Box>
            <Text sx={{ fontWeight: 600, color: 'fg.default' }}>{row.title}</Text>
            <br />
            <Text sx={{ color: 'fg.muted', fontSize: 1 }}>{row.sub}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
