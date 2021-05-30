import { useContext } from 'react';

import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';

import { getDatafromLatLon, handleHomepageLocation } from '../util';

import LocationButton from './LocationButton';

import styles from '../styles/LocationButton.module.css';

const LocationFinder = ({ buttonClick }) => {
  const { homepageDispatch } = useContext(AppContext);
  const router = useRouter();

  const findLocation = async () => {
    const pos = await getDatafromLatLon();

    if (!pos) return;

    await router.push(`/`);

    handleHomepageLocation(pos, homepageDispatch);

    buttonClick();
  };

  return (
    <div className={styles.location}>
      <LocationButton onClick={findLocation} />
    </div>
  );
};

export default LocationFinder;
