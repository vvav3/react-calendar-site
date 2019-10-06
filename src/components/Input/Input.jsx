import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = React.memo(
  ({ as: Component = "input", id, className, error, success, label, ...rest }) => {
    return (
      <div className={clsx("form-group", className)}>
        <label className="form-control-label" htmlFor={id}>
          {label}
        </label>
        <Component
          id={id}
          className={clsx("form-control", { "is-invalid": error, "is-valid": success })}
          {...rest}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    );
  }
);

Input.propTypes = {
  as: PropTypes.oneOf(["input", "textarea"])
};

export const InputAdapter = ({ meta, input, ...props }) => {
  const inputProps = { ...input, ...props };
  return <Input success={meta.valid} error={meta.touched && meta.error} {...inputProps} />;
};

export default Input;
