import { Box, CounterLabel, Button } from '@primer/react';
import {
  CommentDiscussionIcon,
  GitCommitIcon,
  CheckCircleIcon,
  FileDiffIcon,
  PencilIcon
} from '@primer/octicons-react';

export const TAB_IDS = {
  conversation: 'conversation',
  commits: 'commits',
  checks: 'checks',
  files: 'files',
};

const TABS = [
  { id: TAB_IDS.conversation, label: 'Conversation', icon: CommentDiscussionIcon },
  { id: TAB_IDS.commits, label: 'Commits', icon: GitCommitIcon },
  { id: TAB_IDS.checks, label: 'Checks', icon: CheckCircleIcon },
  { id: TAB_IDS.files, label: 'Files changed', icon: FileDiffIcon },
];

export default function PrSubNav({ activeTab, onTabChange, counts = {} }) {
  const element = document.getElementById("comment-section");

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
        {TABS.map((t) => {
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
      <Box sx={{


        display: activeTab != 'files' ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: "8px",
        borderBottom: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        mb: 1,
      }}>
        <Button variant="default" onClick={() => {
          onTabChange("commits");
        }}> All Commits</Button>
        <Button variant="primary" onClick={() => {
          onTabChange("conversation");
          setTimeout(() => {
            const element = document.getElementById("comment-section");
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}> <PencilIcon size={16} /> Submit Review</Button>
      </Box>
    </Box>
  );
}
