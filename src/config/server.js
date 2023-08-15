export const serverUri = (Number(import.meta.env.VITE_REACT_APP_DEVELOPMENT_MODE) === 1)
  ? import.meta.env.VITE_REACT_APP_SERVER_URI_DEV
  : import.meta.env.VITE_REACT_APP_SERVER_URI_PROD;

