import React from 'react';
import { act, render, screen, within } from '@testing-library/react';

import Cart, { Props } from './Cart';
import { mockData } from '../../mock-data';
import userEvent from '@testing-library/user-event';

const DEFAULT_PROPS: Props = {
  ...mockData,
  removeProduct: jest.fn(),
  addProduct: jest.fn(),
  subtractProduct: jest.fn(),
};

const renderComponent = (props: Partial<Props> = {}) => {
  return {
    ...render(<Cart {...DEFAULT_PROPS} {...props} />),
    props: {
      ...DEFAULT_PROPS,
      ...props,
    },
  };
};

test('shows the correct products', () => {
  renderComponent();
  DEFAULT_PROPS.products.forEach(({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test('shows the correct order price', () => {
  renderComponent();
  const expectedPrice = 354.65;

  expect(
    screen.getByText(new RegExp(`${expectedPrice}`, 'i'))
  ).toBeInTheDocument();
});

describe('shows the correct delivery price', () => {

  test('when free delivery price was not exceed', () => {
    renderComponent();
    expect(screen.getByText(/30.00/i)).toBeInTheDocument();
  });

  test('when free delivery price was exceed', () => {
    renderComponent({
      products: [
        ...DEFAULT_PROPS.products,
        {
          id: '5',
          name: 'Blazer',
          color: 'yellow',
          price: 150,
          image: 'images/air-force.png',
          promoAvailable: true,
          quantity: 1,
        },
      ],
    });
    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });
});
describe('shows the correct total price', () => {

  test('when free delivery price was not exceed', () => {
    renderComponent();
    const expectedPrice = 384.65;
    expect(screen.getByText(/in total:/i)).toHaveTextContent(
      new RegExp(`${expectedPrice}`, 'i')
    );
  });

  test('when free delivery price was exceed', () => {
    renderComponent({
      products: [
        ...DEFAULT_PROPS.products,
        {
          id: '5',
          name: 'Blazer',
          color: 'yellow',
          price: 150,
          image: 'images/air-force.png',
          promoAvailable: true,
          quantity: 1,
        },
      ],
    });

    const expectedPrice = 504.65;

    expect(screen.getByText(/in total:/i)).toHaveTextContent(
      new RegExp(`${expectedPrice}`, 'i')
    );
  });
});

test('allows to apply a valid promo code', () => {
  renderComponent();
  const { name, discount } = DEFAULT_PROPS.promoCodes[0];

  userEvent.type(screen.getByRole('textbox'), name);
  userEvent.click(screen.getByRole('button', { name: /apply/i }));

  expect(screen.getByText(/discount applied: /i)).toHaveTextContent(
    `${discount}`
  );
});

test('does not allow to apply invalid promo code', () => {
  renderComponent();

  userEvent.type(screen.getByRole('textbox'), 'INVALID_PROMO_CODE');
  userEvent.click(screen.getByRole('button', { name: /apply/i }));

  expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
    <span
      class="error"
      role="alert"
    >
      Sorry, this code is invalid.
    </span>
  `);
});

test('updates the prices accordingly when valid promo code is applied', () => {
  renderComponent();

  const { name } = DEFAULT_PROPS.promoCodes[0];

  userEvent.type(screen.getByRole('textbox'), name);
  userEvent.click(screen.getByRole('button', { name: /apply/i }));

  const orderPrice = 314.21;

  expect(
    screen.getByText(new RegExp(`${orderPrice}`, 'i'))
  ).toBeInTheDocument();
  expect(screen.getByText(/in total:/i)).toHaveTextContent(
    new RegExp(`${orderPrice + 30}`, 'i')
  );
});
