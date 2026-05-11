import { useState, useMemo } from 'react';
import { Box, Heading, Text, TextInput, IconButton } from '@primer/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  SearchIcon,
  KebabHorizontalIcon,
} from '@primer/octicons-react';

function DiffStat({ additions }) {
  // Five blocks total — green ones for additions (capped at 5), grey otherwise.
  const filled = Math.min(5, Math.max(1, Math.round(additions / 4)));
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, ml: 2 }}>
      <Text sx={{ color: 'success.fg', fontFamily: 'mono', fontSize: 0, fontWeight: 600 }}>
        +{additions}
      </Text>
      <Box sx={{ display: 'inline-flex', gap: '2px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '1px',
              bg: i < filled ? 'success.emphasis' : 'border.muted',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function FileRow({ file, expanded, onToggle }) {
  const filepath = file.path || file.filename;
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        bg: 'canvas.default',
        mb: 3,
        overflow: 'hidden',
      }}
    >
      <Box
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2,
          bg: 'canvas.subtle',
          borderBottom: expanded ? '1px solid' : 0,
          borderColor: 'border.default',
          color: 'fg.default',
          '&:hover': { bg: 'canvas.inset' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'accent.fg', outlineOffset: -2 },
        }}
      >
        <Box sx={{ color: 'fg.muted', display: 'inline-flex' }}>
          {expanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
        </Box>
        <Box sx={{ color: 'fg.muted', display: 'inline-flex' }}>
          <FileIcon size={16} />
        </Box>
        <Text sx={{ fontFamily: 'mono', fontSize: 1, color: 'fg.default' }}>
          {filepath}
        </Text>
        <DiffStat additions={file.additions} />
        <Box sx={{ flex: 1 }} />
        <IconButton
          icon={KebabHorizontalIcon}
          aria-label="More"
          size="small"
          variant="invisible"
          onClick={(e) => e.stopPropagation()}
        />
      </Box>

      {expanded && (
        <Box className="gl-md gl-diff" sx={{ p: 3 }}>
          <Box dangerouslySetInnerHTML={{ __html: file.html }} />
        </Box>
      )}
    </Box>
  );
}

export default function FilesChangedView({ files }) {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(() => new Set(files.map((f) => f.filename)));

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (f) =>
        f.filename.toLowerCase().includes(q) ||
        (f.title && f.title.toLowerCase().includes(q)),
    );
  }, [filter, files]);

  const totalAdditions = filtered.reduce((sum, f) => sum + f.additions, 0);

  function toggle(filename) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) next.delete(filename); else next.add(filename);
      return next;
    });
  }

  function setAll(value) {
    setExpanded(value ? new Set(files.map((f) => f.filename)) : new Set());
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: 3,
          p: 2,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          bg: 'canvas.subtle',
        }}
      >
        <Heading as="h2" sx={{ fontSize: 1, fontWeight: 600, m: 0, color: 'fg.default' }}>
          Showing {filtered.length} changed file{filtered.length === 1 ? '' : 's'}
        </Heading>
        <Text sx={{ color: 'fg.muted', fontSize: 1 }}>
          with{' '}
          <Box as="strong" sx={{ color: 'success.fg' }}>+{totalAdditions} additions</Box>
          {' '}and{' '}
          <Box as="strong" sx={{ color: 'danger.fg' }}>-0 deletions</Box>
        </Text>
        <Box sx={{ flex: 1 }} />
        <TextInput
          leadingVisual={SearchIcon}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter files…"
          size="small"
          sx={{ minWidth: 200 }}
        />
        <Box
          as="button"
          onClick={() => setAll(true)}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            color: 'accent.fg',
            fontSize: 0,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Expand all
        </Box>
        <Box
          as="button"
          onClick={() => setAll(false)}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            color: 'accent.fg',
            fontSize: 0,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Collapse all
        </Box>
      </Box>

      {filtered.map((file) => (
        <FileRow
          key={file.filename}
          file={file}
          expanded={expanded.has(file.filename)}
          onToggle={() => toggle(file.filename)}
        />
      ))}
    </Box>
  );
}
