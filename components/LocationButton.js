import { BiCurrentLocation } from 'react-icons/bi';

import styles from '../styles/LocationButton.module.css';

const LocationButton = ({ onClick }) => {
  return (
    <button onClick={() => onClick()} className={styles.button}>
      <BiCurrentLocation color="#2b2b2b" size="2.5em" />
    </button>
  );
};

export default LocationButton;
