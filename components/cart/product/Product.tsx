import { ProductType } from '../types';
import styles from './Product.module.css';

const Product: React.FC<ProductType> = ({
  id,
  name,
  color,
  price,
  promoAvailable,
  image,
  quantity,
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {name}
          <span>{color}</span>
        </div>
        <div className={styles.quantity}>
          <button>-</button>
          <span>{quantity}</span>
          <button>+</button>
        </div>
        <div className={styles.price}>$ {quantity * price}</div>
      </div>
      <button className={styles['remove-button']}>X</button>
    </div>
  );
};

export default Product;
