import React from "react";

import "./events.scss";

const Event = props => {
	return (
		<main id="event">
			<h2>My Events</h2>

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

export default Event;
