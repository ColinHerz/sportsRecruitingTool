import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.revertState = this.revertState.bind(this);
  }

  revertState = () => {
    this.setState({
      firstname: ''
    });
    this.setState({
      lastname: ''
    });
    this.setState({
      email: ''
    });
    this.setState({
      phone: ''
    });
  };

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
      document.getElementById('Addfirstname').classList.contains('is-danger')
    ) {
      document.getElementById('Addfirstname').classList.remove('is-danger');
      document.getElementById('invalidFirst').style.display = 'none';
      document.getElementById('Addlastname').classList.remove('is-danger');
      document.getElementById('invalidLast').style.display = 'none';
    } else if (
      document.getElementById('Addemail').classList.contains('is-danger')
    ) {
      document.getElementById('Addemail').classList.remove('is-danger');
      document.getElementById('invalidEmail').style.display = 'none';
    } else if (
      document.getElementById('Addphone').classList.contains('is-danger')
    ) {
      document.getElementById('Addphone').classList.remove('is-danger');
      document.getElementById('invalidPhone').style.display = 'none';
    }
  }

  render() {
    return this.props.isAddingRow === true ? (
      <tr>
        <td>
          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control has-icons-right'>
                  <input
                    className='input is-primary'
                    id={'Addfirstname'}
                    value={this.state.firstname}
                    onChange={this.onChangeFirstName}
                    type='text'
                    placeholder='First name'
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
              <div className='field'>
                <div className='control has-icons-right'>
                  <input
                    className='input is-primary'
                    id={'Addlastname'}
                    value={this.state.lastname}
                    onChange={this.onChangeLastName}
                    type='text'
                    placeholder='Last name'
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
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input is-primary'
              id={'Addemail'}
              value={this.state.email}
              onChange={this.onChangeEmail}
              type='text'
              placeholder='Email'
              onFocus={this.removeDanger}
            ></input>
            <span className='icon is-small is-left'>
              <FontAwesomeIcon icon='envelope'></FontAwesomeIcon>
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
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input is-primary'
              id={'Addphone'}
              value={this.state.phone}
              onChange={this.onChangePhone}
              type='text'
              placeholder='Phone'
              onFocus={this.removeDanger}
            ></input>
            <span className='icon is-small is-left'>
              <FontAwesomeIcon icon='phone'></FontAwesomeIcon>
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
          <div className='field is-grouped is-pulled-right'>
            <div className='control'>
              <button
                className='button is-primary'
                onClick={() => {
                  this.props.AddContact(
                    this.state.firstname,
                    this.state.lastname,
                    this.state.email,
                    this.state.phone
                  );
                  this.revertState();
                }}
              >
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon='save'></FontAwesomeIcon>
                </span>
              </button>
            </div>
            <p className='control'>
              <button
                className='button is-primary is-outlined'
                onClick={() => {
                  this.props.stopAddingRow();
                  this.revertState();
                }}
              >
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon='ban'></FontAwesomeIcon>
                </span>
              </button>
            </p>
          </div>
        </td>
      </tr>
    ) : null;
  }
}
