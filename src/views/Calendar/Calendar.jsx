import React, { useMemo } from "react";
import moment from "moment";
import clsx from "clsx";

import "./Calendar.scoped.scss";
import useLocalStorage from "hooks/useLocalStorage";
import CalendarDay from "./CalendarDay";

const today = moment().format("MMMM YYYY");
const weekDays = moment.weekdaysShort();
const totalRows = 5;
const totalCellsInRow = 7;

function createCells() {
  const totalCells = totalRows * totalCellsInRow;
  const shift = moment()
    .startOf("month")
    .weekday();

  const cells = Array.from(Array(totalCells)).map((item, idx) => ({
    id: idx,
    data: null,
    disabled: idx - shift < 1 || idx > totalCells - shift,
    date: moment()
      .date(idx - shift)
      .format("DD")
  }));

  return cells;
}

const Calendar = () => {
  const [cells, setCells] = useLocalStorage("calendarCells", createCells());
  const [activeCell, setActiveCell] = useLocalStorage("calendarActiveCell", null);
  const cellRows = useMemo(() => {
    return Array.from(Array(totalRows)).map((item, rowIdx) =>
      Array.from(Array(totalCellsInRow)).map(
        (item, cellIdx) => cells[rowIdx * totalCellsInRow + cellIdx]
      )
    );
  }, [cells]);

  function selectCell(cell) {
    setActiveCell(activeCell => (activeCell === cell ? null : cell));
  }

  function clearActiveCell() {
    setActiveCell(null);
  }

  function submitEvent(val) {
    setCells(cells => cells.map(item => (item.id === val.id ? { ...item, data: val.data } : item)));
    setActiveCell(null);
  }

  function deleteEvent(id) {
    setCells(cells => cells.map(item => (item.id === id ? { ...item, data: null } : item)));
  }

  return (
    <div className="calendar">
      <div className="calendar-head">
        <div className="current-date">{today}</div>
        <div className="week-days-row">
          {weekDays.map((item, idx) => (
            <div className="week-day" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={clsx("calendar-body", { activeCell })}>
        {cellRows.map((row, idx) => (
          <div className="dates-row" key={idx}>
            {row.map(day => (
              <CalendarDay
                key={day.id}
                id={day.id}
                active={day.id === activeCell}
                data={day.data}
                date={day.date}
                disabled={day.disabled}
                onSelect={selectCell}
                onDismiss={clearActiveCell}
                onEventDelete={deleteEvent}
                onEventSubmit={submitEvent}
              />
            ))}
          </div>
        ))}
      </div>
      {activeCell && <div onClick={clearActiveCell} className="shadow" />}
    </div>
  );
};

export default Calendar;
