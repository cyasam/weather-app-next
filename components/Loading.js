import styles from '../styles/Loading.module.css';
import MoonLoader from 'react-spinners/ClipLoader';

const Loading = ({ show }) => {
  return (
    <div className={`${styles.loading} ${show ? styles.show : styles.hide}`}>
      <MoonLoader size={40} loading={true} color="#fff" />
    </div>
  );
};

export default Loading;
