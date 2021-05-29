export const homepageInitialState = {
  loading: false,
  data: null,
  error: null,
};

export default function homepageWeatherDataReducer(state, action) {
  switch (action.type) {
    case 'HOMEPAGE_LOADING':
      return { ...state, ...action.payload };
    case 'HOMEPAGE_SUCCESS':
      return { ...state, ...action.payload };
    case 'HOMEPAGE_ERROR':
      return { ...state, ...action.payload };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
