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
					<li>Log In</li>
					<li>Sign Up</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
