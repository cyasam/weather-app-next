import { useState, useEffect } from 'react';

import Head from 'next/head';

import { getWeatherData } from '../util/requests';
import CurrentWidget from '../components/CurrentWidget';
import Grid from '../components/Grid';
import { checkIsNight, getLocation } from '../util';
import SearchBox from '../components/SearchBox';
import Loading from '../components/Loading';

import styles from '../styles/Home.module.css';

export default function Home({ weatherAllData }) {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(weatherAllData);
  const [hasLocation, setHasLocation] = useState(null);

  const handleLocation = async () => {
    try {
      const pos = await getLocation();

      if (pos) {
        setHasLocation(true);
        localStorage.setItem('hasLocation', true);
        setLoading(true);

        const query = `${pos.coords.latitude},${pos.coords.longitude}`;

        const data = await getWeatherData({ query });

        setWeatherData(data);
        setLoading(false);
      }
    } catch {
      setHasLocation(false);
      localStorage.setItem('hasLocation', false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('hasLocation')) {
      const storedHasLocation = !!localStorage.getItem('hasLocation');
      setHasLocation(storedHasLocation);

      if (storedHasLocation) {
        handleLocation();
      }
    }
  }, []);

  const { local_time, tz_id } = weatherData.location;
  const night = checkIsNight(local_time, tz_id);

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${night ? styles.night : ''}`}>
        <CurrentWidget weatherData={weatherData} />
        <Grid weatherData={weatherData} />
        <SearchBox hasLocation={hasLocation} handleLocation={handleLocation} />
        <Loading show={loading} />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  let query = 'london';

  return {
    props: {
      weatherAllData: await getWeatherData({ query }),
    },
  };
};
