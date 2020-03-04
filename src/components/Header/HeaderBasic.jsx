import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  render() {
    var buttonName = this.props.buttonName;
    var buttonIcon = this.props.buttonIcon;
    var buttonLocation = this.props.buttonLocation;
    return (
      <header className="navbar" role="navigation" aria-label="navigation">
        <div className="navbar-menu">
          <div className="navbar-end">
            <span className="navbar-item">
              <Link to={buttonLocation}>
                <button className="button is-primary">
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={buttonIcon}></FontAwesomeIcon>
                  </span>
                  <span>{buttonName}</span>
                </button>
              </Link>
            </span>
          </div>
        </div>
      </header>
    );
  }
}
