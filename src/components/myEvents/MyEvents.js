import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./myEvents.scss";

const MyEvents = props => {
	return (
		<main id="my-events">
			<h2>My Events</h2>

			<button><Link to="/myevents/create/">Create Event</Link></button>

			<section id="controlled">
				<h3>Events I Control</h3>
				<ul>
					<li>Event 1</li>
					<li>Event 2</li>
					<li>Event 3</li>
				</ul>
			</section>

			<section id="in">
				<h3>Events I&apos;m In</h3>
				<ul>
					<li>Event 1</li>
					<li>Event 2</li>
					<li>Event 3</li>
				</ul>
			</section>
		</main>
	);
};

MyEvents.propTypes = {
	user: PropTypes.object.isRequired
};

export default MyEvents;
