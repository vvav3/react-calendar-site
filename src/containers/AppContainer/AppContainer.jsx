import React, { useContext } from "react";

import AuthContext from "contexts/AuthContext";
import NavBar from "components/NavBar";

const AppContainer = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navItems = [{ key: 1, text: "Logout", onClick: logout }];

  return (
    <>
      <NavBar title="Calendar App" items={navItems} />
      <main className="app-container container pt-3 pb-3">{children}</main>
    </>
  );
};

export default React.memo(AppContainer);
