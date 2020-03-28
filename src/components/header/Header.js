import PropTypes from "prop-types";
import React from "react";

import "./header.scss";

const Header = props => {
	return (
		<header>
			<h1>Sporta</h1>

			<div>
				<button
					id="log-in"
					onClick={props.logIn}
				>
					Log In
				</button>

				<button
					id="sign-up"
					onClick={props.register}
				>
					Sign Up
				</button>
			</div>
		</header>
	);
};

Header.propTypes = {
	logIn: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Header;
