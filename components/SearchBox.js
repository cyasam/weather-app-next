import { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';

import { getDatafromLatLon, handleLocation } from '../util';

import SearchInput from './SearchInput';
import LocationButton from './LocationButton';

import styles from '../styles/SearchBox.module.css';

const SearchBox = () => {
  const { hasLocation, setHasLocation, dispatch } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const changeSearchText = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const clickLocation = async () => {
    const pos = await getDatafromLatLon();

    if (!pos) return;

    router.push(`/`);

    await handleLocation(pos, dispatch);
  };

  useEffect(() => {
    if (query.length > 2) {
      searchLocations(query);
    }
  }, [query]);

  useEffect(() => {
    const storedHasLocation = localStorage.getItem('hasLocation');
    if (storedHasLocation) {
      setHasLocation(storedHasLocation);
    }
  }, []);

  return (
    <div className={styles.box}>
      <SearchInput className={styles.input} handleChange={changeSearchText} />
      <LocationButton hasLocation={hasLocation} onClick={clickLocation} />
    </div>
  );
};

export default SearchBox;
