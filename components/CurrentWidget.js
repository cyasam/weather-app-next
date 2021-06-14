import { motion } from 'framer-motion';

import { convertDateFormat } from '../util';
import styles from '../styles/CurrentWidget.module.css';
import InfoWidget from './InfoWidget';

const transition = {
  duration: 0.7,
  ease: [0.43, 0.13, 0.23, 0.96],
};

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
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, translateX: 20, transition }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition,
      }}
      exit={{ opacity: 0, translateX: 20, transition }}
    >
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
    </motion.div>
  );
};

export default CurrentWidget;
