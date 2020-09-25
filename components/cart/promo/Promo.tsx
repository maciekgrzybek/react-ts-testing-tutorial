import styles from './Promo.module.css';

const Promo: React.FC = () => {
  return (
    <form className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter Promo Code"
      />
      <button type="submit" className={styles.button}>
        Apply
      </button>
    </form>
  );
};

export default Promo;
