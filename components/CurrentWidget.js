import { convertDateFormat } from '../util';
import styles from '../styles/CurrentWidget.module.css';
import InfoWidget from './InfoWidget';

const CurrentWidget = ({ weatherData }) => {
  const { location, current } = weatherData;
  const { name, region, country, local_time, tz_id } = location;
  const {
    condition: { icon, text },
    temp_c,
  } = current;

  const lastUpdated = convertDateFormat(local_time, tz_id);

  const countryText = `${region ? `${region},` : ''} ${country}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.city}>{name}</h1>
        <h2 className={styles.country}>{countryText}</h2>
        <p className={styles.time}>{lastUpdated}</p>
      </div>

      <div className={styles.details}>
        <InfoWidget icon={icon} text={text} />
        <div className={styles.degree}>
          {Math.round(temp_c)}
          <i>°</i>
        </div>
      </div>
    </div>
  );
};

export default CurrentWidget;
