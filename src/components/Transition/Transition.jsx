import React from "react";
import PropTypes from "prop-types";
import "./Transition.scoped.scss";
import { CSSTransition } from "react-transition-group";

const Transition = ({ children, show, name = "fade", noExit }) => {
  const hasChildren = Boolean(children);

  return (
    <CSSTransition
      in={show || hasChildren}
      timeout={200}
      exit={!noExit}
      classNames={name}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

Transition.propTypes = {
  name: PropTypes.string,
  noExit: PropTypes.bool
};

export default Transition;
