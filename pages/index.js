import { useState, useEffect, useContext } from 'react';
import requestIp from 'request-ip';

import Head from 'next/head';

import { checkIsNight, getLocation, handleLocation } from '../util';
import { getWeatherData } from '../util/requests';
import AppContext from '../context/AppContext';

import CurrentWidget from '../components/CurrentWidget';
import SearchBox from '../components/SearchBox';
import Loading from '../components/Loading';
import Grid from '../components/Grid';
import DayGridItem from '../components/DayGridItem';

import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  const { state, dispatch } = useContext(AppContext);
  const [hasLocation, setHasLocation] = useState(null);

  const getData = async () => {
    try {
      const pos = await getLocation();

      if (pos) {
        setHasLocation(true);
        localStorage.setItem('hasLocation', true);

        const query = `${pos.coords.latitude},${pos.coords.longitude}`;

        handleLocation(query, dispatch);
      }
    } catch (err) {
      setHasLocation(false);
      localStorage.setItem('hasLocation', false);
    }
  };

  useEffect(() => {
    if (!state.data) {
      if (localStorage.getItem('hasLocation')) {
        const storedHasLocation = !!localStorage.getItem('hasLocation');
        setHasLocation(storedHasLocation);

        if (storedHasLocation) {
          getData();
        }
      }
    }
  }, []);

  const weatherData = state.data || data;

  const {
    location,
    forecast: { forecastday },
  } = weatherData;
  const { local_time, tz_id } = location;
  const night = checkIsNight(local_time, tz_id);

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
        <SearchBox hasLocation={hasLocation} handleLocation={getData} />
        {state && <Loading show={state.loading} />}
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let query = 'london';
  if (process.env.NODE_ENV === 'production') {
    const clientIp = requestIp.getClientIp(context.req);
    query = clientIp;
  }

  return {
    props: {
      data: await getWeatherData({ query }),
    },
  };
};
