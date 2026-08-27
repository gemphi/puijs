import type React from 'react';
import type { PortalItem } from '../Portal/types';

export type DocGuide = PortalItem & {
  citations?: string[];
};

export interface DocsPortalProps {
  guides: DocGuide[];
  initialGuideId?: string;
  activeGuideId?: string;
  onGuideChange?: (id: string) => void;
  version?: string;
  brandTitle?: string;
  onBackToApp?: () => void;
  backToAppLabel?: string;
  dark?: boolean;
  onToggleDark?: () => void;
  className?: string;
}
