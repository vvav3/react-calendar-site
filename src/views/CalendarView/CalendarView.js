import React, { Component } from "react";
import Calendar from "../../components/Calendar/Calendar";

class CalendarView extends Component {
  render() {
    return (
      <main className="container p-3">
        <Calendar />
      </main>
    );
  }
}

export default CalendarView;
