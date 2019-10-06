import React from "react";
import clsx from "clsx";

const FormControl = ({ id, className, error, label, ...rest }) => {
  return (
    <div className={clsxcn("form-group", className)}>
      <label className="form-control-label" htmlFor={id}>
        {label}
      </label>
      <input className={clsx("form-control", { "is-invalid": error })} id={id} {...rest} />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default FormControl;
