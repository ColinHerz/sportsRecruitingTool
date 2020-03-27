import React, { Component } from "react";
import HighlightedTitle from "../HighlightedTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ContactsSearchBar extends Component {
  render() {
    var handleChange = this.props.handleChange;
    var username = this.props.username;
    return (
      <div>
        <HighlightedTitle color="yellow">
          {username}'s Contacts
        </HighlightedTitle>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="field">
                <p className="control has-icons-right">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Search contacts"
                    onChange={handleChange}
                  ></input>
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon="search"></FontAwesomeIcon>
                  </span>
                </p>
              </div>
            </div>
            <p className="level-item">
              <button
                className="button is-primary"
                onClick={() => {
                  this.props.makeAddActive();
                }}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
                </span>
                <span>New Contact</span>
              </button>
            </p>
          </div>
        </nav>
      </div>
    );
  }
}
