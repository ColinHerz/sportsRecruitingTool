import React from "react";

import Header from "../header/Header.js";
import Hero from "../hero/Hero.js";
import Footer from "../footer/Footer.js";
import Profile from "../Profile/profile.js";

const Landing = props => {
	return (
		<React.Fragment>
			<Header />
			<Profile />
			<Footer />
		</React.Fragment>
	);
};

export default Landing;
