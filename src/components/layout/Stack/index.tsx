import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  ref?: React.Ref<HTMLDivElement>;
} & StyleProps;

const justifyMap: Record<StackJustify, React.CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignMap: Record<StackAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(({
  children,
  direction = 'column',
  gap = 2,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  style,
  ...props
}, ref) => {
  const stylePropsCSS = stylePropsToCSS(props);
  const computedStyle: React.CSSProperties = {
    flexDirection: direction,
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: `${gap * 0.25}rem`,
    ...stylePropsCSS,
    ...style,
  };

  const { background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, align: _align, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props;

  return (
    <div ref={ref} className={cn(styles.stack, className)} style={computedStyle} {...rest}>
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';
