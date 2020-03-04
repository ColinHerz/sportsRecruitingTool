import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.removeDanger = this.removeDanger.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  removeDanger() {
    if (document.getElementById("username").classList.contains("is-danger")) {
      document.getElementById("username").classList.remove("is-danger");
      document.getElementById("invalidUsername").style.display = "none";
      document.getElementById("password").classList.remove("is-danger");
      document.getElementById("invalidPassword").style.display = "none";
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("/users/login", user)
      .then(res => {
        console.log(res.data.username);
        localStorage.setItem("username", JSON.stringify(this.state.username));
        window.location.href = "/contacts";
      })
      .catch(err => {
        if (err.response.status === 301) {
          document.getElementById("username").classList.add("is-danger");
          document.getElementById("password").classList.add("is-danger");
          document.getElementById("invalidUsername").style.display = "block";
          document.getElementById("invalidPassword").style.display = "block";
        }
      });
  }

  render() {
    return (
      <header
        className="navbar is-pulled-right"
        role="navigation"
        aria-label="navigation"
      >
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-primary"
                      id="username"
                      required
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      onFocus={this.removeDanger}
                    ></input>
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                    </span>
                    <div hidden id="invalidUsername">
                      <span className="icon is-small is-right">
                        <FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon>
                      </span>
                    </div>
                  </div>
                </span>
                <span className="navbar-item">
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
                </span>
                <span className="navbar-item">
                  <button type="submit" className="button is-primary">
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon="sign-in-alt"></FontAwesomeIcon>
                    </span>
                    <span>Login</span>
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </header>
    );
  }
}
