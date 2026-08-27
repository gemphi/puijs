import React from 'react';
import { Portal } from './Portal';
import type { PortalProps } from './types';

export type LandingPortalProps = Omit<PortalProps, 'variant' | 'sidebar' | 'aside'>;

export const LandingPortal: React.FC<LandingPortalProps> = (props) => {
  return <Portal {...props} variant="landing" />;
};

export default LandingPortal;
