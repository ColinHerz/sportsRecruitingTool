import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./hero.scss";

const Hero = props => {
	if (props.loggedIn) {
		return (
			<main id="hero-logged-in">
				<h2>Welcome to Sporta</h2>

				<p>You can view...</p>

				<ul>
					<li><Link to="/events/">Events</Link></li>
					<li><Link to="/profile/">Your Profile</Link></li>
				</ul>
			</main>
		);
	}

	return (
		<main id="hero-logged-out">
			<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy.</p>

			<button
				id="sign-up"
				onClick={props.registering}
			>
				Sign Up
			</button>

			<button
				id="log-in"
				onClick={props.loggingIn}
			>
				Log In
			</button>
		</main>
	);
};

Hero.propTypes = {
	loggingIn: PropTypes.func.isRequired,
	registering: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Hero;
