import * as React from 'react';
import { render, screen } from '@testing-library/react';
import HomeView, { ScriptListItem } from './HomeView';

describe('HomeView', () => {
  it('should render without errors', () => {
    // Act
    const { container } = render(<HomeView />);

    // Assert
    expect(container).toBeTruthy();
  });

  describe('ScriptListItem', () => {
    it('should render without errors', () => {
      // Act
      render(
        <ScriptListItem command="npm run generate:view <VIEW_NAME>">
          {' '}
          <div>Script</div>
        </ScriptListItem>
      );

      // Assert
      expect(
        screen.getByText('npm run generate:view <VIEW_NAME>').innerHTML
      ).toEqual('npm run generate:view &lt;VIEW_NAME&gt;');
    });

    it('should render notes', () => {
      // Act
      render(
        <ScriptListItem
          notes={[<div data-testid="list-item-test" />]}
          command="npm run generate:view <VIEW_NAME>"
        >
          <div>Script</div>
        </ScriptListItem>
      );

      // Assert
      expect(screen.getByTestId('list-item-test')).toBeTruthy();
    });
  });
});
