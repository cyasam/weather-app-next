import { useState, useEffect, useContext, useRef } from 'react';

import AppContext from '../context/AppContext';

import { searchLocations } from '../util/requests';

import SearchInput from './SearchInput';
import SearchAreaList from './SearchAreaList';
import LocationFinder from './LocationFinder';

import styles from '../styles/SearchArea.module.css';

const SearchArea = () => {
  const searchInputRef = useRef(null);
  const { searchResult, setSearchResult } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const changeSearchText = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const blurSearchText = () => {
    setTimeout(() => setShowList(false), 100);
  };

  const focusSearchText = () => {
    setShowList(true);
  };

  const listItemClick = () => {
    setQuery('');
    searchInputRef.current.blur();
  };

  useEffect(async () => {
    if (query.length <= 2) {
      setSearchResult(null);
      setShowList(false);
    } else if (query.length > 2) {
      const result = await searchLocations({ query });

      setSearchResult(result);
      setShowList(true);
    }
  }, [query]);

  return (
    <>
      <div className={styles.area}>
        <SearchInput
          ref={searchInputRef}
          value={query}
          className={styles.input}
          handleChange={changeSearchText}
          handleBlur={blurSearchText}
          handleFocus={focusSearchText}
        />
        {showList && (
          <SearchAreaList
            searchResult={searchResult}
            listItemClick={listItemClick}
          />
        )}
      </div>

      <LocationFinder buttonClick={listItemClick} />
    </>
  );
};

export default SearchArea;
