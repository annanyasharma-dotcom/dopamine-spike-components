import type { CSSProperties, HTMLAttributes } from 'react';
import { emphasisSuffix, svgSources, type IconName } from './icons';

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Icon from the Dopamine Spike icon repo. */
  name: IconName;
  /** Use the heavier variant (`bold`, or `filled` for phone-telephone). */
  bold?: boolean;
  /** Rendered size in px. Icons are drawn on a 24×24 grid. */
  size?: number;
  /** Any CSS colour. Defaults to the surrounding text colour. */
  color?: string;
  /** Accessible label. Omit for decorative icons. */
  label?: string;
}

export function Icon({
  name,
  bold = false,
  size = 24,
  color,
  label,
  style,
  ...rest
}: IconProps) {
  const key = bold ? `${name}-${emphasisSuffix(name)}` : name;
  const svg = svgSources[key];
  if (!svg) return null;

  const css: CSSProperties = {
    display: 'inline-flex',
    width: size,
    height: size,
    color,
    flexShrink: 0,
    ...style,
  };

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={css}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
}

export default Icon;
