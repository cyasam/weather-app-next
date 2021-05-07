import GridItem from './GridItem';

import styles from '../styles/Grid.module.css';

const Grid = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { forecast } = weatherData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {forecast.forecastday.map((day) => {
          return <GridItem key={day.date_epoch} item={day} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
