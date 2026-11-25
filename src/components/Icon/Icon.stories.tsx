import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { emphasisSuffix, iconNames } from './icons';

const meta = {
  title: 'Foundations/Icon',
  component: Icon,
  args: { name: 'arrow-right', bold: false, size: 24, color: '#0D0D0D' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    bold: { control: 'boolean', description: 'Bold variant (filled for phone-telephone)' },
    size: { control: { type: 'range', min: 12, max: 96, step: 4 } },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single icon, driven by the controls panel. */
export const Playground: Story = {};

const cell: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: '16px 8px',
  borderRadius: 8,
  border: '1px solid #e6e6e6',
  background: '#fff',
  cursor: 'pointer',
  font: '12px/1.3 system-ui, sans-serif',
  color: '#0D0D0D',
};

function Gallery({ size, color }: { size: number; color: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div style={{ font: '14px system-ui, sans-serif', color: '#0D0D0D', maxWidth: 960 }}>
      <p style={{ margin: '0 0 16px', color: '#555' }}>
        {iconNames.length} icons × 2 variants, from the Figma “Icon repo”. Click a tile to copy its JSX.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {iconNames.map((name) => {
          const variant = emphasisSuffix(name);
          const regularJsx = `<Icon name="${name}" />`;
          const boldJsx = `<Icon name="${name}" bold />`;
          return (
            <div key={name} style={{ ...cell, cursor: 'default' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <button title={regularJsx} onClick={() => copy(regularJsx)} style={iconBtn}>
                  <Icon name={name} size={size} color={color} />
                  <span style={hint}>{copied === regularJsx ? 'copied' : 'regular'}</span>
                </button>
                <button title={boldJsx} onClick={() => copy(boldJsx)} style={iconBtn}>
                  <Icon name={name} bold size={size} color={color} />
                  <span style={hint}>{copied === boldJsx ? 'copied' : variant}</span>
                </button>
              </div>
              <code>{name}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  border: 0,
  background: 'none',
  padding: 4,
  cursor: 'pointer',
  color: 'inherit',
};
const hint: React.CSSProperties = { fontSize: 10, color: '#888' };

/** Every icon in the library, regular and bold/filled side by side. */
export const AllIcons: Story = {
  parameters: { layout: 'padded', controls: { include: ['size', 'color'] } },
  render: ({ size = 24, color = '#0D0D0D' }) => <Gallery size={size} color={color} />,
};

/** Icons inherit `currentColor`, so they pick up the surrounding text colour. */
export const InheritsColor: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, font: '16px system-ui', alignItems: 'center' }}>
      <span style={{ color: '#E5484D', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="close" bold size={20} /> Remove
      </span>
      <span style={{ color: '#30A46C', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="check" bold size={20} /> Saved
      </span>
      <span style={{ color: '#0090FF', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="phone-telephone" bold size={20} /> Call
      </span>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { include: ['name', 'bold', 'color'] } },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'end' }}>
      {[16, 20, 24, 32, 48].map((s) => (
        <div key={s} style={{ textAlign: 'center', font: '11px system-ui', color: '#888' }}>
          <Icon {...args} size={s} />
          <div>{s}px</div>
        </div>
      ))}
    </div>
  ),
};
