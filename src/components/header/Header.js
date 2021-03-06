import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./header.scss";

const Header = props => {
	return (
		<header>
			<NavLink to="/" id="logo"><h1>Sporta</h1></NavLink>

			{
				// profile will need to change to logged in user
				props.loggedIn ?
					<nav>
						<NavLink to="/events/">Events</NavLink>

						<NavLink to="/profile/">My Profile</NavLink>

						<button onClick={props.logOut}>Log Out</button>
					</nav>:
					<div>
						<button
							id="log-in"
							onClick={props.loggingIn}
						>
						Log In
						</button>

						<button
							id="sign-up"
							onClick={props.registering}
						>
						Sign Up
						</button>
					</div>
			}
		</header>
	);
};

Header.propTypes = {
	loggingIn: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	registering: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Header;
