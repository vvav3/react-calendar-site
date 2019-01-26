import React, { Component } from "react";
import moment from "moment";

import "./Calendar.css";
import CalendarDay from "./CalendarDay";

const today = moment().format("MMMM YYYY");
const weekDays = moment.weekdaysShort();

const createCells = () => {
  const rows = 5;
  const days = 7;
  const totalCells = rows * days;
  const shift = moment()
    .startOf("month")
    .weekday();

  let arrDays = [];

  let cell;
  do {
    cell = 0;
    for (let i = 0; i < rows; i++) {
      arrDays[i] = [];
      for (let j = 0; j < days; j++) {
        arrDays[i][j] = {
          key: cell,
          disabled: cell - shift < 1 || cell > totalCells - shift,
          date: moment()
            .date(cell - shift)
            .format("DD")
        };
        cell++;
      }
    }
  } while (cell < totalCells);

  return arrDays;
};

class Calendar extends Component {
  state = {
    cells: createCells(),
    active: undefined
  };

  handleDayClick = day => {
    this.setState(prevState => ({ active: prevState.active === day ? undefined : day }));
  };

  handleBlur = () => {
    // this.setState({ active: undefined });
  };

  render() {
    const { cells, active } = this.state;

    return (
      <div className="calendar" tabIndex={0} onBlur={this.handleBlur}>
        <div className="head">
          <div className="current-date">{today}</div>
          <div className="week-days-row">
            {weekDays.map((item, i) => (
              <div className="week-day" key={i}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="body">
          {cells.map((row, i) => (
            <div className="dates-row" key={i}>
              {row.map(day => (
                <CalendarDay
                  key={day.key}
                  id={day.key}
                  active={day.key === active}
                  date={day.date}
                  disabled={day.disabled}
                  onClick={this.handleDayClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
