import { useEffect, useContext } from 'react';
import requestIp from 'request-ip';

import Head from 'next/head';

import { checkIsNight, handleLocation } from '../util';
import { getWeatherData } from '../util/requests';
import AppContext from '../context/AppContext';

import CurrentWidget from '../components/CurrentWidget';
import Loading from '../components/Loading';
import Grid from '../components/Grid';
import DayGridItem from '../components/DayGridItem';

import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  const { state, dispatch, hasLocation } = useContext(AppContext);

  const weatherData = state.data || data;

  const {
    location,
    forecast: { forecastday },
  } = weatherData;
  const { local_time, tz_id } = location;
  const night = checkIsNight(local_time, tz_id);

  useEffect(async () => {
    if (hasLocation) {
      await handleLocation(hasLocation, dispatch);
    }
  }, [hasLocation]);

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
        {state && <Loading show={state.loading} />}
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
