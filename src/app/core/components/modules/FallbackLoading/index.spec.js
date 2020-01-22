import React from 'react';
import { render } from '@testing-library/react';
import FallbackLoading from './index';

describe('FallbackLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<FallbackLoading />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
