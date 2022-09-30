import { useCallback } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { checkIsNight } from '../../util';
import { getWeatherData } from '../../util/requests';

import BackButton from '../../components/BackButton';

import styles from '../../styles/Day.module.css';

// Load Components
const CurrentWidget = dynamic(() =>
  import('../../components/CurrentWidget')
);
const Grid = dynamic(() => import('../../components/Grid'));
const DayGridItem = dynamic(() => import('../../components/DayGridItem'));

export default function Location({ data }) {
  const weatherData = data;

  const {
    location,
    forecast: { forecastday },
  } = weatherData;
  const { local_time, tz_id } = location;

  const night = useCallback(
    () => checkIsNight(local_time, tz_id),
    [local_time, tz_id]
  );

  return (
    <div className={`container ${night() ? 'night' : ''}`}>
      <Head>
        <title>
          {location.name} / {location.region} - Weather App
        </title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className={styles.widgetblock}>
          <BackButton />
          <CurrentWidget weatherData={weatherData} />
        </div>

        <Grid data={forecastday}>
          {(item) => (
            <DayGridItem
              key={item.date_epoch}
              item={item}
              location={location}
            />
          )}
        </Grid>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  console.log(slug)

  const country = slug[0]
  const location = slug[1]
  let query = `${location}, ${country}`;

  if (slug.length === 3) {
    const region = slug[1]
    const location = slug[2]
    query = `${location}, ${region}, ${country}`;
  }

  const data = await getWeatherData({ query });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
