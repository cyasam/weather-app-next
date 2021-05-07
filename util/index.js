import moment from 'moment-timezone';

export const convertDateFormat = (date, timezone) => {
  return moment(date).tz(timezone).format('D/M HH:mm');
};

export const convertDayOfWeek = (date) => {
  return moment(date).format('dddd');
};

export const checkIsNight = (date, timezone) => {
  return (
    moment(date).tz(timezone).hours() > 19 ||
    moment(date).tz(timezone).hours() < 6
  );
};

export const getLocation = () => {
  if (!navigator.geolocation) return null;

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};
