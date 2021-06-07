import styles from '../styles/Loading.module.css';
import BeatLoader from 'react-spinners/BeatLoader';

const Loading = ({ show, size, color }) => {
  return (
    <div className={`${styles.loading} ${show ? styles.show : styles.hide}`}>
      <BeatLoader size={size || 15} loading={true} color={color || '#000'} />
    </div>
  );
};

export default Loading;
