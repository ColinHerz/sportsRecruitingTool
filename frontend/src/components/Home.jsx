import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderUserLogin from "./Header/HeaderUserLogin";

export default class extends Component {
  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        <section className="section is-hidden-mobile">
          <div className="container">
            <HeaderUserLogin></HeaderUserLogin>
          </div>
        </section>
        <div className="hero-body">
          <div className="container">
            <div>
              <h1 className='title is-1 has-text-centered has-text-white-bis'>
                <FontAwesomeIcon icon='address-book'></FontAwesomeIcon>
                &nbsp;<span className='has-text-primary'>U</span>ltimate{' '}
                <span className='has-text-primary'>C</span>ontact{' '}
                <span className='has-text-primary'>F</span>inder
              </h1>
              <h2 className="subtitle is-3 has-text-centered has-text-white-bis">
                Simply the best at managing contacts
              </h2>
              <div className="field is-grouped is-grouped-centered">
                <Link to="/register">
                  <button className="button is-medium is-primary is-rounded is-outlined">
                    Register Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
