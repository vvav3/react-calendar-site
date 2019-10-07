import React, { useState } from "react";
import { useHistory } from "react-router";
import { persistState } from "misc";
import users from "users.json";

const AuthContext = React.createContext();

const userData = localStorage.getItem("userData");

function checkCredentials(credentials) {
  const user = users.find(item => item.email === credentials.email);
  if (!user) throw Error("User doesn't exist");
  if (user.password !== credentials.password) throw Error("Incorrect password");
}

export const ContextWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(userData !== null);
  const history = useHistory();

  function login(data) {
    const user = users.find(item => item.email === data.email);
    if (!user) throw Error("User doesn't exist");
    if (user.password !== data.password) throw Error("Incorrect password");

    persistState("userData", data);
    setIsAuthorized(true);
    history.push("/");
  }

  function logout() {
    localStorage.removeItem("userData");
    setIsAuthorized(false);
    history.push("/sign-in");
  }

  const contextValues = { isAuthorized, login, logout };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthContext;
