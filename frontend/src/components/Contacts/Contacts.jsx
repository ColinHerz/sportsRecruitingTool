import React, { Component } from "react";
import axios from "axios";
import ContactsTable from "./ContactTable";
import HeaderLogout from "../Header/HeaderLogout";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      username: ""
    };
    this.reloadContacts = this.reloadContacts.bind(this);
  }

  reloadContacts = () => {
    var username = JSON.parse(localStorage.getItem("username"));
    this.setState({ username: username });
    axios
      .post("contacts/getAllContacts/" + username, {
        contact_for_user: username
      })
      .then(res => {
        this.setState({ contacts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    var username = JSON.parse(localStorage.getItem("username"));

    if (!username)
      window.location.replace("/")

    this.setState({ username: username });
    axios
      .post("contacts/getAllContacts/" + username, {
        contact_for_user: username
      })
      .then(res => {
        this.setState({ contacts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <section className="section">
          <div className="container">
            <HeaderLogout
              buttonName={"Log out"}
              buttonIcon={"sign-out-alt"}
              buttonLocation={"/"}
            ></HeaderLogout>
          </div>
        </section>
        <ContactsTable
          reloadContacts={this.reloadContacts}
          contacts={this.state.contacts}
          username={this.state.username}
        />
      </div>
    );
  }
}
