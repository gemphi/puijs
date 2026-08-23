import React from 'react';
import { Page, Stack, Grid, Col, Card, CardBody, Title, Text, Tag, Badge, Icon, Button } from '@pui/components';
import { useStore } from '@pui/store';
import { agentStore } from '../state/agentStore';
import { AgentCard } from '../components/AgentCard/AgentCard';
import { AgentChat } from '../components/AgentChat/AgentChat';
import { Bot, Activity, Clock, ShieldCheck, Zap } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const { agents, selectedAgentId, selectAgent } = useStore(agentStore);

  return (
    <Page>
      <Stack direction="column" gap={4}>
        <Stack direction="row" justify="between" align="center">
          <Stack direction="column" gap={1}>
            <Title level={2}>AIP Agent Swarm Hub</Title>
            <Text size="sm" variant="secondary">
              Real-time telemetry, Kuramoto phase coherence, and multi-turn execution trace console.
            </Text>
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Tag intent="success" minimal round>15/15 Active</Tag>
            <Badge variant="primary">r = 0.984</Badge>
          </Stack>
        </Stack>

        <Grid gap={3}>
          <Col span={3}>
            <Card variant="flat">
              <CardBody>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={Bot} size="md" />
                  <Stack direction="column">
                    <Text size="xs" variant="muted">Swarm Agents</Text>
                    <Title level={4}>15 / 15</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat">
              <CardBody>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={Zap} size="md" />
                  <Stack direction="column">
                    <Text size="xs" variant="muted">Kuramoto Order (r)</Text>
                    <Title level={4}>0.984</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat">
              <CardBody>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={Clock} size="md" />
                  <Stack direction="column">
                    <Text size="xs" variant="muted">Mean Latency</Text>
                    <Title level={4}>38.4 ms</Title>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Col>
          <Col span={3}>
            <Card variant="flat">
              <CardBody>
                <Stack direction="row" align="center" gap={2}>
                  <Icon icon={ShieldCheck} size="md" />
                  <Stack direction="column">
                    <Text size="xs" variant="muted">Cryptographic Proofs</Text>
                    <Title level={4}>100% Valid</Title>
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
