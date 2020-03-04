import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faLock,
  faAddressBook,
  faHome,
  faPhone,
  faExclamationTriangle,
  faSearch,
  faTrash,
  faEdit,
  faSignOutAlt,
  faSignInAlt,
  faPlus,
  faSave,
  faEnvelope,
  faBan
} from "@fortawesome/free-solid-svg-icons";
import "./css/App.css";

import Home from "./components/Home";
import Register from "./components/Register/Register";
import Contacts from "./components/Contacts/Contacts";

library.add(
  faUser,
  faLock,
  faAddressBook,
  faHome,
  faPhone,
  faExclamationTriangle,
  faSearch,
  faTrash,
  faEdit,
  faSignOutAlt,
  faSignInAlt,
  faPlus,
  faSave,
  faEnvelope,
  faBan
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/contacts" exact component={Contacts} />
      </div>
    </BrowserRouter>
  );
}

export default App;
