import Link from 'next/link';

import { convertDayOfWeek } from '../util';
import InfoWidget from './InfoWidget';
import styles from '../styles/GridItem.module.css';

const DayGridItem = ({ item, location }) => {
  const dayOfWeek = convertDayOfWeek(item.date);
  const { name } = location;

  const {
    maxtemp_c,
    mintemp_c,
    condition: { icon, text },
  } = item.day;

  return (
    <Link href={`/${name.toLowerCase()}/day?q=${item.date}`}>
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
