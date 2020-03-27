import React from "react";

import Header from "../header/Header.js";
import Hero from "../hero/Hero.js";
import Footer from "../footer/Footer.js";

const Landing = props => {
	return (
		<React.Fragment>
			<Header />
			<Hero />
			<Footer />
		</React.Fragment>
	);
};

export default Landing;
