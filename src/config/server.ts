const devMode = Number(import.meta.env.VITE_REACT_APP_DEVELOPMENT_MODE) === 1 
  ? true : false;

export const serverUri = devMode
  ? import.meta.env.VITE_REACT_APP_SERVER_URI_DEV
  : import.meta.env.VITE_REACT_APP_SERVER_URI_PROD;

export const basename = devMode
  ? ''
  : import.meta.env.VITE_REACT_APP_BASENAME;

