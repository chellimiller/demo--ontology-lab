import * as React from 'react';
import styled, { StyledComponent } from '@emotion/styled';
// This is only used to allow routes to be provided.
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from 'react-router-dom';
import { heading } from '../../emotion';

/**
 * Props for the Header
 */
export type HeaderProps = React.HTMLAttributes<HTMLElement>;

export interface HeaderComponent extends React.FC<HeaderProps> {
  Title: StyledComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  Actions: StyledComponent<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Provides actions and title for the app.
 *
 * @param props
 * @returns
 */
const Header: HeaderComponent = styled.header`
  display: flex;
  flex-flow: row wrap;
  padding: var(--p--md) var(--p--lg);
  align-items: center;
  justify-content: space-between;

  background: var(--color--header);
  color: var(--color--on-header);

  box-shadow: var(--shadow--md);
` as unknown as HeaderComponent;

Header.Title = styled.a`
  display: flex;
  flex-flow: row nowrap;
  margin-right: var(--m--lg);
  align-items: center;
  justify-content: flex-start;

  color: inherit;
  background: transparent;
  text-decoration: none;

  ${heading.md}

  margin-bottom: 0;

  & > svg {
    margin-inline-end: var(--m--xs);
  }

  &:hover {
    text-decoration: underline;
  }
`.withComponent(Link);

Header.Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;

  color: inherit;
  background: transparent;

  & > * {
    margin-inline: var(--m--xs);
  }
`;

export default Header;
