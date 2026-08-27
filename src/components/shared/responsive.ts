import type React from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export const RESPONSIVE_BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

type ResponsiveRecord<T> = Partial<Record<Breakpoint, T>>;

function isResponsiveRecord<T>(value: ResponsiveValue<T>): value is ResponsiveRecord<T> {
  return typeof value === 'object' && value !== null;
}

export function responsiveCSSVars<T>(
  name: string,
  value: ResponsiveValue<T> | undefined,
  serialize: (value: T) => string = String,
): React.CSSProperties {
  const vars: Record<string, string> = {};

  if (value === undefined) {
    return vars as React.CSSProperties;
  }

  if (!isResponsiveRecord(value)) {
    vars[`--${name}`] = serialize(value);
    return vars as React.CSSProperties;
  }

  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const breakpointValue = value[breakpoint];
    if (breakpointValue !== undefined) {
      const suffix = breakpoint === 'xs' ? '' : `-${breakpoint}`;
      vars[`--${name}${suffix}`] = serialize(breakpointValue);
    }
  }

  return vars as React.CSSProperties;
}
