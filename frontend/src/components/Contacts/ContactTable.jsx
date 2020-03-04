import React, { Component } from "react";
import ContactsSearchBar from "./ContactSearchBar";
import ContactsRow from "./ContactRow";
import EditRow from "./ContactEditRow";
import axios from "axios";
import ConfirmModal from "./ContactConfirmDelete";
import AddRow from "./ContactAddRow";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredContacts: [],
      showDEL: false,
      contactToDEl: "hi",
      editingRow: -1,
      currentlyAddingRow: false
    };
    this.getRowsData = this.getRowsData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.changeEditRow = this.changeEditRow.bind(this);
    this.addOnOff = this.addOnOff.bind(this);
    this.addContact = this.addContact.bind(this);
  }
  
  showModal = idToDEl => {
    this.setState({ contactToDEl: idToDEl });
    this.setState({ showDEL: true });
  };

  hideModal = () => {
    this.setState({ showDEL: false });
  };

  addOnOff = () => {
    this.setState({ currentlyAddingRow: !this.state.currentlyAddingRow });
  };

  deleteContact = id => {
    axios
      .post("contacts/delete/" + id, {
        id: id
      })
      .then(res => {
        const contactsCopy = this.state.filteredContacts.filter(
          row => row._id !== id
        );
        this.setState({ filteredContacts: contactsCopy });
        this.setState({ showDEL: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeEditRow = index => {
    this.setState({ editingRow: index });
  };

  editContact = (id, firstname, lastname, email, phone) => {
    axios
      .post("contacts/update/" + id, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone
      })
      .then(res => {
        this.props.reloadContacts();
        this.setState({ editingRow: -1 });
      })
      .catch(err => {
        if (err.response.status === 300) {
          document.getElementById('firstname').classList.add("is-danger");
          document.getElementById('lastname').classList.add("is-danger");
          document.getElementById("invalidFirst").style.display = "block";
          document.getElementById("invalidLast").style.display = "block";
        } else if (err.response.status === 301) {
          document.getElementById("email").classList.add("is-danger");
          document.getElementById("invalidEmail").style.display = "block";
        } else if (err.response.status === 302){
          document.getElementById("phone").classList.add("is-danger");
          document.getElementById("invalidPhone").style.display = "block";
        }
      });
  };

  addContact = (firstname, lastname, email, phone) => {
    axios
      .post("contacts/add/" + this.props.username, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone
      })
      .then(res => {
        this.props.reloadContacts();
        this.setState({ currentlyAddingRow: false });
      })
      .catch(err => {
        if (err.response.status === 300) {
          document.getElementById("Addfirstname").classList.add("is-danger");
          document.getElementById("Addlastname").classList.add("is-danger");
          document.getElementById("invalidFirst").style.display = "block";
          document.getElementById("invalidLast").style.display = "block";
        } else if (err.response.status === 301) {
          document.getElementById("Addemail").classList.add("is-danger");
          document.getElementById("invalidEmail").style.display = "block";
        } else if (err.response.status === 302){
          document.getElementById("Addphone").classList.add("is-danger");
          document.getElementById("invalidPhone").style.display = "block";
        }
      });
  };

  handleChange(e) {
    let currentContacts = [];
    let newContacts = [];

    if (e.target.value !== "") {
      currentContacts = this.props.contacts;
      newContacts = currentContacts.filter(item => {
        const lc = item.firstname.toLowerCase() + " " + item.lastname.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newContacts = this.props.contacts;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filteredContacts: newContacts
    });
  }

  componentDidMount() {
    this.setState({
      filteredContacts: this.props.contacts
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filteredContacts: nextProps.contacts
    });
  }

  getRowsData = function() {
    var items = this.state.filteredContacts;
    return items.map((row, index) => {
      return index === this.state.editingRow ? (
        <EditRow
          key={index}
          index={index}
          row={row}
          editContact={this.editContact}
          stopEditThisRow={this.changeEditRow}
        ></EditRow>
      ) : (
        <ContactsRow
          key={index}
          modal={this.showModal}
          index={index}
          row={row}
          editThisRow={this.changeEditRow}
        ></ContactsRow>
      );
    });
  };

  render() {
    return (
      <div>
        <section className="section is-medium">
          <div className="hero-head">
            <div className="container is-capitalized">
              <ContactsSearchBar
                handleChange={this.handleChange}
                username={(this.props.username)}
                makeAddActive={this.addOnOff}
              ></ContactsSearchBar>
            </div>
          </div>
        </section>
        <section className="section is-medium">
          <div className="container">
            <table className="table is-transparent is-hoverable">
              <thead>
                <tr>
                  <th className="has-text-white-bis">Name</th>
                  <th className="has-text-white-bis">Email Address</th>
                  <th className="has-text-white-bis">Phone Number</th>
                  <th className="is-narrow"></th>
                </tr>
              </thead>
              <tbody>
                <AddRow
                  AddContact={this.addContact}
                  stopAddingRow={this.addOnOff}
                  isAddingRow={this.state.currentlyAddingRow}
                />
                {this.getRowsData()}
              </tbody>
            </table>
          </div>
        </section>
        <ConfirmModal
          show={this.state.showDEL}
          delete={this.deleteContact}
          handleClose={this.hideModal}
          contactToDEl={this.state.contactToDEl}
        />
      </div>
    );
  }
}
