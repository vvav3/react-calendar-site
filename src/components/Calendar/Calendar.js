import React, { Component } from "react";
import moment from "moment";
import cn from "classnames";

import styles from "./Calendar.module.css";
import CalendarDay from "./CalendarDay";
import { getInitialState, persistState } from "../../misc";

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
          data: null,
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
  state = getInitialState("calendar_state", {
    cells: createCells(),
    active: undefined
  });

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cells !== this.state.cells) {
      persistState("calendar_state", this.state);
    }
  }

  handleDaySelect = day => {
    this.setState(prevState => ({ active: prevState.active === day ? undefined : day }));
  };

  clearActive = () => {
    this.setState({ active: undefined });
  };

  handleEventSubmit = val => {
    let newCells = [...this.state.cells];

    for (let i = 0; i < newCells.length; i++) {
      for (let j = 0; j < newCells[i].length; j++) {
        if (newCells[i][j].key === val.id) {
          newCells[i][j].data = val.data;
          break;
        }
      }
    }

    this.setState({ cells: newCells, active: undefined });
  };

  handleEventDelete = id => {
    let newCells = [...this.state.cells];

    for (let i = 0; i < newCells.length; i++) {
      for (let j = 0; j < newCells[i].length; j++) {
        if (newCells[i][j].key === id) {
          newCells[i][j].data = null;
          break;
        }
      }
    }

    this.setState({ cells: newCells });
  };

  render() {
    const { cells, active } = this.state;

    return (
      <div className={styles.calendar}>
        <div className={styles.head}>
          <div className={styles.current_date}>{today}</div>
          <div className={styles.week_days_row}>
            {weekDays.map((item, i) => (
              <div className={styles.week_day} key={i}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cn(styles.body, { [styles.active]: active })}>
          {cells.map((row, i) => (
            <div className={styles.dates_row} key={i}>
              {row.map(day => (
                <CalendarDay
                  key={day.key}
                  id={day.key}
                  active={day.key === active}
                  data={day.data}
                  date={day.date}
                  disabled={day.disabled}
                  onSelect={this.handleDaySelect}
                  onDismiss={this.clearActive}
                  onEventDelete={this.handleEventDelete}
                  onEventSubmit={this.handleEventSubmit}
                />
              ))}
            </div>
          ))}
        </div>
        {active && <div className={styles.shadow} onClick={this.clearActive} />}
      </div>
    );
  }
}

export default Calendar;
