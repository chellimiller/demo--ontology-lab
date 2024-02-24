import * as React from 'react';
import { render } from '@testing-library/react';
import BuilderView from './BuilderView';

describe('BuilderView', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<BuilderView />);

    // Assert
    expect(container).toBeTruthy();
  });
});
