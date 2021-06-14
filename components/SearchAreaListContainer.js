import { motion } from 'framer-motion';

import SearchAreaList from './SearchAreaList';
import Loading from '../components/Loading';

import styles from '../styles/SearchAreaListContainer.module.css';

const transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const SearchAreaListContainer = ({ searchResult, listItemClick }) => {
  return (
    <motion.div
      className={styles.result}
      initial={{
        opacity: 0,
        translateY: -20,
        transition,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition,
      }}
    >
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
    </motion.div>
  );
};

export default SearchAreaListContainer;
