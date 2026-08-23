import React from 'react';
import { Card, CardHeader, CardBody, Title, Text, Tag, Icon, Callout, Stack } from '@pui/components';
import { BookOpen, Code } from 'lucide-react';
import { ApiEndpoint } from '../../types/docs';

interface DocsContentProps {
  endpoint: ApiEndpoint;
  activeLanguage: 'python' | 'ts' | 'curl';
}

export const DocsContent: React.FC<DocsContentProps> = ({ endpoint, activeLanguage }) => {
  const getCodeSnippet = () => {
    if (activeLanguage === 'python') return endpoint.pythonSnippet;
    if (activeLanguage === 'ts') return endpoint.tsSnippet;
    return endpoint.curlSnippet;
  };

  return (
    <Card variant="default">
      <CardHeader action={<Tag intent="primary" minimal round>{endpoint.method}</Tag>}>
        <Stack direction="row" align="center" gap={2}>
          <Icon icon={BookOpen} size="sm" />
          <Title level={4} size="sm">{endpoint.summary}</Title>
        </Stack>
      </CardHeader>
      <CardBody>
        <Stack direction="column" gap={3}>
          <Text size="sm">{endpoint.description}</Text>
          <Card variant="compact">
            <CardBody>
              <Text size="xs" variant="primary">Path: {endpoint.path}</Text>
            </CardBody>
          </Card>
          <Title level={5} size="sm">SDK Code Snippet ({activeLanguage.toUpperCase()})</Title>
          <Callout intent="primary" icon={<Icon icon={Code} size="sm" />}>
            <Text size="xs" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {getCodeSnippet()}
            </Text>
          </Callout>
        </Stack>
      </CardBody>
    </Card>
  );
};
