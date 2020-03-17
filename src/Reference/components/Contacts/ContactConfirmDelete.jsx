import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={this.props.show ? "modal is-active" : "modal display-none"}
      >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-white">Delete contact</p>
            <button
              className="delete"
              onClick={() => this.props.handleClose()}
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <p>Are you sure you want to delete this contact?</p>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-primary"
              onClick={() => this.props.delete(this.props.contactToDEl)}
            >
              <span className="icon is-small">
              <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
            </span>
            <span>Delete contact</span>
            </button>
            <button className="button is-primary is-outlined" onClick={() => this.props.handleClose()}>
              Nevermind
            </button>
          </footer>
        </div>
        <button className="modal-close is-large"></button>
      </div>
    );
  }
}
