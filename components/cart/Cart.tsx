import { ProductType, PromoCode } from './types';
import styles from './Cart.module.css';
import Product from './product/Product';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import Prices from './prices/Prices';
import Promo from './promo/Promo';

export interface Props {
  products: ProductType[];
  promoCodes: PromoCode[];
  removeProduct: (string) => void;
  addProduct: (string) => void;
  subtractProduct: (string) => void;
  freeDeliveryPrice?: number;
}

const Cart: React.FC<Props> = ({
  products,
  promoCodes,
  removeProduct,
  addProduct,
  subtractProduct,
  freeDeliveryPrice = 500,
}) => {
  const [discount, setDiscount] = useState(null);
  const [promoError, setPromoError] = useState(null);
  const [orderFinished, setOrderFinished] = useState(false);

  const orderPrice = products.reduce((acc, current) => {
    return (
      acc +
      current.quantity *
        current.price *
        (discount && current.promoAvailable ? (100 - discount) / 100 : 1)
    );
  }, 0);

  const deliveryPrice = orderPrice > freeDeliveryPrice ? 0 : 30;
  const totalPrice = (orderPrice + deliveryPrice).toFixed(2);

  const handlePromoCode = useCallback((code: string) => {
    const promotion = promoCodes.find((promoCode) => promoCode.name === code);
    if (promotion) {
      setDiscount(promotion.discount);
      setPromoError(null);
    } else {
      setPromoError('Sorry, this code is invalid.');
    }
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setOrderFinished(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        {orderFinished && (
          <div className={styles['order-finished']}>Thank you for order</div>
        )}
        <ul>
          {products
            .sort((a, b) => {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
              return 0;
            })
            .map((product) => (
              <Product
                product={product}
                discount={discount}
                key={product.id}
                handleRemove={removeProduct}
                handleAdd={addProduct}
                handleSubtract={subtractProduct}
              />
            ))}
        </ul>

        <Prices
          orderPrice={orderPrice.toFixed(2)}
          deliveryPrice={deliveryPrice}
        />

        {discount ? (
          <div className={styles.discount}>
            <span>Discount applied: {discount}%</span>
            <button onClick={() => setDiscount(null)}>
              Add different code
            </button>
          </div>
        ) : (
          <Promo handlePromoCode={handlePromoCode} />
        )}
        {promoError && (
          <span className={styles.error} role="alert">
            {promoError}
          </span>
        )}

        <div className={styles['in-total']}>
          In Total: <span>$ {totalPrice}</span>
        </div>

        <button className={styles['place-button']} type="submit">
          Place Your Order
        </button>
      </div>
    </form>
  );
};

export default Cart;
