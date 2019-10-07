import React from "react";
import "./NavBar.scoped.scss";

const NavBar = ({ title, items }) => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <div className="container">
      <a className="navbar-brand" href="/">
        {title}
      </a>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav ml-auto">
          {items.map(({ key, text, ...rest }) => (
            <li key={key} className="nav-item" {...rest}>
              <span className="nav-link">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

export default React.memo(NavBar);
