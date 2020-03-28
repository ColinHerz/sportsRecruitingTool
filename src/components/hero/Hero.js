import PropTypes from "prop-types";
import React from "react";

import "./hero.scss";

const Hero = props => {
	return (
		<main id="hero">
			<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy.</p>

			<button
				className="sign-up"
				onClick={props.register}
			>
				Sign Up
			</button>

			<button
				className="log-in"
				onClick={props.logIn}
			>
				Log In
			</button>
		</main>
	);
};

Hero.propTypes = {
	logIn: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

export default Hero;
