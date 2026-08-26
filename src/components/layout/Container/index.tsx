import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export const CONTAINER_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

export type ContainerSize = (typeof CONTAINER_SIZES)[keyof typeof CONTAINER_SIZES];

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
  fluid?: boolean;
  className?: string;
  children?: React.ReactNode;
} & StyleProps;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, fluid = false, className = '', style, children, ...props }, ref) => {
    const sizeClass = fluid || !size ? styles.full : styles[size];
    const stylePropsCSS = stylePropsToCSS(props);
    const computedStyle = { ...stylePropsCSS, ...style };

    const { background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, align, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props;

    return (
      <div ref={ref} className={cn(styles.container, sizeClass, className)} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';
