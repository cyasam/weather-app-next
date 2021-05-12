import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

import AppContext from '../../context/AppContext';
import {
  checkIsNight,
  getDayData,
  getLocalDate,
  convertDayOfWeek,
  handleLocation,
} from '../../util';
import { getWeatherData } from '../../util/requests';

import Grid from '../../components/Grid';
import DayWidget from '../../components/DayWidget';
import HourGridItem from '../../components/HourGridItem';

import styles from '../../styles/Day.module.css';

export default function Day({ data }) {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  let { location: query, q: date } = router.query;

  useEffect(() => {
    handleLocation(query, dispatch);
  }, [query]);

  const weatherData = state.data || data;

  const {
    forecast: { forecastday },
    location,
  } = weatherData;
  const { local_time, tz_id } = weatherData.location;

  if (!date) {
    date = getLocalDate(local_time, tz_id);
  }

  const night = checkIsNight(local_time, tz_id);
  const dayOfWeek = convertDayOfWeek(date);

  const hoursData = getDayData(date, forecastday).hour;

  return (
    <div className="container">
      <Head>
        <title>
          {location.name} / {location.region} : {dayOfWeek} - Weather App
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
          <DayWidget weatherData={weatherData} date={date} />
        </div>

        <Grid data={hoursData}>
          {(item) => <HourGridItem key={item.time_epoch} item={item} />}
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
