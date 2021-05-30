import '../styles/globals.css';

import { useState, useReducer } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import AppContext from '../context/AppContext';
import homepageWeatherDataReducer, {
  homepageInitialState,
} from '../reducer/homepage-weather-data';

import SearchBox from '../components/SearchBox';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [homepageState, homepageDispatch] = useReducer(
    homepageWeatherDataReducer,
    homepageInitialState
  );

  const [searchResult, setSearchResult] = useState(null);

  return (
    <AppContext.Provider
      value={{
        homepageState,
        homepageDispatch,
        searchResult,
        setSearchResult,
      }}
    >
      <SearchBox />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
