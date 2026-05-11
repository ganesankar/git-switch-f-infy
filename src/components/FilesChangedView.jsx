import { useState, useMemo, useRef } from 'react';
import { Box, Heading, Text, TextInput, IconButton, TreeView } from '@primer/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  SearchIcon,
  KebabHorizontalIcon,
  DiffAddedIcon,
} from '@primer/octicons-react';

function DiffStat({ additions }) {
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

function FileRow({ file, expanded, onToggle, setRowRef }) {
  const filepath = file.path || file.filename;
  return (
    <Box
      ref={setRowRef}
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        bg: 'canvas.default',
        mb: 3,
        overflow: 'hidden',
        scrollMarginTop: 16,
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

/* ---------- Tree building ---------- */

// Turn a flat list of files into a nested tree based on path segments.
// Returns: Array<{ id, name, file?, children }> where children is the same shape.
function buildFileTree(files) {
  const root = { children: new Map() };

  for (const file of files) {
    const segments = (file.path || file.filename).split('/').filter(Boolean);
    let node = root;
    let idPath = '';
    segments.forEach((seg, i) => {
      idPath = idPath ? `${idPath}/${seg}` : seg;
      if (!node.children.has(seg)) {
        node.children.set(seg, {
          id: idPath,
          name: seg,
          file: null,
          children: new Map(),
        });
      }
      node = node.children.get(seg);
      if (i === segments.length - 1) {
        node.file = file;
      }
    });
  }

  const toArray = (mapNode) => {
    const arr = Array.from(mapNode.children.values()).map((child) => ({
      id: child.id,
      name: child.name,
      file: child.file,
      children: toArray(child),
    }));
    // Directories first, then files; alpha within each group.
    arr.sort((a, b) => {
      const aIsDir = a.children.length > 0 && !a.file;
      const bIsDir = b.children.length > 0 && !b.file;
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return arr;
  };

  return toArray(root);
}

function TreeNodes({ nodes, currentId, onSelectFile }) {
  return nodes.map((node) => {
    const isLeaf = !!node.file && node.children.length === 0;
    if (isLeaf) {
      return (
        <TreeView.Item
          key={node.id}
          id={node.id}
          current={currentId === node.id}
          onSelect={() => onSelectFile(node.file)}
        >
          <TreeView.LeadingVisual>
            <FileIcon />
          </TreeView.LeadingVisual>
          {node.name}
          <TreeView.TrailingVisual label="Added">
            <DiffAddedIcon fill="var(--fgColor-success, #1a7f37)" />
          </TreeView.TrailingVisual>
        </TreeView.Item>
      );
    }
    return (
      <TreeView.Item key={node.id} id={node.id} defaultExpanded>
        <TreeView.LeadingVisual>
          <TreeView.DirectoryIcon />
        </TreeView.LeadingVisual>
        {node.name}
        <TreeView.SubTree>
          <TreeNodes
            nodes={node.children}
            currentId={currentId}
            onSelectFile={onSelectFile}
          />
        </TreeView.SubTree>
      </TreeView.Item>
    );
  });
}

/* ---------- Main view ---------- */

export default function FilesChangedView({ files }) {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(() => new Set(files.map((f) => f.filename)));
  const [currentId, setCurrentId] = useState(null);

  const rowRefs = useRef(new Map());

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (f) =>
        f.filename.toLowerCase().includes(q) ||
        (f.title && f.title.toLowerCase().includes(q)),
    );
  }, [filter, files]);

  const tree = useMemo(() => buildFileTree(filtered), [filtered]);

  const totalAdditions = filtered.reduce((sum, f) => sum + f.additions, 0);

  function toggle(filename) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) next.delete(filename);
      else next.add(filename);
      return next;
    });
  }

  function setAll(value) {
    setExpanded(value ? new Set(files.map((f) => f.filename)) : new Set());
  }

  function selectFileFromTree(file) {
    setCurrentId(file.path || file.filename);
    setExpanded((prev) => {
      if (prev.has(file.filename)) return prev;
      const next = new Set(prev);
      next.add(file.filename);
      return next;
    });
    // Defer to next frame so the row has expanded before we scroll.
    requestAnimationFrame(() => {
      const el = rowRefs.current.get(file.filename);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '240px minmax(0, 1fr)'],
          gap: 3,
          alignItems: 'start',
        }}
      >
        <Box
          aria-label="File tree"
          sx={{
            display: ['none', 'none', 'block'],
            position: 'sticky',
            top: 16,
            alignSelf: 'start',
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 2,
            bg: 'canvas.default',
            p: 2,
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'auto',
          }}
        >
          {tree.length === 0 ? (
            <Text sx={{ color: 'fg.muted', fontSize: 0, px: 1 }}>
              No files match the filter.
            </Text>
          ) : (
            <TreeView aria-label="Files changed">
              <TreeNodes
                nodes={tree}
                currentId={currentId}
                onSelectFile={selectFileFromTree}
              />
            </TreeView>
          )}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          {filtered.map((file) => (
            <FileRow
              key={file.filename}
              file={file}
              expanded={expanded.has(file.filename)}
              onToggle={() => toggle(file.filename)}
              setRowRef={(el) => {
                if (el) rowRefs.current.set(file.filename, el);
                else rowRefs.current.delete(file.filename);
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
