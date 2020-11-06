import { ProductType } from './components/cart/types';

export const mockData = {
  products: [
    {
      id: '1',
      name: 'Air Force',
      color: 'black/white',
      price: 79.85,
      image: 'images/air-force.png',
      promoAvailable: true,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Air Max 90',
      color: 'white/cream',
      price: 114.9,
      image: 'images/air-max-90.png',
      promoAvailable: false,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Cortez Classic',
      color: 'all black',
      price: 54.95,
      image: 'images/cortez.png',
      promoAvailable: true,
      quantity: 1,
    },
    {
      id: '4',
      name: 'Jordan Max Aura',
      color: 'white/gray',
      price: 104.95,
      image: 'images/jordan.png',
      promoAvailable: false,
      quantity: 1,
    },
  ],
  promoCodes: [
    { name: 'buy30', discount: 30 },
    { name: 'summer25', discount: 25 },
    { name: 'birthday', discount: 15 },
  ],
};
