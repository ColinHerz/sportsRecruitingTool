import { Link } from "react-router-dom";
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

			{
				props.loggedIn ?
					<div id="links">
						<h2>Menu</h2>

						<ul>
							<li><Link to="/myevents/garbage/">Events</Link></li>
							<li><Link to="/scores/">Top Scores</Link></li>
							<li><Link to="/profile/garbage/">My Profile</Link></li>
							<li><button onClick={props.logOut}>Log Out</button></li>
						</ul>
					</div>
					:<div id="links">
						<h2>Get Started</h2>

						<ul>
							<li><button onClick={props.loggingIn}>Log In</button></li>
							<li><button onClick={props.registering}>Sign Up</button></li>
						</ul>
					</div>
			}
		</footer>
	);
};

Footer.propTypes = {
	loggingIn: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	registering: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default Footer;
