import { useState, useEffect, useContext, useRef } from 'react';

import AppContext from '../context/AppContext';

import { searchLocations } from '../util/requests';
import { useDebounce } from '../util/custom-hooks';

import SearchInput from './SearchInput';
import SearchAreaListContainer from './SearchAreaListContainer';
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
    blurSearchText();
  };

  const debouncedQuery = useDebounce(query, 500);

  useEffect(async () => {
    if (debouncedQuery.length <= 2) {
      setShowList(false);

      setSearchResult((prevState) => {
        return {
          ...prevState,
          loading: false,
          data: null,
          error: null,
        };
      });
    } else if (debouncedQuery.length > 2) {
      setShowList(true);

      setSearchResult((prevState) => {
        return {
          ...prevState,
          loading: true,
          error: null,
        };
      });

      const result = await searchLocations({ query: debouncedQuery });

      setSearchResult((prevState) => {
        return {
          ...prevState,
          loading: false,
          data: result,
          error: null,
        };
      });
    }
  }, [debouncedQuery]);

  return (
    <>
      <div className={styles.area}>
        <div className={styles.inputwrapper}>
          <SearchInput
            ref={searchInputRef}
            value={query}
            className={styles.input}
            handleChange={changeSearchText}
            handleBlur={blurSearchText}
            handleFocus={focusSearchText}
          />
        </div>

        {showList && (
          <SearchAreaListContainer
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
