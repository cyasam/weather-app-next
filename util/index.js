import moment from 'moment-timezone';
import NProgress from 'nprogress';

import { getWeatherData } from '../util/requests';

export const getDatafromLatLon = async () => {
  try {
    const pos = await getLocation();

    if (pos) {
      const query = `${pos.coords.latitude},${pos.coords.longitude}`;

      return query;
    }
  } catch {
    return null;
  }
};

export const convertDateFormat = (date, timezone, hours = true) => {
  let format = 'D/M';
  if (hours) {
    format = `${format}, H:mm`;
  }

  if (!timezone) {
    return moment(date).format(format);
  }

  return moment(date).tz(timezone).format(format);
};

export const convertDayOfWeek = (date) => {
  return moment(date).format('dddd');
};

export const getLocalDate = (localtime, timezone) => {
  return moment(localtime).tz(timezone).format('YYYY-MM-DD');
};

export const getDayHours = (date) => {
  return moment(date).format('H:mm');
};

export const checkIsNight = (date, timezone) => {
  return (
    moment(date).tz(timezone).hours() > 19 ||
    moment(date).tz(timezone).hours() < 6
  );
};

export const getDayData = (date, allData) => {
  return allData.filter((day) => day.date === date)[0];
};

export const getLocation = () => {
  if (!navigator.geolocation) return null;

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const getLocationsList = () => {
  if (!navigator.geolocation) return null;

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const handleHomepageLocation = async (query, dispatch) => {
  try {
    dispatch({
      type: 'HOMEPAGE_LOADING',
      payload: {
        loading: true,
        error: null,
      },
    });

    NProgress.start();

    const data = await getWeatherData({ query });

    dispatch({
      type: 'HOMEPAGE_SUCCESS',
      payload: {
        loading: false,
        data,
      },
    });

    NProgress.done();

    return data;
  } catch (err) {
    dispatch({
      type: 'HOMEPAGE_ERROR',
      payload: {
        loading: false,
        error: err.message,
      },
    });

    NProgress.done();
  }
};
