import SearchAreaList from './SearchAreaList';
import Loading from '../components/Loading';

import styles from '../styles/SearchAreaListContainer.module.css';

const SearchAreaListContainer = ({ searchResult, listItemClick }) => {
  return (
    <div className={styles.result}>
      {searchResult.loading ? (
        <div className={styles.loadingwrapper}>
          <Loading size={10} color="#4d7be0" show={searchResult.loading} />
        </div>
      ) : (
        <>
          {searchResult.data && (
            <SearchAreaList
              searchResult={searchResult.data}
              listItemClick={listItemClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchAreaListContainer;
