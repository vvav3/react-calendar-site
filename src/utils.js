export const getFirstResponseError = errorObj => Object.values(errorObj.data.errors)[0];

export const persistState = (key, state) => {
  return sessionStorage.setItem(key, JSON.stringify(state));
};

export const getPersistedState = (key, fallBack) => {
  return JSON.parse(sessionStorage.getItem(key)) || fallBack;
};
