import React, { useContext } from "react";

import AuthContext from "contexts/AuthContext";
import Calendar from "components/Calendar";
import NavBar from "components/NavBar";

const CalendarView = () => {
  const { logout } = useContext(AuthContext);
  const navItems = [{ key: 1, text: "Logout", onClick: logout }];

  return (
    <>
      <NavBar title="Calendar App" items={navItems} />
      <main className="calendar-view container p-3">
        <Calendar />
      </main>
    </>
  );
};

export default CalendarView;
