import React, { useContext } from "react";
import { FORM_ERROR } from "final-form";
import { Form, Field } from "react-final-form";
import createDecorator from "final-form-focus";
import isEmail from "validator/lib/isEmail";

import { InputAdapter } from "components/Input";
import AuthContext from "contexts/AuthContext";

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
    } catch (err) {
      return { [FORM_ERROR]: err.message };
    }
  }

  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="segment small border rounded p-3">
        <Form
          decorators={[focusOnError]}
          validate={validate}
          onSubmit={submitForm}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <h3 className="mb-3">Sign In</h3>
              <Field component={InputAdapter} label="Email" name="email" type="email" />
              <Field component={InputAdapter} label="Password" name="password" type="password" />
              <div className="d-flex">
                <button type="submit" disabled={form.submitting} className="btn btn-primary">
                  Login
                </button>
                {form.submitFailed && <p className="text-danger ml-3 mb-0">{form.submitError}</p>}
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default SignInView;
