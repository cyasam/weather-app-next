import Link from 'next/link';
import slugify from 'slugify';

import styles from '../styles/SearchAreaList.module.css';

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
  const { name, region, country } = item;

  const url = `/general/${slugify(country, { lower: true, trim: true })}${region && '/' + slugify(region, {
    lower: true,
  })}/${slugify(name, { lower: true })}`;

  return (
    <li>
      <Link href={url}>
        <a onClick={listItemClick}>
          <span className={styles.name}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default SearchAreaList;
