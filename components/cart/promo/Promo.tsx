import { SyntheticEvent, useState } from 'react';
import styles from './Promo.module.css';

interface Props {
  handlePromoCode: (string) => void;
}

const Promo: React.FC<Props> = ({ handlePromoCode }) => {
  const [value, setValue] = useState('');

  const handleButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    handlePromoCode(value);
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter Promo Code"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button
        type="button"
        className={styles.button}
        onClick={handleButtonClick}
        disabled={value.length === 0}
      >
        Apply
      </button>
    </div>
  );
};

export default Promo;
