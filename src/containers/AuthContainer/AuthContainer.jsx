import React from "react";

const AuthContainer = ({ children }) => {
  return <main className="auth-container container">{children}</main>;
};

export default React.memo(AuthContainer);
