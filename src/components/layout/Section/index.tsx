import React from 'react';
import { cn } from '../../../utils/cn';
import { StyleProps, stylePropsToCSS } from '../../shared/styleProps';
import styles from './styles.module.scss';

export type SectionTag = 'header' | 'main' | 'footer' | 'section' | 'nav' | 'aside' | 'div';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: SectionTag;
  className?: string;
  children?: React.ReactNode;
} & StyleProps;

export const Section = ({
  as: Tag = 'section',
  className = '',
  style,
  children,
  ...props
}: SectionProps) => {
  const stylePropsCSS = stylePropsToCSS(props);
  const computedStyle = { ...stylePropsCSS, ...style };

  const { as: _as, background, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingX, paddingY, margin, marginTop, marginBottom, color, maxWidth, minWidth, minHeight, align, textDecoration, opacity, textTransform, letterSpacing, ...rest } = props;

  return (
    <Tag className={cn(styles.section, className)} style={computedStyle} {...rest}>
      {children}
    </Tag>
  );
};
