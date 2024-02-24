import * as React from 'react';
import { render } from '@testing-library/react';
import ExplorerView from './ExplorerView';

describe('ExplorerView', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<ExplorerView />);

    // Assert
    expect(container).toBeTruthy();
  });
});
