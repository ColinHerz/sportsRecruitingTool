import { Link } from "react-router-dom";
import React from "react";

import "./noMatch.scss";

const NoMatch = props => {
	return (
		<main id="not-found">
			<h2>404</h2>

			<h3>Page Not Found</h3>

			<p>The Page you are looking for doesn&apos;t exist or an error occured. Go <Link to="/">home</Link>.</p>

			<p>Or panic. I&apos;m not your dad.</p>
		</main>
	);
};

export default NoMatch;
