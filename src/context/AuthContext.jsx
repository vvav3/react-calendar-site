import React, { useState } from "react";
import { useHistory } from "react-router";

const AuthContext = React.createContext();

const userData = localStorage.getItem("userData");

export const ContextWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(userData !== null);
  const history = useHistory();

  function login(data) {
    localStorage.setItem("userData", data);
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
