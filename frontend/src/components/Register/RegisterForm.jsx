import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      passwordConfirm: "",
      error: ""
    };
    this.removeDanger = this.removeDanger.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value
    });
  }

  removeDanger() {
    if (
      document.getElementById("passwordConfirm").classList.contains("is-danger")
    ) {
      document.getElementById("password").classList.remove("is-danger");
      document.getElementById("invalidPassword").style.display = "none";
      document.getElementById("passwordConfirm").classList.remove("is-danger");
      document.getElementById("invalidConfirmPassword").style.display = "none";
    } else if (
      document.getElementById("username").classList.contains("is-danger")
    ) {
      document.getElementById("username").classList.remove("is-danger");
      document.getElementById("taken").style.display = "none";
    } else if (
      document.getElementById("firstname").classList.contains("is-danger")
    ) {
      document.getElementById("firstname").classList.remove("is-danger");
      document.getElementById("lastname").classList.remove("is-danger");
      document.getElementById("invalidFirst").style.display = "none";
      document.getElementById("invalidLast").style.display = "none";
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      document.getElementById("invalidConfirmPassword").style.display =
        "hidden";
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post("/users/register", user)
        .then(res => {
          console.log(res.status);
          if (res.status === 200) {
            console.log(res.data.username);
            localStorage.setItem("username", JSON.stringify(this.state.username));
            window.location.href = "/contacts";
          }
        })
        .catch(err => {
          if (err.response.status === 300) {
            document.getElementById("username").classList.add("is-danger");
            document.getElementById("taken").style.display = "block";
          } else if (err.response.status === 301) {
            document.getElementById("firstname").classList.add("is-danger");
            document.getElementById("lastname").classList.add("is-danger");
            document.getElementById("invalidFirst").style.display = "block";
            document.getElementById("invalidLast").style.display = "block";
          }
        });
    } else {
      this.setState({
        error: "Passwords do not match"
      });
      document.getElementById("password").classList.add("is-danger");
      document.getElementById("invalidPassword").style.display = "block";
      document.getElementById("passwordConfirm").classList.add("is-danger");
      document.getElementById("invalidConfirmPassword").style.display = "block";
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label className="label is-medium has-text-white-bis">Name</label>
        <div className="field is-grouped">
          <div className="control is-expanded has-icons-right">
            <input
              className="input is-primary"
              id="firstname"
              required
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
              type="text"
              placeholder="First"
              onFocus={this.removeDanger}
            ></input>
            <div hidden id="invalidFirst">
              <p className="help is-danger">
                Your name must only contain alphabetical letters.
              </p>
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
              </span>
            </div>
          </div>
          <div className="control is-expanded has-icons-right">
            <input
              className="input is-primary"
              id="lastname"
              required
              value={this.state.lastname}
              onChange={this.onChangeLastName}
              type="text"
              placeholder="Last"
              onFocus={this.removeDanger}
            ></input>
            <div hidden id="invalidLast">
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-medium has-text-white-bis">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-primary"
              id="username"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
              type="text"
              placeholder="Username"
              autoComplete="username"
              onFocus={this.removeDanger}
            ></input>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="user"></FontAwesomeIcon>
            </span>
            <div hidden id="taken">
              <p className="help is-danger">
                Sorry, that username is already taken.
              </p>
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-medium has-text-white-bis">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-primary"
              id="password"
              required
              value={this.state.password}
              onChange={this.onChangePassword}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              onFocus={this.removeDanger}
            ></input>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="lock"></FontAwesomeIcon>
            </span>
            <div hidden id="invalidPassword">
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-medium has-text-white-bis">
            Confirm your password
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-primary"
              id="passwordConfirm"
              required
              value={this.state.passwordConfirm}
              onChange={this.onChangePasswordConfirm}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              onFocus={this.removeDanger}
            ></input>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="lock"></FontAwesomeIcon>
            </span>
            <div hidden id="invalidConfirmPassword">
              <p className="help is-danger">
                These passwords don't match. Try again?
              </p>
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </div>

        <div className="field">
          <p className="control">
            <button type="submit" className="button is-primary">
              Register now
            </button>
          </p>
        </div>
      </form>
    );
  }
}
