export const users = [{ id: 1, email: "test@email.com", password: "test" }];

export const persistState = (key, state) => {
  return sessionStorage.setItem(key, JSON.stringify(state));
};

export const getInitialState = (key, fallBack = {}) => {
  return JSON.parse(sessionStorage.getItem(key)) || fallBack;
};
