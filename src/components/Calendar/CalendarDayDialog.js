import React, { PureComponent } from "react";
import cn from "classnames";

import styles from "./CalendarDayDialog.module.css";

class CalendarDayDialog extends PureComponent {
  state = {
    title: "Test title",
    description: "Search for the keywords to learn more about each error."
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { title, description } = this.state;
    const { onDismiss } = this.props;

    return (
      <div className={styles["dialog"]}>
        <form className="modal-dialog" onSubmit={this.handleFormSubmit}>
          <div className="modal-content">
            <div className={cn("modal-header", styles.header)}>
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                id="title"
                placeholder="New Event"
                value={title}
                onChange={this.handleInputChange}
                maxLength="50"
                required
              />
            </div>
            <div className="modal-body">
              <label htmlFor="desctiption">Description</label>
              <textarea
                className="form-control"
                id="description"
                placeholder="New event description"
                value={description}
                onChange={this.handleInputChange}
                rows="3"
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={onDismiss}>
                Close
              </button>
            </div>
          </div>
        </form>
        <div className={styles.shadow} />
      </div>
    );
  }
}

export default CalendarDayDialog;
