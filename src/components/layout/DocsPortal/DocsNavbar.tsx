import React from 'react';
import { PortalNavbar } from '../Portal/PortalNavbar';

interface DocsNavbarProps {
  brandTitle: string;
  version?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onHome: () => void;
  onBackToApp?: () => void;
  backToAppLabel?: string;
  dark?: boolean;
  onToggleDark?: () => void;
}

export const DocsNavbar: React.FC<DocsNavbarProps> = ({
  brandTitle,
  version,
  searchQuery,
  onSearchChange,
  onHome,
  onBackToApp,
  backToAppLabel = 'Open App',
  dark,
  onToggleDark,
}) => {
  return (
    <PortalNavbar
      brandTitle={brandTitle}
      version={version}
      searchQuery={searchQuery}
      searchPlaceholder="Search guides, APIs..."
      onSearchChange={onSearchChange}
      onHome={onHome}
      onBackToApp={onBackToApp}
      backToAppLabel={backToAppLabel}
      dark={dark}
      onToggleDark={onToggleDark}
    />
  );
};
