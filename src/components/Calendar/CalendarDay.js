import React from "react";
import cn from "classnames";

const CalendarDay = ({ date, disabled }) => {
  return (
    <div className={cn("date-cell", { disabled })}>
      <div className="date">{date}</div>
    </div>
  );
};

export default CalendarDay;
