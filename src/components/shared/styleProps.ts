import type React from 'react';

/**
 * Shared style props for puijs components.
 *
 * These props allow consumers to control common visual properties
 * without using inline style={{}} attributes. Components merge them
 * into computed styles internally.
 */

export type BackgroundToken =
  | 'brand-gradient'
  | 'gradient-main'
  | 'gradient-main-lr'
  | 'gradient-secondary'
  | 'gradient-card'
  | 'gradient-navbar'
  | 'gradient-sidebar'
  | 'gradient-footer'
  | 'gradient-accent'
  | 'transparent'
  | 'inherit';

export type ColorToken =
  | 'primary'
  | 'primary-hover'
  | 'secondary'
  | 'text-primary'
  | 'text-secondary'
  | 'text-muted'
  | 'text-inverse'
  | 'inherit'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type SpacingToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;

export type AlignToken = 'left' | 'center' | 'right';

/** Maps a BackgroundToken to a CSS var string. */
export function resolveBackground(bg?: BackgroundToken | string): string | undefined {
  if (!bg) return undefined;
  if (bg === 'transparent') return 'transparent';
  if (bg === 'inherit') return 'inherit';
  if (bg.startsWith('gradient-') || bg.startsWith('brand-')) {
    return `var(--phi-${bg})`;
  }
  return bg;
}

/** Maps a ColorToken to a CSS var string. */
export function resolveColor(color?: ColorToken | string): string | undefined {
  if (!color) return undefined;
  if (color === 'inherit') return 'inherit';
  const tokenMap: Record<string, string> = {
    'primary': 'var(--phi-color-primary)',
    'primary-hover': 'var(--phi-color-primary-hover)',
    'secondary': 'var(--phi-color-secondary)',
    'text-primary': 'var(--phi-color-text-primary)',
    'text-secondary': 'var(--phi-color-text-secondary)',
    'text-muted': 'var(--phi-color-text-muted)',
    'text-inverse': 'var(--phi-color-text-inverse)',
    'success': 'var(--phi-color-success)',
    'warning': 'var(--phi-color-warning)',
    'error': 'var(--phi-color-error)',
    'info': 'var(--phi-color-info)',
  };
  return tokenMap[color] || color;
}

/** Maps a SpacingToken to a rem value. */
export function resolveSpacing(spacing?: SpacingToken): string | undefined {
  if (spacing === undefined) return undefined;
  return `${spacing * 0.25}rem`;
}

/** Maps a maxWidth string to CSS (supports 'sm'|'md'|'lg'|'xl' or raw value). */
export function resolveMaxWidth(maxWidth?: string): string | undefined {
  if (!maxWidth) return undefined;
  const map: Record<string, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };
  return map[maxWidth] || maxWidth;
}

export interface StyleProps {
  background?: BackgroundToken | string;
  padding?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  margin?: SpacingToken;
  marginTop?: SpacingToken;
  marginBottom?: SpacingToken;
  color?: ColorToken | string;
  maxWidth?: string;
  minWidth?: string;
  minHeight?: string;
  align?: AlignToken;
  textDecoration?: string;
  opacity?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  letterSpacing?: string;
}

/** Converts StyleProps into a CSSProperties object. */
export function stylePropsToCSS(props: StyleProps): React.CSSProperties {
  const css: React.CSSProperties = {};

  if (props.background) css.background = resolveBackground(props.background) as any;
  if (props.color) css.color = resolveColor(props.color) as any;

  const pY = props.paddingY ?? props.padding;
  const pX = props.paddingX ?? props.padding;
  if (pY !== undefined) {
    css.paddingTop = css.paddingTop || resolveSpacing(pY);
    css.paddingBottom = css.paddingBottom || resolveSpacing(pY);
  }
  if (pX !== undefined) {
    css.paddingLeft = css.paddingLeft || resolveSpacing(pX);
    css.paddingRight = css.paddingRight || resolveSpacing(pX);
  }
  if (props.paddingTop !== undefined) css.paddingTop = resolveSpacing(props.paddingTop);
  if (props.paddingBottom !== undefined) css.paddingBottom = resolveSpacing(props.paddingBottom);
  if (props.paddingLeft !== undefined) css.paddingLeft = resolveSpacing(props.paddingLeft);
  if (props.paddingRight !== undefined) css.paddingRight = resolveSpacing(props.paddingRight);

  if (props.margin !== undefined) css.margin = resolveSpacing(props.margin) as any;
  if (props.marginTop !== undefined) css.marginTop = resolveSpacing(props.marginTop) as any;
  if (props.marginBottom !== undefined) css.marginBottom = resolveSpacing(props.marginBottom) as any;

  if (props.maxWidth) css.maxWidth = resolveMaxWidth(props.maxWidth) as any;
  if (props.minWidth) css.minWidth = props.minWidth;
  if (props.minHeight) css.minHeight = props.minHeight;
  if (props.align) css.textAlign = props.align;
  if (props.textDecoration) css.textDecoration = props.textDecoration;
  if (props.opacity !== undefined) css.opacity = props.opacity;
  if (props.textTransform) css.textTransform = props.textTransform;
  if (props.letterSpacing) css.letterSpacing = props.letterSpacing;

  return css;
}
