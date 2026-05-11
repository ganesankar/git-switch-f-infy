import { Box, Heading, Text, Label, LabelGroup, Button } from '@primer/react';
import { BellSlashIcon, GearIcon } from '@primer/octicons-react';
import toast from 'react-hot-toast';

const cannotUnsubscribe = () =>
  toast(
    "nice try. you don't get to unsubscribe from this one — time and fate own that switch.",
    { icon: '⏳' },
  );

function Section({ title, children, last = false }) {
  return (
    <Box
      sx={{
        py: 3,
        borderBottom: last ? 0 : '1px solid',
        borderColor: 'border.muted',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Heading
          as="h3"
          sx={{
            fontSize: 0,
            color: 'fg.muted',
            fontWeight: 600,
            flex: 1,
            m: 0,
          }}
        >
          {title}
        </Heading>
        <Box sx={{ color: 'fg.muted', display: 'inline-flex' }}>
          <GearIcon size={14} />
        </Box>
      </Box>
      {children}
    </Box>
  );
}

const Empty = ({ children }) => (
  <Text sx={{ color: 'fg.muted', fontSize: 0 }}>{children}</Text>
);

export default function Sidebar({ milestone }) {
  return (
    <Box sx={{ fontSize: 0, color: 'fg.muted' }}>
      <Section title="Reviewers">
        <Empty>Everyone who are with me in this journey</Empty>
      </Section>

      <Section title="Assignees">
        <Empty>Ganesan Karuppaiya</Empty>
      </Section>

      <Section title="Labels">
        <LabelGroup>
          <Label variant="accent">farewell</Label>
          <Label variant="success">gratitude</Label>
          <Label variant="attention">new-endeavors</Label>
        </LabelGroup>
      </Section>

      <Section title="Projects">
        <Empty>Bigger Dreams</Empty>
      </Section>

      <Section title="Milestone">
        <Empty>{milestone || 'v1.0-farewell'}</Empty>
      </Section>

      <Section title="Development">
        <Empty>
          Successfully merging this pull request may close these dreams.
          <br />
          <Text sx={{ color: 'fg.default' }}>None yet — many ahead.</Text>
        </Empty>
      </Section>

      <Section title="Notifications" last>
        <Button leadingVisual={BellSlashIcon} block onClick={cannotUnsubscribe}>
          Unsubscribe
        </Button>
      </Section>
    </Box>
  );
}
