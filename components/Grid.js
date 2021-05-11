import styles from '../styles/Grid.module.css';

const Grid = ({ data, children }) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {data.map((day) => {
          return children(day);
        })}
      </div>
    </div>
  );
};

export default Grid;
