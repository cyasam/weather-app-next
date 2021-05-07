import { convertDayOfWeek } from '../util';
import InfoWidget from './InfoWidget';
import styles from '../styles/GridItem.module.css';

const GridItem = ({ item }) => {
  const dayOfWeek = convertDayOfWeek(item.date);

  const {
    maxtemp_c,
    mintemp_c,
    condition: { icon, text },
  } = item.day;

  return (
    <div className={styles.card}>
      <h3>{dayOfWeek}</h3>

      <InfoWidget icon={icon} text={text} />
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
    </div>
  );
};

export default GridItem;
