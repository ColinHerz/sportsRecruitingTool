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
						<NavLink to="/myevents/garbage/">Events</NavLink>

						<NavLink to="/scores/">Top Scores</NavLink>

						<NavLink to="/profile/garbage/">My Profile</NavLink>

						<button onClick={props.logOut}>Log Out</button>
					</nav>:
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
			}
		</header>
	);
};

Header.propTypes = {
	logIn: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Header;
