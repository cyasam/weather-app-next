import axios from 'axios';

export const getWeatherData = async ({ query }) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    const { data } = await axios.get(`${API_URL}/api/daily?q=${query}`);

    return data;
  } catch {
    return null;
  }
};
