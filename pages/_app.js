import '../styles/globals.css';

import { useState, useReducer } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import AppContext from '../context/AppContext';
import weatherDataReducer, { initialState } from '../reducer/weather-data';

import SearchBox from '../components/SearchBox';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(weatherDataReducer, initialState);
  const [hasLocation, setHasLocation] = useState(null);

  return (
    <AppContext.Provider
      value={{ state, dispatch, hasLocation, setHasLocation }}
    >
      <Component {...pageProps} />
      <SearchBox />
    </AppContext.Provider>
  );
}

export default MyApp;
