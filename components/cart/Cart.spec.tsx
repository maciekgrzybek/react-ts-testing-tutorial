import React from 'react';
import { render } from '@testing-library/react';

import Cart from './Cart';

test('displays hello', () => {
  const { getByText } = render(<Cart />);

  getByText('Cartman');
});
