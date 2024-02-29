import * as React from 'react';
import { render } from '@testing-library/react';
import UploadOntology from './UploadOntology';

describe('UploadOntology', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const { container } = render(<UploadOntology label='test'/>);

    // Assert
    expect(container).toBeTruthy();
  });
});
