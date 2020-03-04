import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstname: this.props.row.firstname
    });
    this.setState({
      lastname: this.props.row.lastname
    });
    this.setState({
      email: this.props.row.email
    });
    this.setState({
      phone: this.props.row.phone
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  removeDanger() {
    if (
      document.getElementById('firstname').classList.contains('is-danger')
    ) {
      document.getElementById('firstname').classList.remove('is-danger');
      document.getElementById('invalidFirst').style.display = 'none';
      document.getElementById('lastname').classList.remove('is-danger');
      document.getElementById('invalidLast').style.display = 'none';
    } else if (
      document.getElementById('email').classList.contains('is-danger')
    ) {
      document.getElementById('email').classList.remove('is-danger');
      document.getElementById('invalidEmail').style.display = 'none';
    } else if (
      document.getElementById('phone').classList.contains('is-danger')
    ) {
      document.getElementById('phone').classList.remove('is-danger');
      document.getElementById('invalidPhone').style.display = 'none';
    }
  }

  render() {
    return (
      <tr id={this.props.index} key={this.props.index}>
        <td>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="control has-icons-right">
                  <input
                    className="input is-primary"
                    id={"firstname"}
                    value={this.state.firstname}
                    onChange={this.onChangeFirstName}
                    type="text"
                    placeholder="First Name"
                    onFocus={this.removeDanger}
                  ></input>
                  <div hidden id='invalidFirst'>
                    <p className='help is-danger'>
                      Name must only contain alphabetical letters.
                    </p>
                    <span className='icon is-small is-right'>
                      <FontAwesomeIcon icon='exclamation-triangle'></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-right">
                  <input
                    className="input is-primary"
                    id={"lastname"}
                    value={this.state.lastname}
                    onChange={this.onChangeLastName}
                    type="text"
                    placeholder="Last Name"
                    onFocus={this.removeDanger}
                  ></input>
                  <div hidden id='invalidLast'>
                    <span className='icon is-small is-right'>
                      <FontAwesomeIcon icon='exclamation-triangle'></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-primary"
              id={"email"}
              value={this.state.email}
              onChange={this.onChangeEmail}
              type="text"
              placeholder="Email"
              onFocus={this.removeDanger}
            ></input>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
            </span>
            <div hidden id='invalidEmail'>
              <p className='help is-danger'>Please input a valid email address.</p>
              <span className='icon is-small is-right'>
                <FontAwesomeIcon icon='exclamation-triangle'></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </td>
        <td>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-primary"
              id={"phone"}
              value={this.state.phone}
              onChange={this.onChangePhone}
              type="text"
              placeholder="Phone"
              onFocus={this.removeDanger}
            ></input>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="phone"></FontAwesomeIcon>
            </span>
            <div hidden id='invalidPhone'>
              <p className='help is-danger'>Phone number must be ten digits long.</p>
              <span className='icon is-small is-right'>
                <FontAwesomeIcon icon='exclamation-triangle'></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </td>
        <td>
          <div className="field is-grouped is-pulled-right">
            <p className="control">
              <button
                className="button is-primary"
                onClick={() =>
                  this.props.editContact(
                    this.props.row._id,
                    this.state.firstname,
                    this.state.lastname,
                    this.state.email,
                    this.state.phone
                  )
                }
              >
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="save"></FontAwesomeIcon>
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-primary is-outlined"
                onClick={() => {
                  this.props.stopEditThisRow(-1);
                }}
              >
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="ban"></FontAwesomeIcon>
                </span>
              </button>
            </p>
          </div>
        </td>
      </tr>
    );
  }
}
