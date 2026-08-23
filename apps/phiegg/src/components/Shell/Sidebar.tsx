import React from 'react';
import { Sidebar, SidebarHeader, SidebarBody, SidebarFooter, Stack, Button, Icon, Badge, Text, Title, Divider } from '@pui/components';
import { Bot, Database, Radio, MapPin, GitBranch, Shield, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'agents', label: 'Agent Swarm', icon: Bot, badge: '15/15' },
  { id: 'ontology', label: 'POntology Graph', icon: Database, badge: '3 Types' },
  { id: 'streams', label: 'PhiBus Streams', icon: Radio, badge: 'LIVE' },
  { id: 'spatial', label: 'Spatial & Vectors', icon: MapPin },
  { id: 'orchestration', label: 'AIP Playbooks', icon: GitBranch },
  { id: 'governance', label: 'Audit & Governance', icon: Shield },
  { id: 'docs', label: 'API & SDK Docs', icon: BookOpen },
];

export const SidebarNav: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <Sidebar defaultCollapsed={false}>
      <SidebarHeader>
        <Stack direction="column" gap={1}>
          <Title level={5} size="sm">OPERATIONS</Title>
          <Text size="xs" variant="muted">Palantir Foundry Symmetry</Text>
        </Stack>
      </SidebarHeader>

      <SidebarBody>
        <Stack direction="column" gap={1}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'primary' : 'ghost'}
                size="md"
                fullWidth
                onClick={() => onSelectTab(item.id)}
                icon={<Icon icon={item.icon} size="sm" />}
              >
                <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
                  <Text size="sm">{item.label}</Text>
                  {item.badge && (
                    <Badge variant={isActive ? 'neutral' : 'primary'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Stack>
              </Button>
            );
          })}
        </Stack>
      </SidebarBody>

      <SidebarFooter>
        <Stack direction="column" gap={1}>
          <Divider />
          <Text size="xs" variant="muted" align="center">Phiegg Cockpit v2.4</Text>
        </Stack>
      </SidebarFooter>
    </Sidebar>
  );
};
