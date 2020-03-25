import React from "react";

import "./footer.scss"

const Footer = props => {
	const year = (new Date()).getFullYear();

	return (
		<footer>
			<div className="logo">
				<h1>Sporta</h1>
				<p>&copy; Sporta {year}</p>
			</div>

			<div className="menu">
				<h2>Menu</h2>
				<ul>
					<li>Page 1</li>
					<li>Page 2</li>
					<li>Page 3</li>
				</ul>
			</div>

			<div className="get-started">
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
