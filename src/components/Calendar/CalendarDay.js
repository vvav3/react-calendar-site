import React, { PureComponent, Fragment } from "react";
import { Manager, Reference, Popper } from "react-popper";
import cn from "clsx";

import styles from "./CalendarDay.module.css";
import CalendarDayDialog from "./CalendarDayDialog";

class CalendarDay extends PureComponent {
  handleCellClick = () => {
    const { id, onSelect } = this.props;
    onSelect(id);
  };

  handleDeleteClick = e => {
    const { id, onEventDelete } = this.props;
    onEventDelete(id);
    e.stopPropagation();
  };

  handleDialogSubmit = data => {
    const { id, onEventSubmit } = this.props;
    onEventSubmit({ id, data });
  };

  render() {
    const { date, data, disabled, active, onDismiss } = this.props;

    const dateCellStyle = cn(styles["date-cell"], {
      [styles.disabled]: disabled,
      [styles.active]: active,
      [styles.info]: data !== null
    });

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className={dateCellStyle} ref={ref} onClick={this.handleCellClick}>
              <div className={styles.date}>{date}</div>
              {data && (
                <Fragment>
                  <button
                    className={cn("close text-primary", styles.close_btn)}
                    onClick={this.handleDeleteClick}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <div className={styles.event_title}>{data.title}</div>
                </Fragment>
              )}
            </div>
          )}
        </Reference>

        {active && (
          <Popper placement="right">
            {({ ref, style, placement }) => (
              <div className={styles.popper} ref={ref} style={style} data-placement={placement}>
                <CalendarDayDialog
                  data={data}
                  onDismiss={onDismiss}
                  onSubmit={this.handleDialogSubmit}
                />
              </div>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

export default CalendarDay;
