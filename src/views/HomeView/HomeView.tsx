import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { UtoriLogoIcon } from '../../ui/icons';
import { heading, text } from '../../ui/emotion';

/**
 * Props for the HomeView component.
 */
export type HomeViewProps = React.HTMLAttributes<HTMLDivElement>;

const Section: React.FC<{
  header: React.ReactNode;
  children: React.ReactNode;
}> = ({ header, children }) => (
  <section
    css={css`
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-bottom: var(--m--xl);
    `}
  >
    <h2
      css={css`
        text-align: center;
        ${heading.md}
        margin-bottom: 0rem;
      `}
    >
      {header}
    </h2>
    <div
      css={css`
        max-width: 40rem;
        margin: 0;
        padding: 0;
        text-align: left;
      `}
    >
      {children}
    </div>
  </section>
);

const ScriptList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ScriptListItem: React.FC<{
  command: string;
  notes?: React.ReactNode[];
  children: React.ReactNode;
}> = ({ command, notes, children }) => (
  <li
    css={css`
      padding: var(--p--md) 0;
      margin: var(--m--md) 0;
    `}
  >
    <code>{command}</code>
    <div
      css={css`
        ${text.sm};
        margin: var(--m--sm) var(--m--md);
      `}
    >
      {children}
    </div>
    {notes && !!notes.length && (
      <ul>
        {notes.map((note, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{note}</li>
        ))}
      </ul>
    )}
  </li>
);

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const HomeView: React.FC<HomeViewProps> = (props) => (
  <div {...props}>
    <h1
      css={css`
        text-align: center;
        ${heading.lg};
        margin: var(--m--lg) 0;
      `}
    >
      Prototype React App Template
    </h1>
    <Section header="By utori.dev">
      <div
        css={css`
          text-align: center;
        `}
      >
        <UtoriLogoIcon
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="200"
          height="200"
          fill="#4898da"
          stroke="none"
          viewBox="0 0 100 100"
        />
      </div>
      <p>
        <a href="https://utori.dev">utori.dev</a> is a project that aims to
        offer templates and tools for getting started with web development.
      </p>
    </Section>

    <Section header="Purpose">
      <p>Starter React app with TypeScript and several helpful dependencies.</p>
      <p>
        This template is ideal for prototypes, but includes more dependencies
        that are likely needed for your individual use case. It is a good idea
        to review these dependencies and remove any you find unnecessary.
      </p>
      <p>
        <a href="https://github.com/utori-dev/template-react-app-prototype">
          View the repository on GitHub to clone your own project from this
          template!
        </a>
      </p>
    </Section>

    <Section header="Useful Scripts">
      <ScriptList>
        <ScriptListItem command="npm run generate:icon <ICON_NAME>">
          Used to generate a React icon/svg component which will be saved to{' '}
          <code>./src/ui/icons/</code>
        </ScriptListItem>
        <ScriptListItem command="npm run generate:emotion <STYLESET_NAME>">
          Used to generate an Emotion.js template file which will be saved to{' '}
          <code>./src/ui/emotion/</code>
        </ScriptListItem>
        <ScriptListItem command="npm run generate:component <COMPONENT_NAME>">
          Used to generate a React functional component which will be saved to{' '}
          <code>./src/ui/components/</code>
        </ScriptListItem>
        <ScriptListItem command="npm run generate:view <VIEW_NAME>">
          Used to generate a React functional component which will be saved to{' '}
          <code>./src/views/</code>
        </ScriptListItem>
      </ScriptList>
    </Section>
  </div>
);

export default HomeView;
