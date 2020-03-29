import PropTypes from "prop-types";
import React from "react";

import "./footer.scss";

const Footer = props => {
	const year = (new Date()).getFullYear();

	return (
		<footer>
			<div id="logo">
				<h1>Sporta</h1>
				<p>&copy; Sporta {year}</p>
			</div>

			<div id="get-started">
				<h2>Get Started</h2>
				<ul>
					<li><button onClick={props.logIn}>Log In</button></li>
					<li><button onClick={props.register}>Sign Up</button></li>
				</ul>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	logIn: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Footer;
