import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./ViewEvent.scss";

const ViewEvent = props => {
	const { eid } = useParams();

	return (
		<main id="event">
			<section id="currentEvents">
				<h2>Event Title</h2>
				<h3><span>Course Name</span> 9 Holes</h3>
			</section>

			<Link to={`/events/${eid}/match/add/`}><button>Add a match</button></Link>

			<div>
				<section id="scores">
					<h3>Scores</h3>
					<h4><button>Player 1</button></h4>
					<ol>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
					</ol>
					<p><span>Total:</span> 20</p>
					<h4><button>Player 2</button></h4>
					<ol>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
						<li>3</li>
					</ol>
					<p><span>Total:</span> 20</p>
					<h4><button>Player 3</button></h4>
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

ViewEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default ViewEvent;
