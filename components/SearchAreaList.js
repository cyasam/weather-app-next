import styles from '../styles/SearchAreaList.module.css';
import Link from 'next/link';

const SearchAreaList = ({ searchResult, listItemClick }) => {
  return (
    <>
      {searchResult.length > 1 ? (
        <ul className={styles.list}>
          {searchResult.map((item) => {
            return (
              <SearchAreaList.Item
                key={item.id}
                item={item}
                listItemClick={listItemClick}
              />
            );
          })}
        </ul>
      ) : (
        <SearchAreaList.NoItem />
      )}
    </>
  );
};

SearchAreaList.NoItem = () => {
  return <p className={styles.notfound}>No place found.</p>;
};

SearchAreaList.Item = ({ item, listItemClick }) => {
  const { name, url } = item;

  return (
    <li>
      <Link href={`/${url}`}>
        <a onClick={listItemClick}>
          <p className={styles.name}>{name}</p>
        </a>
      </Link>
    </li>
  );
};

export default SearchAreaList;
