import { useContext } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import AppContext from '../context/AppContext';
import styles from '../styles/LocationButton.module.css';

const LocationButton = ({ hasLocation, handleLocation }) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className={styles.location}>
      {hasLocation === false && (
        <p className={styles.error}>
          Please enable location service for your browser.
        </p>
      )}
      <button onClick={() => handleLocation()} className={styles.button}>
        <BiCurrentLocation color="#fff" size="2.5em" />
      </button>
    </div>
  );
};

export default LocationButton;
