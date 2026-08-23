import React from 'react';
import { cn } from '../../../utils/cn';
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

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  intent?: TextIntent;
  variant?: TextIntent;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  as?: 'p' | 'span' | 'div' | 'label';
  children?: React.ReactNode;
};

export const Text = ({
  intent,
  variant,
  size = 'md',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  className = '',
  children,
  ...props
}: TextProps) => {
  const resolvedIntent = intent || variant || 'default';

  return (
    <Component
      className={cn(
        styles.text,
        styles[`intent-${resolvedIntent}`],
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
