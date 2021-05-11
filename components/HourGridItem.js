import { getDayHours } from '../util';

import InfoWidget from './InfoWidget';

import styles from '../styles/GridItem.module.css';

const HourGridItem = ({ item }) => {
  const {
    temp_c,
    time,
    condition: { icon, text },
  } = item;

  return (
    <div className={styles.card}>
      <h3>{getDayHours(time)}</h3>

      <InfoWidget size={46} icon={icon} text={text} />
      <div className={styles.degrees}>
        <p className="degree">
          {Math.round(temp_c)}
          <i>°</i>
        </p>
      </div>
    </div>
  );
};

export default HourGridItem;
