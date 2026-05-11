import { Box, Text } from '@primer/react';

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
        <Text>Do not share any personal information here.</Text>
        <Text aria-hidden>·</Text>
        <Text>GitHub-themed on purpose — a thank-you for a decade of commits.</Text>
      </Box>
    </Box>
  );
}
