import Head from 'next/head';
import { useState } from 'react';

import Cart from '../components/cart/Cart';

import { mockData } from '../mock-data';

export default function Home() {
  const [products, setProducts] = useState(mockData);
  return <Cart products={products} />;
}
