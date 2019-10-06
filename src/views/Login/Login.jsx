import React, { useContext } from "react";
import { Form, Field } from "react-final-form";
import createDecorator from "final-form-focus";
import isEmail from "validator/lib/isEmail";

import { InputAdapter } from "components/Input/Input";
import { getFirstResponseError } from "utils";
import AuthContext from "context/AuthContext";

const focusOnError = createDecorator();

const SignInView = ({ history }) => {
  const { login } = useContext(AuthContext);

  function validate(values) {
    const errors = {};

    if (!values.email) errors.email = "Required";
    else if (!isEmail(values.email)) errors.email = "Email is invalid";
    if (!values.password) errors.password = "Required";

    return errors;
  }

  async function submitForm(data) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      login(data);
      history.push("/projects");
    } catch (err) {
      const errorText = getFirstResponseError(err.response);
      alert(errorText);
    }
  }

  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="segment small border rounded p-3">
        <Form
          subscription={{ submitting: true, submitError: true }}
          decorators={[focusOnError]}
          validate={validate}
          onSubmit={submitForm}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <h3>Sign In</h3>
              <Field component={InputAdapter} label="Email" name="email" type="email" />
              <Field component={InputAdapter} label="Password" name="password" type="password" />
              <button type="submit" disabled={form.submitting} className="btn btn-primary">
                Login
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default SignInView;
