import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export const LINK_VARIANTS = {
  DEFAULT: 'default',
  MUTED: 'muted',
  UNDERLINE: 'underline',
} as const;

export type LinkVariant = (typeof LINK_VARIANTS)[keyof typeof LINK_VARIANTS];

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: LinkVariant;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
} & StyleProps;

export const Link = ({ href, variant = LINK_VARIANTS.DEFAULT, active = false, className = '', style, children, ...props }: LinkProps) => {
  const stylePropsCSS = stylePropsToCSS(props);
  const computedStyle = { ...stylePropsCSS, ...style };

  const { background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, align, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props;

  return (
    <a
      href={href}
      className={cn(styles.link, styles[variant], active && styles.active, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </a>
  );
};
