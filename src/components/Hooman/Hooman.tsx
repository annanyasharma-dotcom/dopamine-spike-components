import type { ImgHTMLAttributes } from 'react';
import { findPose, type HoomanCharacterName, type HoomanPoseName } from './hoomans';

type HoomanProps<C extends HoomanCharacterName> = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height'
> & {
  /** Which TATA 1mg character. */
  character: C;
  /** Pose name describing what the image shows (see `figmaVariant` for the Figma name). */
  pose: HoomanPoseName<C>;
  /** Rendered width in px. Height follows the illustration's aspect ratio. */
  width?: number;
  /** Rendered height in px (used when `width` is not set). */
  height?: number;
  /**
   * Alt text. Defaults to empty (decorative), since every usage note asks for
   * the illustration to be paired with copy that carries the meaning.
   */
  alt?: string;
};

/**
 * TATA 1mg "hooman" character illustration.
 *
 * Supporting imagery only: always pair it with copy that states the actual
 * status, offer or action. See each pose's usage note in Storybook.
 */
export function Hooman<C extends HoomanCharacterName>({
  character,
  pose,
  width,
  height,
  alt = '',
  style,
  ...rest
}: HoomanProps<C>) {
  const data = findPose(character, pose);
  if (!data) return null;

  const ratio = data.width / data.height;
  const w = width ?? (height ? Math.round(height * ratio) : 240);
  const h = Math.round(w / ratio);

  return (
    <img
      src={data.src}
      width={w}
      height={h}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ display: 'block', objectFit: 'contain', ...style }}
      {...rest}
    />
  );
}

export default Hooman;
