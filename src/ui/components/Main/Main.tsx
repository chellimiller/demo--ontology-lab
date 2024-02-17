import styled from '@emotion/styled';
import * as React from 'react';

/**
 * Props for the Main
 */
export type MainProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Contains the main content for the app.
 *
 * @param props
 * @returns
 */
const Main = styled.main`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  padding: var(--p--xl);
  overflow: auto;

  color: inherit;
  background: transparent;
`;

export default Main;
