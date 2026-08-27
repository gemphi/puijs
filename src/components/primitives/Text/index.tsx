import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export type TextIntent =
  | 'default'
  | 'muted'
  | 'secondary'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right';

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'align'> & {
  intent?: TextIntent;
  variant?: TextIntent;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  as?: 'p' | 'span' | 'div' | 'label';
  children?: React.ReactNode;
} & StyleProps;

export const Text = ({
  intent,
  variant,
  size = 'md',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  className = '',
  style,
  children,
  ...props
}: TextProps) => {
  const resolvedIntent = intent || variant || 'default';
  const stylePropsCSS = stylePropsToCSS(props);
  const computedStyle = { ...stylePropsCSS, ...style };

  const { background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props;

  return React.createElement(
    Component,
    {
      className: cn(
        styles.text,
        styles[`intent-${resolvedIntent}`],
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        className
      ),
      style: computedStyle,
      ...rest,
    },
    children
  );
};
