import React from 'react';
import { render } from '@testing-library/react';

import Comp from './Comp';

test('displays hello', () => {
  const { getByText } = render(<Comp />);

  getByText('hello');
});
