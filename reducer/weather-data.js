export const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function weatherDataReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, ...action.payload };
    case 'SUCCESS':
      return { ...state, ...action.payload };
    case 'ERROR':
      return { ...state, ...action.payload };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
