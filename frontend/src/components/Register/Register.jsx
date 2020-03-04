import React, { Component } from "react";
import HeaderBasic from "../Header/HeaderBasic";
import HighlightedTitle from "../HighlightedTitle";
import RegisterForm from "./RegisterForm";

export default class extends Component {
  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        <section className="section is-hidden-mobile">
          <div className="container">
            <HeaderBasic
              buttonName={"Home"}
              buttonIcon={"home"}
              buttonLocation={"/"}
            ></HeaderBasic>
          </div>
        </section>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-half">
                <h1 className="title has-text-white-bis">Create an account</h1>
                <HighlightedTitle color="yellow">
                  Fill out all your personal details below
                </HighlightedTitle>
                <RegisterForm></RegisterForm>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
