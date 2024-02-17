import * as React from 'react';
import { render } from '@testing-library/react'
import Header from './Header';

describe('Header', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<Header />);

    // Assert
    expect(container).toBeTruthy();
  });
});
