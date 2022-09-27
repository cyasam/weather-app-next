import { useState, useEffect, useContext, useRef } from 'react';
import { useClickAway } from 'react-use';

import AppContext from '../context/AppContext';

import { searchLocations } from '../util/requests';
import { useDebounce } from '../util/custom-hooks';

import SearchInput from './SearchInput';
import SearchAreaListContainer from './SearchAreaListContainer';
import LocationFinder from './LocationFinder';

import styles from '../styles/SearchArea.module.css';

const SearchArea = () => {
  const ref = useRef(null);
  const { searchResult, setSearchResult } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const changeSearchText = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const blurSearchText = () => {
    setShowList(false)
  };

  const focusSearchText = () => {
    setShowList(!!(debouncedQuery.length > 2));
  };

  const listItemClick = () => {
    setQuery('');
    blurSearchText()
  };

  useClickAway(ref, () => {
    blurSearchText()
  });

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
      <div className={styles.area} ref={ref}>
        <div className={styles.inputwrapper}>
          <SearchInput
            value={query}
            className={styles.input}
            handleChange={changeSearchText}
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
