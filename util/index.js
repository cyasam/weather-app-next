import moment from 'moment-timezone';

import { getWeatherData } from '../util/requests';

export const convertDateFormat = (date, timezone, hours = true) => {
  let format = 'D/M';
  if (hours) {
    format = `${format}, H:mm`;
  }

  return moment(date).tz(timezone).format(format);
};

export const convertDayOfWeek = (date) => {
  return moment(date).format('dddd');
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

export const handleLocation = async (query, dispatch) => {
  try {
    dispatch({
      type: 'LOADING',
      payload: {
        loading: true,
        error: null,
      },
    });

    const data = await getWeatherData({ query });

    dispatch({
      type: 'SUCCESS',
      payload: {
        loading: false,
        data,
      },
    });
  } catch (err) {
    dispatch({
      type: 'ERROR',
      payload: {
        loading: false,
        error: err.message,
      },
    });
  }
};
