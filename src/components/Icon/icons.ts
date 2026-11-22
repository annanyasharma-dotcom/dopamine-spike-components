// Raw SVG sources exported from the "Icon repo" section of the Figma file.
const files = import.meta.glob('../../../icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const iconNames = [
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'check',
  'chevron-up',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'close',
  'phone-telephone',
  'plus',
  'search',
] as const;

export type IconName = (typeof iconNames)[number];

/** phone-telephone ships a "filled" variant; every other icon ships "bold". */
export const emphasisSuffix = (name: IconName) =>
  name === 'phone-telephone' ? 'filled' : 'bold';

/**
 * Swap the hard-coded black fills/strokes for currentColor so icons inherit
 * text colour. Masks are left untouched: their black/white values define
 * visibility, not paint.
 */
function themeable(svg: string): string {
  const masks: string[] = [];
  const withoutMasks = svg.replace(/<mask[\s\S]*?<\/mask>/g, (m) => {
    masks.push(m);
    return `__MASK_${masks.length - 1}__`;
  });
  return withoutMasks
    .replace(/(fill|stroke)="(black|#0D0D0D)"/gi, '$1="currentColor"')
    .replace(/ width="24" height="24"/, ' width="100%" height="100%"')
    .replace(/__MASK_(\d+)__/g, (_, i) => masks[Number(i)]);
}

export const svgSources: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, src]) => [
    path.split('/').pop()!.replace(/\.svg$/, ''),
    themeable(src),
  ]),
);
