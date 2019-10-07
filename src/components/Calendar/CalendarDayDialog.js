import React, { PureComponent } from "react";
import "./CalendarDayDialog.scoped.scss";

class CalendarDayDialog extends PureComponent {
  state = {
    title: "",
    description: ""
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

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
      <div className="dialog">
        <form className="modal-dialog" onSubmit={this.handleFormSubmit}>
          <div className="modal-content">
            <div className="modal-header">
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
        <div className="shadow" />
      </div>
    );
  }
}

export default CalendarDayDialog;
