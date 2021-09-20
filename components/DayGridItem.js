import Link from 'next/link';
import slugify from 'slugify';

import { convertDayOfWeek } from '../util';
import InfoWidget from './InfoWidget';
import styles from '../styles/GridItem.module.css';

const DayGridItem = ({ item, location }) => {
  const dayOfWeek = convertDayOfWeek(item.date);
  const { name, region, country } = location;

  const {
    maxtemp_c,
    mintemp_c,
    condition: { icon, text },
  } = item.day;

  const url = `/${slugify(country, { lower: true })}/${slugify(region, {
    lower: true,
  })}/${slugify(name, { lower: true })}/day?q=${item.date}`;
  return (
    <Link href={url}>
      <a className={styles.card}>
        <h3>{dayOfWeek}</h3>

        <InfoWidget size={46} icon={icon} text={text} />
        <div className={styles.degrees}>
          <p className="degree">
            {Math.round(maxtemp_c)}
            <i>°</i>
          </p>
          <span className={styles.seperator}>/</span>
          <p className="degree">
            {Math.round(mintemp_c)}
            <i>°</i>
          </p>
        </div>
      </a>
    </Link>
  );
};

export default DayGridItem;
