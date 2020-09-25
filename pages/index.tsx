import Head from 'next/head';
import { useState } from 'react';

import Cart from '../components/cart/Cart';

import { mockData } from '../mock-data';

export default function Home() {
  const [products, setProducts] = useState(mockData.products);

  const removeProduct = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  const addProduct = (id: string) => {
    setProducts((currentProducts) => {
      const item = currentProducts.find((product) => product.id === id);
      return [
        ...currentProducts.filter((product) => product.id !== id),
        {
          ...item,
          quantity: item.quantity + 1,
        },
      ];
    });
  };

  const subtractProduct = (id: string) => {
    setProducts((currentProducts) => {
      const item = currentProducts.find((product) => product.id === id);
      return [
        ...currentProducts.filter((product) => product.id !== id),
        {
          ...item,
          quantity: item.quantity - 1,
        },
      ];
    });
  };

  return (
    <Cart
      products={products}
      promoCodes={mockData.promoCodes}
      removeProduct={removeProduct}
      addProduct={addProduct}
      subtractProduct={subtractProduct}
    />
  );
}
