import React, { Component } from "react";

import FormControl from "../../components/FormControl";
import Auth from "../../context/AuthContext";
import { users } from "../../misc";
import "./SignInView.css";

class SignInView extends Component {
  static contextType = Auth;

  state = {
    email: "test@email.com",
    password: "test",
    errors: {}
  };

  setErrors = errors => {
    this.setState(prevState => ({ errors: { ...prevState.errors, ...errors } }));
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value, errors: {} });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const userData = users.find(item => item.email === email);
    if (userData) {
      if (userData.password === password) {
        this.context.login(userData);
        this.props.history.push("/");
      } else {
        this.setErrors({ password: "Wrong password" });
      }
    } else {
      this.setErrors({ email: "User not found" });
    }
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <main className="sign-in-page container">
        <div className="row justify-content-center align-items-center">
          <div className="segment small border rounded p-3">
            <form onSubmit={this.handleFormSubmit}>
              <h3>Sign In</h3>
              <FormControl
                id="email"
                type="email"
                label="Email"
                placeholder="email@example.com"
                error={errors.email}
                value={email}
                onChange={this.handleInputChange}
                required
              />
              <FormControl
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                error={errors.password}
                value={password}
                onChange={this.handleInputChange}
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default SignInView;
