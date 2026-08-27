import type React from 'react';

export type PortalVariant = 'docs' | 'blog' | 'landing' | 'app';

export interface PortalItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge?: string;
  summary?: string;
  position?: number;
  hidden?: boolean;
  draft?: boolean;
  content: string;
}

export interface PortalSectionItem {
  id: string;
  title: string;
  slug?: string;
  position?: number;
}

export interface PortalSection {
  title: string;
  items: PortalSectionItem[];
}

export interface PortalProps {
  variant?: PortalVariant;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  sidebarClassName?: string;
  asideClassName?: string;
}
