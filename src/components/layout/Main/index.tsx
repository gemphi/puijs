import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export type MainProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
} & StyleProps;

export const Main: React.FC<MainProps> = ({ className = '', style, children, ...props }) => {
  const stylePropsCSS = stylePropsToCSS(props);
  const computedStyle = { ...stylePropsCSS, ...style } as React.CSSProperties;

  const { background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, align, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props as any;

  return (
    <main className={cn(styles.main, className)} style={computedStyle} {...rest}>
      {children}
    </main>
  );
};

export default Main;
