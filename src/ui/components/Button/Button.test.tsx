import * as React from 'react';
import { render } from '@testing-library/react'
import Button from './Button';

describe('Button', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<Button label="hello" />);

    // Assert
    expect(container).toBeTruthy();
  });
});
