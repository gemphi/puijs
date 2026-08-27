import React from 'react';
import { MenuItem } from '../../navigation/Menu';
import { Sidebar, SidebarBody, SidebarHeader } from '../../navigation/Sidebar';
import { Text } from '../../primitives/Text';
import { Section } from '../Section';
import { Stack } from '../Stack';
import type { PortalSection } from './types';

export interface PortalSidebarProps {
  title: string;
  sections: PortalSection[];
  activeItemId?: string;
  onSelectItem: (id: string) => void;
  className?: string;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  title,
  sections,
  activeItemId,
  onSelectItem,
  className = '',
}) => {
  return (
    <Sidebar defaultCollapsed={false} className={className}>
      <SidebarHeader>
        <Text size="sm" weight="semibold">{title}</Text>
      </SidebarHeader>
      <SidebarBody>
        <Stack direction="column" gap={4}>
          {sections.map((section) => (
            <Section as="nav" key={section.title} padding={0}>
              <Text as="span" size="xs" weight="bold" color="text-secondary" textTransform="uppercase" letterSpacing="0.06em">
                {section.title}
              </Text>
              <Stack direction="column" gap={1}>
                {section.items.map((item) => (
                  <MenuItem key={item.id} active={item.id === activeItemId} onClick={() => onSelectItem(item.id)}>
                    <Text as="span" size="sm">{item.title}</Text>
                  </MenuItem>
                ))}
              </Stack>
            </Section>
          ))}
        </Stack>
      </SidebarBody>
    </Sidebar>
  );
};
