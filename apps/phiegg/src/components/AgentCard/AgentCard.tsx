import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Title, Text, Tag, Badge, Button, Icon, ProgressBar } from '@pui/components';
import { AgentMetric } from '../../types/agents';
import { Bot, Clock, Zap, Cpu, Play, CheckCircle, AlertTriangle } from 'lucide-react';

interface AgentCardProps {
  agent: AgentMetric;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onSelect }) => {
  const getStatusIcon = () => {
    if (agent.status === 'RUNNING') return Play;
    if (agent.status === 'HEALTHY') return CheckCircle;
    return AlertTriangle;
  };

  const getIntent = () => {
    if (agent.status === 'RUNNING') return 'primary';
    if (agent.status === 'HEALTHY') return 'success';
    if (agent.status === 'DEGRADED') return 'warning';
    return 'none';
  };

  return (
    <Card
      variant={isSelected ? 'hero' : 'default'}
      selected={isSelected}
      hoverable
      onClick={() => onSelect(agent.id)}
    >
      <CardHeader
        action={
          <Tag intent={getIntent()} minimal round size="sm">
            <Icon icon={getStatusIcon()} size="xs" />
            <Text size="xs">{agent.status}</Text>
          </Tag>
        }
      >
        <Stack direction="row" align="center" gap={2}>
          <Icon icon={Bot} size="sm" />
          <Title level={5} size="sm">{agent.name}</Title>
          <Badge variant="neutral" size="sm">{agent.tag}</Badge>
        </Stack>
      </CardHeader>

      <CardBody>
        <Stack direction="column" gap={2}>
          <Text size="xs" variant="secondary">{agent.description}</Text>

          <Stack direction="row" justify="between" align="center">
            <Stack direction="row" align="center" gap={1}>
              <Icon icon={Clock} size="xs" />
              <Text size="xs">{agent.latencyMs} ms</Text>
            </Stack>
            <Stack direction="row" align="center" gap={1}>
              <Icon icon={Zap} size="xs" />
              <Text size="xs">r = {agent.orderParam.toFixed(3)}</Text>
            </Stack>
            <Stack direction="row" align="center" gap={1}>
              <Icon icon={Cpu} size="xs" />
              <Text size="xs">{agent.memoryMb} MB</Text>
            </Stack>
          </Stack>

          <ProgressBar value={agent.orderParam * 100} variant={agent.orderParam > 0.98 ? 'success' : 'primary'} size="sm" />
        </Stack>
      </CardBody>

      <CardFooter>
        <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
          <Text size="xs" variant="muted">Uptime: {agent.uptime}</Text>
          <Button
            size="sm"
            variant={isSelected ? 'primary' : 'ghost'}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(agent.id);
            }}
          >
            {isSelected ? 'Active Agent' : 'Dispatch'}
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};
