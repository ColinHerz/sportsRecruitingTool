import React from "react";
import "../css/App.css";

export default props => (
  <h2 className="subtitle is-3 has-text-white-bis">
    <span className={`shadow is-${props.color}`}>{props.children}</span>
  </h2>
);
