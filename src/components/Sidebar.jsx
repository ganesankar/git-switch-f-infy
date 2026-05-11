import { Box, Heading, Text, Label, LabelGroup, Button, Avatar } from '@primer/react';
import { BellIcon, GearIcon, CheckIcon, DotFillIcon, CommentIcon, CopilotIcon, ShieldIcon } from '@primer/octicons-react';

const reviews = [
  { name: 'Almighty', avatar: 'https://cdn-icons-png.flaticon.com/64/4192/4192040.png', status: 'approved' },
  { name: 'Family', avatar: 'https://cdn-icons-png.flaticon.com/32/6966/6966266.png', status: 'approved' },
  { name: 'Copilot', avatar: 'https://cdn-icons-png.flaticon.com/32/12208/12208150.png', status: 'comment' },
  { name: 'Security Scan Bot', avatar: 'https://cdn-icons-png.flaticon.com/32/9195/9195850.png', status: 'approved' },
  { name: 'Everyone in this Journey', avatar: 'https://cdn-icons-png.flaticon.com/64/4570/4570603.png', status: 'pending' },
]

const cannotUnsubscribe = () =>
  window.open('https://about.me/ganesankar/', '_blank');

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

        {reviews.map((review, index) => (
          <Box key={review.name} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: index === 0 ? 4 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'space-between', mb: 2, gap: 2 }}>
              <Avatar src={review.avatar} alt={review.name} />
              <Empty> {review.name}</Empty>
            </Box>
            <Box sx={{ color: 'fg.muted', display: 'inline-flex' }}>
              {review.status === 'approved' ? (
                <CheckIcon size={14} style={{ color: '#2ea44f' }} />
              ) : review.status === 'comment' ? (
                <CommentIcon size={14} />
              ) : (
                <DotFillIcon size={14} style={{ color: '#ffa000' }} />
              )}
            </Box>
          </Box>
        ))}
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
        <Button leadingVisual={BellIcon} block onClick={cannotUnsubscribe}>
          Subscribe
        </Button>
        <Text sx={{ color: 'fg.default', mt: 1, fontSize: 0, display: 'block', textAlign: 'center' }}>You won't be receiving any notifications.,<br /> Please follow @ganesankar</Text>
      </Section>
    </Box>
  );
}
