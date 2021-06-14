import { motion } from 'framer-motion';

import { convertDateFormat, convertDayOfWeek, getDayData } from '../util';
import styles from '../styles/DayWidget.module.css';
import InfoWidget from './InfoWidget';

const transition = {
  duration: 0.7,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const DayWidget = ({ weatherData, date }) => {
  const {
    location,
    forecast: { forecastday },
  } = weatherData;
  const { name, region, country } = location;

  const dayData = getDayData(date, forecastday);
  const dateFormatted = convertDateFormat(date, null, false);
  const dayOfWeek = convertDayOfWeek(date);

  const {
    mintemp_c,
    maxtemp_c,
    condition: { icon, text },
  } = dayData.day;

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
        <p className={styles.time}>
          {dateFormatted}, {dayOfWeek}
        </p>
      </div>

      <div className={styles.details}>
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
    </motion.div>
  );
};

export default DayWidget;
