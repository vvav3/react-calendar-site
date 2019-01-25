import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./bootstrap.min.css";
import "./App.css";
import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";

const userData = localStorage.getItem("userData");

class App extends Component {
  state = {
    isAuthorized: userData !== null
  };

  onLogin = data => {
    localStorage.setItem("userData", data);
    this.setState({ isAuthorized: true });
    this.props.history.push("/");
  };

  onLogout = () => {
    localStorage.removeItem("userData");
    this.setState({ isAuthorized: false });
    this.props.history.push("/sign-in");
  };

  render() {
    const { isAuthorized } = this.state;

    const navItems = [{ key: 1, text: "Logout", onClick: this.onLogout }];

    return (
      <div className="app">
        <AuthContext.Provider value={{ ...this.state, login: this.onLogin, logout: this.onLogout }}>
          {isAuthorized && <NavBar title="Calendar App" items={navItems} />}
          <AppRouter />
        </AuthContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);