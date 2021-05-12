import { useEffect, useContext } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

import { checkIsNight, handleLocation } from '../../util';
import { getWeatherData } from '../../util/requests';
import AppContext from '../../context/AppContext';

import CurrentWidget from '../../components/CurrentWidget';
import Grid from '../../components/Grid';
import DayGridItem from '../../components/DayGridItem';

import styles from '../../styles/Day.module.css';

export default function Location({ data }) {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  let { location: query } = router.query;

  useEffect(() => {
    handleLocation(query, dispatch);
  }, [query]);

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
        <div className={styles.widgetblock}>
          <Link href="/">
            <a className={styles.backlink}>
              <BiArrowBack color="#fff" size="2.5em" />
            </a>
          </Link>
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
  let query = context.query.location;
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
