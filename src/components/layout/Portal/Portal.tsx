import React from 'react';
import { cn } from '../../../utils/cn';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { Section } from '../Section';
import type { PortalProps } from './types';
import styles from './Portal.module.scss';

export const Portal: React.FC<PortalProps> = ({
  variant = 'app',
  header,
  sidebar,
  aside,
  footer,
  children,
  className = '',
  contentClassName = '',
  sidebarClassName = '',
  asideClassName = '',
}) => {
  return (
    <Section as="section" className={cn(styles.portal, className)} padding={0} data-portal-variant={variant}>
      {header && <Header className={styles.header}>{header}</Header>}
      <Main className={styles.main}>
        <Section as="section" className={cn(styles.contentGrid, contentClassName)} padding={0}>
          {sidebar && (
            <Section as="aside" className={cn(styles.sidebar, sidebarClassName)} padding={0}>
              {sidebar}
            </Section>
          )}
          <Section as="section" className={styles.content} padding={0}>
            {children}
          </Section>
          {aside && (
            <Section as="aside" className={cn(styles.aside, asideClassName)} padding={0}>
              {aside}
            </Section>
          )}
        </Section>
      </Main>
      {footer && <Footer className={styles.footer}>{footer}</Footer>}
    </Section>
  );
};

export default Portal;
