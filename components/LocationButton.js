import { BiCurrentLocation } from 'react-icons/bi';

import styles from '../styles/LocationButton.module.css';

const LocationButton = ({ hasLocation, onClick }) => {
  return (
    <div className={styles.location}>
      {hasLocation && !!hasLocation === false && (
        <p className={styles.error}>
          Please enable location service for your browser.
        </p>
      )}
      <button onClick={() => onClick()} className={styles.button}>
        <BiCurrentLocation color="#2b2b2b" size="2.5em" />
      </button>
    </div>
  );
};

export default LocationButton;
