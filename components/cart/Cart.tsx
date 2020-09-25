import { ProductType } from './types';
import styles from './Cart.module.css';
import Product from './product/Product';
import React from 'react';
import Prices from './prices/Prices';
import Promo from './promo/Promo';

interface Props {
  products: ProductType[];
}

const Cart: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>

      <Prices orderPrice="order price" />

      <Promo />

      <div className={styles['in-total']}>
        In Total: <span>$ total price</span>
      </div>

      <button type="button" className={styles['place-button']}>
        Place Your Order $(total price)
      </button>
    </div>
  );
};

export default Cart;
