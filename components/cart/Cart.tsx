import { ProductType } from './types';
import styles from './Cart.module.css';
import Product from './product/Product';

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
    </div>
  );
};

export default Cart;
