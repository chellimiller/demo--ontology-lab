import * as React from 'react';
import { render } from '@testing-library/react'
import Main from './Main';

describe('Main', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<Main />);

    // Assert
    expect(container).toBeTruthy();
  });
});
