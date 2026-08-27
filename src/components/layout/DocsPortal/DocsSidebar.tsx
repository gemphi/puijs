import React, { useMemo } from 'react';
import { PortalSidebar } from '../Portal/PortalSidebar';
import type { PortalSection } from '../Portal/types';
import type { DocGuide } from './types';
import styles from './DocsSidebar.module.scss';

interface DocsSidebarProps {
  categories: Record<string, DocGuide[]>;
  activeGuideId: string;
  onSelectGuide: (id: string) => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  categories,
  activeGuideId,
  onSelectGuide,
}) => {
  const sections = useMemo<PortalSection[]>(() => {
    return Object.entries(categories).map(([title, guides]) => ({
      title,
      items: guides.map(({ id, title: itemTitle, slug, position }) => ({ id, title: itemTitle, slug, position })),
    }));
  }, [categories]);

  return (
    <PortalSidebar
      title="Documentation"
      sections={sections}
      activeItemId={activeGuideId}
      onSelectItem={onSelectGuide}
      className={styles.sidebar}
    />
  );
};
