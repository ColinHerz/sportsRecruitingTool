import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: []
    };
  }

  formatPhoneNumber(number) {
    var cleaned = ("" + number).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return number;
  }

  render() {
    return (
      <tr id={this.props.index} key={this.props.index}>
        <td>
          <span className="tag is-primary is-large is-capitalized">
            <p>
              {(this.props.row.firstname) + " "}
              {(this.props.row.lastname)}
            </p>
          </span>
        </td>
        <td>
          <span className="tag is-white is-large">{this.props.row.email}</span>
        </td>
        <td>
          <span className="tag is-white is-large">
            {this.formatPhoneNumber(this.props.row.phone)}
          </span>
        </td>
        <td>
          <div className="field is-grouped">
            <p className="control">
              <button
                className="button is-primary"
                onClick={() => {
                  this.props.editThisRow(this.props.index);
                }}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                </span>
                <span>Edit</span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-primary is-outlined"
                onClick={() => {
                  this.props.modal(this.props.row._id);
                }}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                </span>
                <span>Delete</span>
              </button>
            </p>
          </div>
        </td>
      </tr>
    );
  }
}
