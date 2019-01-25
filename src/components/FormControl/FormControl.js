import React from "react";
import cn from "classnames";

const FormControl = ({ id, className, error, label, ...rest }) => {
  return (
    <div className={cn("form-group", className)}>
      <label className="form-control-label" htmlFor={id}>
        {label}
      </label>
      <input className={cn("form-control", { "is-invalid": error })} id={id} {...rest} />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default FormControl;
