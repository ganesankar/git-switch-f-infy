import { Box, Heading, Text, Label, LabelGroup, Button, Avatar } from '@primer/react';
import { BellIcon, GearIcon, CheckIcon, DotFillIcon, CommentIcon } from '@primer/octicons-react';
import { reviewers, site } from '../site.config.js';

const openAboutPage = () =>
  window.open(site.links.about, '_blank', 'noopener,noreferrer');

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

const Muted = ({ children }) => (
  <Text sx={{ color: 'fg.muted', fontSize: 0 }}>{children}</Text>
);

function ReviewerStatus({ status }) {
  if (status === 'approved') return <CheckIcon size={14} style={{ color: '#2ea44f' }} />;
  if (status === 'comment')  return <CommentIcon size={14} />;
  return <DotFillIcon size={14} style={{ color: '#ffa000' }} />;
}

export default function Sidebar({ milestone }) {
  return (
    <Box sx={{ fontSize: 0, color: 'fg.muted' }}>
      <Section title="Reviewers">
        {reviewers.map((review, index) => (
          <Box
            key={review.name}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: index === 0 ? 4 : 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Avatar src={review.avatar} alt={review.name} />
              <Muted>{review.name}</Muted>
            </Box>
            <Box sx={{ color: 'fg.muted', display: 'inline-flex' }}>
              <ReviewerStatus status={review.status} />
            </Box>
          </Box>
        ))}
      </Section>

      <Section title="Assignees">
        <Muted>{site.defaultAuthor.name}</Muted>
      </Section>

      <Section title="Labels">
        <LabelGroup>
          <Label variant="accent">farewell</Label>
          <Label variant="success">gratitude</Label>
          <Label variant="attention">new-endeavors</Label>
          <Label variant="secondary">this-too-shall-pass</Label>
          <Label variant="secondary">இதுவும் கடந்து போகும்</Label>
          <Label variant="sponsors">நற்றுணையாவது-நமச்சிவாயவே</Label>
        </LabelGroup>
      </Section>

      <Section title="Projects">
        <Muted>Bigger Dreams</Muted>
      </Section>

      <Section title="Milestone">
        <Muted>{milestone || site.prNumber}</Muted>
      </Section>

      <Section title="Development">
        <Muted>
          Successfully merging this pull request may close these dreams.
          <br />
          <Text sx={{ color: 'fg.default' }}>None yet — many ahead.</Text>
        </Muted>
      </Section>

      <Section title="Notifications" last>
        <Button leadingVisual={BellIcon} block onClick={openAboutPage}>
          Subscribe
        </Button>
        <Text
          sx={{
            color: 'fg.default',
            mt: 1,
            fontSize: 0,
            display: 'block',
            textAlign: 'center',
          }}
        >
          It's just links to my social media platforms. <br/>Hope you play with the UI     </Text>
      </Section>
    </Box>
  );
}
