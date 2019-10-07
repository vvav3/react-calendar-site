import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Spinner = ({ as: Component = "span", className, ...rest }) => (
  <span className={clsx("spinner", className)} {...rest}>
    <div role="status" className="spinner-border">
      <span className="sr-only">Loading...</span>
    </div>
  </span>
);

Spinner.propTypes = {
  as: PropTypes.oneOf(["div", "span"])
};

export default React.memo(Spinner);
