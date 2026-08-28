import React from 'react';
import { Sticky } from '../Sticky';
import { Section } from '../Section';
import { Text } from '../../primitives/Text';
import styles from './DocsTOC.module.scss';

export interface DocsTOCProps {
  items?: string[];
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

export const DocsTOC: React.FC<DocsTOCProps> = ({ items = [], activeItem, onSelectItem }) => {
  if (!items.length) return null;
  const active = activeItem ?? items[0];
  return (
    <Sticky top={65}>
      <Section as="aside" className={styles.toc}>
        <Text as="span" size="xs" variant="secondary" className={styles.title}>
          On This Page
        </Text>
        <Section as="nav" className={styles.list}>
          {items.map((item) => (
            <Text
              key={item}
              as="span"
              size="sm"
              variant={item === active ? 'primary' : 'secondary'}
              weight={item === active ? 'semibold' : 'normal'}
              onClick={onSelectItem ? () => onSelectItem(item) : undefined}
            >
              {item}
            </Text>
          ))}
        </Section>
      </Section>
    </Sticky>
  );
};
