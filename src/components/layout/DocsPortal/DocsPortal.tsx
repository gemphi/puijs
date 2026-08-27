import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import { Portal } from '../Portal/Portal';
import type { DocsPortalProps, DocGuide } from './types';
import { DocsArticle } from './DocsArticle';
import { DocsNavbar } from './DocsNavbar';
import { DocsSidebar } from './DocsSidebar';
import { DocsTOC } from './DocsTOC';
import styles from './DocsPortal.module.scss';

export const DocsPortal: React.FC<DocsPortalProps> = ({
  guides,
  initialGuideId = 'quickstart',
  activeGuideId: controlledGuideId,
  onGuideChange,
  version,
  brandTitle = 'Docs',
  onBackToApp,
  backToAppLabel = 'Open App',
  dark,
  onToggleDark,
  className = '',
}) => {
  const [internalGuideId, setInternalGuideId] = useState<string>(initialGuideId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const activeGuideId = controlledGuideId ?? internalGuideId;

  useEffect(() => {
    if (controlledGuideId === undefined) setInternalGuideId(initialGuideId);
  }, [controlledGuideId, initialGuideId]);

  const selectGuide = (id: string) => {
    if (controlledGuideId === undefined) setInternalGuideId(id);
    onGuideChange?.(id);
  };

  const visibleGuides = useMemo(() => {
    return guides.filter((guide) => !guide.hidden && !guide.draft);
  }, [guides]);

  const filteredGuides = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return visibleGuides;
    return visibleGuides.filter((guide) => [guide.title, guide.category, guide.summary, guide.content]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query)));
  }, [visibleGuides, searchQuery]);

  const categories = useMemo(() => {
    const grouped: Record<string, DocGuide[]> = {};
    filteredGuides.forEach((guide) => {
      grouped[guide.category] = [...(grouped[guide.category] || []), guide];
    });
    return grouped;
  }, [filteredGuides]);

  const activeGuide = useMemo(() => {
    return visibleGuides.find((guide) => guide.id === activeGuideId) || visibleGuides[0];
  }, [visibleGuides, activeGuideId]);

  const currentIndex = visibleGuides.findIndex((guide) => guide.id === activeGuide?.id);
  const prevGuide = currentIndex > 0 ? visibleGuides[currentIndex - 1] : undefined;
  const nextGuide = currentIndex >= 0 && currentIndex < visibleGuides.length - 1 ? visibleGuides[currentIndex + 1] : undefined;

  if (!activeGuide) return null;

  return (
    <Portal
      variant="docs"
      className={cn(styles.portal, className)}
      contentClassName={styles.contentGrid}
      header={(
        <DocsNavbar
          brandTitle={brandTitle}
          version={version}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onHome={() => selectGuide(visibleGuides[0]?.id || initialGuideId)}
          onBackToApp={onBackToApp}
          backToAppLabel={backToAppLabel}
          dark={dark}
          onToggleDark={onToggleDark}
        />
      )}
      sidebar={<DocsSidebar categories={categories} activeGuideId={activeGuide.id} onSelectGuide={selectGuide} />}
      aside={<DocsTOC />}
    >
      <DocsArticle
        guide={activeGuide}
        prevGuide={prevGuide}
        nextGuide={nextGuide}
        onSelectGuide={selectGuide}
      />
    </Portal>
  );
};

export const Docs = DocsPortal;
export const DocsPage = DocsPortal;
export default DocsPortal;
