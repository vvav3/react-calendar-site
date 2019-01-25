import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./bootstrap.min.css";
import "./App.css";
import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import { signOut } from "./misc";

const userData = localStorage.getItem("userData");
const AuthContext = React.createContext({ isAuthorized: userData !== undefined });

console.log(AuthContext);

class App extends Component {
  state = {
    isAuthorized: userData !== undefined
  };

  onSignOut = () => {
    const { history } = this.props;
    signOut();
    this.setState({ isAuthorized: false });
    history.push("/sign-in");
  };

  render() {
    const { isAuthorized } = this.state;

    const navItems = [{ key: 1, text: "Logout", onClick: this.onSignOut }];

    return (
      <div className="app">
        {isAuthorized && <NavBar title="Calendar App" items={navItems} />}
        <AppRouter isAuthorized={isAuthorized} />
      </div>
    );
  }
}

export default withRouter(App);
