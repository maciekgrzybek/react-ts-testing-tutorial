import styles from './Prices.module.css';

interface Props {
  orderPrice: string;
  deliveryPrice?: string;
}
const Prices: React.FC<Props> = ({ orderPrice, deliveryPrice }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Order</span>
      <span className={styles.price}>$ {orderPrice}</span>
      <span className={styles.label}>Delivery</span>
      <span className={styles.price}>
        $ {deliveryPrice ? deliveryPrice : '0'}
      </span>
    </div>
  );
};

export default Prices;
