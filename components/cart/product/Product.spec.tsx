import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Product, { Props } from './Product';
import { mockData } from '../../../mock-data';

const DEFAULT_PROPS: Props = {
  product: mockData.products[0],
  handleRemove: jest.fn(),
  handleAdd: jest.fn(),
  handleSubtract: jest.fn(),
};

const renderComponent = (props = {}) => {
  return {
    ...render(<Product {...DEFAULT_PROPS} {...props} />),
    props: {
      ...DEFAULT_PROPS,
      ...props,
    },
  };
};

test('shows the correct name', () => {
  renderComponent();
  expect(screen.getByText(DEFAULT_PROPS.product.name)).toBeInTheDocument();
});

test('shows the correct color', () => {
  renderComponent();
  expect(screen.getByText(DEFAULT_PROPS.product.color)).toBeInTheDocument();
});

test('shows the correct price', () => {
  renderComponent();
  expect(
    screen.getByText(DEFAULT_PROPS.product.price.toString(), { exact: false })
  ).toBeInTheDocument();
});

test('shows the correct quantity', () => {
  renderComponent();
  expect(
    screen.getByText(DEFAULT_PROPS.product.quantity.toString())
  ).toBeInTheDocument();
});

test.each`
  discount | price     | promoAvailable | expectedDiscountPrice
  ${20}    | ${29.99}  | ${true}        | ${23.99}
  ${25}    | ${56.72}  | ${true}        | ${42.54}
  ${15}    | ${121.55} | ${true}        | ${103.32}
  ${20}    | ${29.99}  | ${false}       | ${23.99}
  ${25}    | ${56.72}  | ${false}       | ${42.54}
  ${15}    | ${121.55} | ${false}       | ${103.32}
`(
  'shows or does not show the discounted price',
  ({ discount, price, promoAvailable, expectedDiscountPrice }) => {
    renderComponent({
      discount,
      product: { ...DEFAULT_PROPS.product, price, promoAvailable },
    });

    if (promoAvailable) {
      expect(
        screen.getByText(`$ ${expectedDiscountPrice}`)
      ).toBeInTheDocument();
      screen.getByText(`${price}`);
    } else {
      expect(screen.queryByText(`$ ${expectedDiscountPrice}`)).toBeNull();
      screen.getByText(`$ ${price}`);
    }
  }
);

test('disables the decrease button when the quantity equals 1', () => {
  const { rerender } = renderComponent();
  expect(screen.getByRole('button', { name: /\-/i })).toBeDisabled();

  const newProps: Props = {
    ...DEFAULT_PROPS,
    product: {
      ...DEFAULT_PROPS.product,
      quantity: 2,
    },
  };
  rerender(<Product {...newProps} />);
  expect(screen.getByRole('button', { name: /\-/i })).not.toBeDisabled();
});

describe('fires callback on button click', () => {
  test('add button', () => {
    renderComponent();
    userEvent.click(screen.getByRole('button', { name: /\+/i }));
    expect(DEFAULT_PROPS.handleAdd).toBeCalled();
    expect(DEFAULT_PROPS.handleAdd).toBeCalledTimes(1);
    expect(DEFAULT_PROPS.handleAdd).toBeCalledWith(DEFAULT_PROPS.product.id);
  });

  test('subtract button', () => {
    renderComponent({
      product: {
        ...DEFAULT_PROPS.product,
        quantity: 2,
      },
    });
    userEvent.click(screen.getByRole('button', { name: /\-/i }));
    expect(DEFAULT_PROPS.handleSubtract).toBeCalled();
    expect(DEFAULT_PROPS.handleSubtract).toBeCalledTimes(1);
    expect(DEFAULT_PROPS.handleSubtract).toBeCalledWith(
      DEFAULT_PROPS.product.id
    );
  });

  test('remove button', () => {
    renderComponent();
    userEvent.click(screen.getByRole('button', { name: /\x/i }));
    expect(DEFAULT_PROPS.handleRemove).toBeCalled();
    expect(DEFAULT_PROPS.handleRemove).toBeCalledTimes(1);
    expect(DEFAULT_PROPS.handleRemove).toBeCalledWith(DEFAULT_PROPS.product.id);
  });
});
