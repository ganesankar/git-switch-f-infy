import { Box, CounterLabel } from '@primer/react';
import { prTabs, TAB_IDS } from '../site.config.js';

// Re-export for backwards compatibility (App.jsx imports TAB_IDS from here too).
export { TAB_IDS };

export default function PrSubNav({ activeTab, onTabChange, counts = {} }) {
  return (
    <Box
      sx={{
        maxWidth: 1280,
        mx: 'auto',
        px: 4,
      }}
    >
      <Box
        as="nav"
        aria-label="Pull request"
        sx={{
          display: 'flex',
          gap: 1,
          pt: 2,
          borderBottom: '1px solid',
          borderBottomColor: 'border.default',
          flexWrap: 'wrap',
        }}
      >
        {prTabs.map((t) => {
          const isActive = activeTab === t.id;
          const Icon = t.icon;
          return (
            <Box
              key={t.id}
              as="button"
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onTabChange(t.id)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 3,
                mb: '-1px',
                border: '1px solid',
                borderColor: isActive ? 'border.default' : 'transparent',
                borderBottomColor: isActive ? 'canvas.default' : 'transparent',
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                bg: isActive ? 'canvas.default' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 1,
                lineHeight: 1,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'fg.default' : 'fg.muted',
                transition:
                  'background-color .15s ease, color .15s ease, border-color .15s ease',
                '&:hover': {
                  bg: isActive ? 'canvas.default' : 'canvas.subtle',
                  color: 'fg.default',
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderBottomColor: 'canvas.default',
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'accent.fg',
                  outlineOffset: '-2px',
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  color: isActive ? 'fg.default' : 'fg.muted',
                }}
              >
                <Icon size={16} />
              </Box>
              <span>{t.label}</span>
              {typeof counts[t.id] === 'number' && (
                <CounterLabel>{counts[t.id]}</CounterLabel>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
