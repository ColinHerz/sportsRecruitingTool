import React from "react";

import "./header.scss"

const Header = props => {
	return (
		<header>
			<h1>Sporta</h1>

			<div>
				<button id="sign-up">Sign Up</button>
				<button id="log-in">Log In</button>
			</div>
		</header>
	);
};

export default Header;
