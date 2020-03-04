import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {

  logout = function(link) {
    localStorage.setItem("username", JSON.stringify(""));
    window.location.replace(link)
  }

  render() {
    var buttonName = this.props.buttonName;
    var buttonIcon = this.props.buttonIcon;
    var buttonLocation = this.props.buttonLocation;

    return (
      <header className="navbar" role="navigation" aria-label="navigation">
        <div className="navbar-menu">
          <div className="navbar-end">
            <span className="navbar-item">
              <button
                onClick={() => this.logout(buttonLocation)}
                className="button is-primary">
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={buttonIcon}></FontAwesomeIcon>
                </span>
                <span>{buttonName}</span>
              </button>
            </span>
          </div>
        </div>
      </header>
    );
  }
}
