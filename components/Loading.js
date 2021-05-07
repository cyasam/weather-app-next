import styles from '../styles/Loading.module.css';

const Loading = ({ show }) => {
  return (
    <div className={`${styles.loading} ${show ? styles.show : styles.hide}`}>
      loading...
    </div>
  );
};

export default Loading;
