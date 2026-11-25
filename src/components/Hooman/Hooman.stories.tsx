import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hooman } from './Hooman';
import { characterNames, hoomans, type HoomanCharacterName, type HoomanPose } from './hoomans';

const variants = characterNames.flatMap((c) =>
  (hoomans[c].poses as HoomanPose[]).map((p) => `${c} / ${p.pose}`),
);

type PlaygroundArgs = { variant: string; width: number };

const meta = {
  title: 'Illustrations/Hoomans',
  parameters: {
    docs: {
      description: {
        component:
          'TATA 1mg character illustrations. Use them as supporting imagery only, always paired with copy that states the real status, offer or action. Pose names describe what each image shows; where that differs from the Figma variant name, the Figma name is shown in orange.',
      },
    },
  },
} satisfies Meta;

export default meta;

/** Pick any character and pose. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { variant: 'delivery / with-box', width: 280 },
  argTypes: {
    variant: { control: 'select', options: variants },
    width: { control: { type: 'range', min: 80, max: 600, step: 20 } },
  },
  render: ({ variant, width }) => {
    const [character, pose] = variant.split(' / ') as [HoomanCharacterName, string];
    const data = (hoomans[character].poses as HoomanPose[]).find((p) => p.pose === pose)!;
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', maxWidth: 900, font: '14px/1.5 system-ui, sans-serif', color: '#0D0D0D' }}>
        {/* @ts-expect-error pose is validated by the select options */}
        <Hooman character={character} pose={pose} width={width} />
        <div style={{ maxWidth: 380 }}>
          <code style={snippet}>{`<Hooman character="${character}" pose="${pose}" />`}</code>
          <p style={{ margin: '12px 0 4px', fontWeight: 600 }}>Shows</p>
          <p style={{ margin: 0, color: '#444' }}>{data.shows}</p>
          <p style={{ margin: '12px 0 4px', fontWeight: 600 }}>Usage</p>
          <p style={{ margin: 0, color: '#444' }}>{data.usage}</p>
        </div>
      </div>
    );
  },
};

const snippet: CSSProperties = {
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: 6,
  background: '#f3f3f3',
  font: '12px ui-monospace, SFMono-Regular, Menlo, monospace',
};

function UsageCard({ character, pose }: { character: HoomanCharacterName; pose: HoomanPose }) {
  const [copied, setCopied] = useState(false);
  const jsx = `<Hooman character="${character}" pose="${pose.pose}" />`;
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e6e6e6',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div style={{ background: '#F4F6F8', display: 'grid', placeItems: 'center', height: 220, padding: 12 }}>
        {/* @ts-expect-error pose comes from this character's own pose list */}
        <Hooman character={character} pose={pose.pose} height={196} style={{ maxWidth: '100%', height: 'auto', maxHeight: 196 }} />
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <strong style={{ fontSize: 15 }}>{pose.pose}</strong>
          <span
            title={`Figma node ${pose.figmaNodeId}`}
            style={{ fontSize: 11, color: pose.figmaVariant === pose.pose ? '#999' : '#B25E09', whiteSpace: 'nowrap' }}
          >
            Figma: {pose.figmaVariant}
          </span>
        </div>
        <p style={{ margin: 0, color: '#555', fontSize: 13 }}>{pose.shows}</p>
        <p style={{ margin: 0, fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Usage: </span>
          {pose.usage}
        </p>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(jsx).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          title="Copy JSX"
          style={{ ...snippet, border: 0, cursor: 'pointer', textAlign: 'left', marginTop: 4 }}
        >
          {copied ? 'Copied!' : jsx}
        </button>
      </div>
    </article>
  );
}

function CharacterSheet({ character }: { character: HoomanCharacterName }) {
  const c = hoomans[character];
  return (
    <section style={{ font: '14px/1.5 system-ui, sans-serif', color: '#0D0D0D', maxWidth: 1200 }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 20 }}>
        {c.label} <span style={{ color: '#999', fontWeight: 400, fontSize: 14 }}>· {c.poses.length} poses</span>
      </h2>
      <p style={{ margin: '0 0 16px', color: '#666' }}>
        Figma frame <code>{c.figmaFrame}</code>. Supporting imagery only: pair with copy that states the real status, offer or action.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {(c.poses as HoomanPose[]).map((p) => (
          <UsageCard key={p.pose} character={character} pose={p} />
        ))}
      </div>
    </section>
  );
}

const sheet = (character: HoomanCharacterName): StoryObj => ({
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => <CharacterSheet character={character} />,
});

export const DeliveryPartner = sheet('delivery');
export const Doctor = sheet('doctor');
export const Pharmacist = sheet('pharmacist');
export const Phlebotomist = sheet('phlebotomist');

/** Every character at a glance. */
export const AllHoomans: StoryObj = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {characterNames.map((c) => (
        <CharacterSheet key={c} character={c} />
      ))}
    </div>
  ),
};
