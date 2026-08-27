import React from 'react';
import { Sticky } from '../Sticky';
import { Section } from '../Section';
import { Text } from '../../primitives/Text';
import styles from './DocsTOC.module.scss';

export const DocsTOC: React.FC = () => {
  return (
    <Sticky top={65}>
      <Section as="aside" className={styles.toc}>
        <Text as="span" size="xs" variant="secondary" className={styles.title}>
          On This Page
        </Text>
        <Section as="nav" className={styles.list}>
          <Text as="span" size="sm" variant="primary" weight="semibold">Overview & Setup</Text>
          <Text as="span" size="sm" variant="secondary">Mathematical Equations</Text>
          <Text as="span" size="sm" variant="secondary">Production Examples</Text>
          <Text as="span" size="sm" variant="secondary">API Specifications</Text>
        </Section>
      </Section>
    </Sticky>
  );
};
