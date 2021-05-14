import { useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';

import { getDatafromLatLon, handleLocation } from '../util';

import LocationButton from './LocationButton';

import styles from '../styles/LocationButton.module.css';

const LocationFinder = ({ buttonClick }) => {
  const { hasLocation, setHasLocation, dispatch } = useContext(AppContext);
  const router = useRouter();

  const findLocation = async () => {
    const pos = await getDatafromLatLon();

    if (!pos) return;

    await router.push(`/`);

    handleLocation(pos, dispatch);

    buttonClick();
  };

  useEffect(() => {
    const storedHasLocation = localStorage.getItem('hasLocation');
    if (storedHasLocation) {
      setHasLocation(storedHasLocation);
    }
  }, []);

  return (
    <div className={styles.location}>
      {hasLocation && !!hasLocation === false && (
        <p className={styles.error}>
          Please enable location service for your browser.
        </p>
      )}
      <LocationButton onClick={findLocation} />
    </div>
  );
};

export default LocationFinder;
