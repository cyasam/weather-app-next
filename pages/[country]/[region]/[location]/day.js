import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { checkIsNight, getDayData, convertDayOfWeek } from '../../../../util';
import { getWeatherData } from '../../../../util/requests';

import BackButton from '../../../../components/BackButton';

import styles from '../../../../styles/Day.module.css';
import React from 'react';

// Load Components
const DayWidget = dynamic(() => import('../../../../components/DayWidget'));
const Grid = dynamic(() => import('../../../../components/Grid'));
const HourGridItem = dynamic(() =>
  import('../../../../components/HourGridItem')
);

export default function Day({ data }) {
  const router = useRouter();
  const { q } = router.query;
  const [date] = useState(q);

  const weatherData = data;

  const {
    forecast: { forecastday },
    location,
  } = weatherData;
  const { local_time, tz_id } = weatherData.location;

  const night = useCallback(
    () => checkIsNight(local_time, tz_id),
    [local_time, tz_id]
  );

  const dayOfWeek = convertDayOfWeek(date);

  const hoursData = getDayData(date, forecastday).hour;

  return (
    <div className={`container ${night() ? 'night' : ''}`}>
      <Head>
        <title>
          {location.name} / {location.region} : {dayOfWeek} - Weather App
        </title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className={styles.widgetblock}>
          <BackButton />
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
  const { region, location, country } = context.query;
  let query = `${location}, ${region}, ${country}`;
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
