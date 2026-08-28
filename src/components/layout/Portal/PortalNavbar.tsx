import React from 'react';
import { ArrowLeft, BookOpen, Moon, Search, Sun } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Navbar, NavbarItem, NavbarSection } from '../../navigation/Navbar';
import { Badge } from '../../primitives/Badge';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { Stack } from '../Stack';

export interface PortalNavbarProps {
  brandTitle: string;
  version?: string;
  searchQuery?: string;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  onHome?: () => void;
  onBackToApp?: () => void;
  backToAppLabel?: string;
  dark?: boolean;
  onToggleDark?: () => void;
}

export const PortalNavbar: React.FC<PortalNavbarProps> = ({
  brandTitle,
  version,
  searchQuery,
  searchPlaceholder = 'Search...',
  onSearchChange,
  onHome,
  onBackToApp,
  backToAppLabel = 'Open App',
  dark,
  onToggleDark,
}) => {
  return (
    <Navbar sticky variant="default" height={65}>
      <NavbarSection align="start">
        <NavbarItem onClick={onHome}>
          <Stack direction="row" align="center" gap={2}>
            <Icon icon={BookOpen} size="md" />
            <Text as="span" weight="semibold">{brandTitle}</Text>
          </Stack>
        </NavbarItem>
        {version && <Badge variant="secondary">{version}</Badge>}
      </NavbarSection>
      {onSearchChange && (
        <NavbarSection align="center">
          <Input
            icon={<Search size={15} />}
            placeholder={searchPlaceholder}
            value={searchQuery || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)}
          />
        </NavbarSection>
      )}
      <NavbarSection align="end">
        {onBackToApp && (
          <Button variant="outline" size="sm" onClick={onBackToApp}>
            <ArrowLeft size={15} />
            <span>{backToAppLabel}</span>
          </Button>
        )}
        {onToggleDark && (
          <Button
            variant="icon"
            size="sm"
            onClick={onToggleDark}
            aria-label="Toggle theme mode"
            iconLeft={dark ? Sun : Moon}
          />
        )}
      </NavbarSection>
    </Navbar>
  );
};
