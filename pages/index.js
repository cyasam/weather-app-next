import { useEffect, useContext } from 'react';
import requestIp from 'request-ip';

import Head from 'next/head';
import dynamic from 'next/dynamic';

import {
  checkIsNight,
  handleHomepageLocation,
  getDatafromLatLon,
} from '../util';
import { getWeatherData } from '../util/requests';
import AppContext from '../context/AppContext';

import styles from '../styles/Home.module.css';

// Load Components
const CurrentWidget = dynamic(() => import('../components/CurrentWidget'));
const Grid = dynamic(() => import('../components/Grid'));
const DayGridItem = dynamic(() => import('../components/DayGridItem'));

export default function Home({ data }) {
  const { homepageState, homepageDispatch } = useContext(AppContext);

  const weatherData = homepageState.data || data;

  const {
    location,
    forecast: { forecastday },
  } = weatherData;
  const { local_time, tz_id } = location;
  const night = checkIsNight(local_time, tz_id);

  useEffect(async () => {
    const pos = await getDatafromLatLon();

    if (!pos) return;

    await handleHomepageLocation(pos, homepageDispatch);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {location.name} / {location.region} - Weather App
        </title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${night ? 'night' : ''}`}>
        <CurrentWidget weatherData={weatherData} />

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
  let query = process.env.DEFAULT_CITY;
  if (process.env.NODE_ENV === 'production') {
    const clientIp = requestIp.getClientIp(context.req);
    query = clientIp;
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
