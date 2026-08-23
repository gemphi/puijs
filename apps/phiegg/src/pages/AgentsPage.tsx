import React from 'react';
import { Page, Stack, Grid, Col, Card, CardBody, Title, Text, Tag, Badge, Icon } from '@pui/components';
import { useStore } from '@pui/store';
import { agentStore } from '../state/agentStore';
import { AgentCard } from '../components/AgentCard/AgentCard';
import { AgentChat } from '../components/AgentChat/AgentChat';
import { Bot, Clock, ShieldCheck, Zap } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const { agents, selectedAgentId, selectAgent } = useStore(agentStore);

  return (
    <Page>
      <Stack direction="column" gap={4}>
        <Stack direction="row" justify="between" align="center">
          <Stack direction="column" gap={1}>
            <Title level={2} size="xl">AIP Agent Swarm Hub</Title>
            <Text size="md" intent="secondary">
              Real-time telemetry, Kuramoto phase coherence, and multi-turn execution trace console.
            </Text>
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Tag intent="success" minimal round size="md">15/15 Active</Tag>
            <Badge variant="primary" size="md">r = 0.984</Badge>
          </Stack>
        </Stack>

        <Grid gap={3}>
          <Col span={3}>
            <Card variant="flat" style={{ padding: '16px' }}>
              <CardBody>
                <Stack direction="row" align="center" gap={3}>
                  <Icon icon={Bot} size="lg" />
                  <Stack direction="column" gap={1}>
                    <Text size="sm" intent="muted" weight="medium">Swarm Agents</Text>
                    <Title level={3} size="lg">15 / 15</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat" style={{ padding: '16px' }}>
              <CardBody>
                <Stack direction="row" align="center" gap={3}>
                  <Icon icon={Zap} size="lg" />
                  <Stack direction="column" gap={1}>
                    <Text size="sm" intent="muted" weight="medium">Kuramoto Order (r)</Text>
                    <Title level={3} size="lg">0.984</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat" style={{ padding: '16px' }}>
              <CardBody>
                <Stack direction="row" align="center" gap={3}>
                  <Icon icon={Clock} size="lg" />
                  <Stack direction="column" gap={1}>
                    <Text size="sm" intent="muted" weight="medium">Mean Latency</Text>
                    <Title level={3} size="lg">38.4 ms</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat" style={{ padding: '16px' }}>
              <CardBody>
                <Stack direction="row" align="center" gap={3}>
                  <Icon icon={ShieldCheck} size="lg" />
                  <Stack direction="column" gap={1}>
                    <Text size="sm" intent="muted" weight="medium">Cryptographic Proofs</Text>
                    <Title level={3} size="lg">100% Valid</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Grid>

        <Grid gap={4}>
          <Col span={7}>
            <Grid gap={3}>
              {agents.map((agent) => (
                <Col span={6} key={agent.id}>
                  <AgentCard
                    agent={agent}
                    isSelected={agent.id === selectedAgentId}
                    onSelect={selectAgent}
                  />
                </Col>
              ))}
            </Grid>
          </Col>
          <Col span={5}>
            <AgentChat />
          </Col>
        </Grid>
      </Stack>
    </Page>
  );
};
