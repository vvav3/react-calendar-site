import React, { PureComponent } from "react";
import cn from "clsx";

import styles from "./NavBar.module.css";

export class NavBar extends PureComponent {
  render() {
    const { title, items } = this.props;
    return (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            {title}
          </a>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto">
              {items.map(({ key, text, ...rest }) => (
                <li key={key} className={cn("nav-item", styles["nav-button"])} {...rest}>
                  <span className="nav-link">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
