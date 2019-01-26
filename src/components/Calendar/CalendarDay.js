import React, { PureComponent, Fragment } from "react";
import cn from "classnames";
import { Manager, Reference, Popper } from "react-popper";

import styles from "./CalendarDay.module.css";

class CalendarDay extends PureComponent {
  togglePopper = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  render() {
    const { date, disabled, active } = this.props;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              className={cn("date-cell", { disabled, active })}
              ref={ref}
              onClick={this.handleClick}
            >
              <div className="date">{date}</div>
            </div>
          )}
        </Reference>

        {active && (
          <Popper placement="right">
            {({ ref, style, placement, arrowProps }) => (
              <div className={styles.popper} ref={ref} style={style} data-placement={placement}>
                <div className={cn("card text-white bg-primary", styles.popup)}>
                  <div className="card-header"><input className="form-control"/></div>
                  <div className="card-body">
                    <h4 className="card-title">Primary card title</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and make up the bulk of the
                      card's content.
                    </p>
                  </div>
                  <div
                    className={styles["popper-arrow"]}
                    ref={arrowProps.ref}
                    style={arrowProps.style}
                  />
                </div>
              </div>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

export default CalendarDay;
