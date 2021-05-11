import '../styles/globals.css';

import { useReducer } from 'react';
import AppContext from '../context/AppContext';
import weatherDataReducer, { initialState } from '../reducer/weather-data';

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(weatherDataReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
