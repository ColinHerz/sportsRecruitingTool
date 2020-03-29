import React from "react";

import "./ViewEvent.scss";

const ViewEvent = props => {
	return (
		<main id="event">
			<section id="currentEvents">
				<h2>Event Title</h2>
				<h3><span>Course Name</span> 9 Holes</h3>
			</section>
			<div>
				<section id="scores">
					<h3>Scores</h3>
					<h4><a href="#">Player 1</a></h4>
					<ol>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
					</ol>
					<p><span>Total:</span> 20</p>
					<h4><a href="#">Player 2</a></h4>
					<ol>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
					</ol>
					<p><span>Total:</span> 20</p>
					<h4><a href="#">Player 3</a></h4>
					<ol>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
					</ol>
					<p><span>Total:</span> 20</p>
				</section>
			</div>
		</main>
	);
};

export default ViewEvent;
