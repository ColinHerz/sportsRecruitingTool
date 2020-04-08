import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";

import "./editEvent.scss";

const EditEvent = props => {
	// @TODO
	// will need to change to state array w/ names
	const players = [`Player 1`, `Player 2`, `Player 3`, `Player 4`];
	const holes = (new Array(9)).fill().map((x, i) => i + 1);
	const [scores, setScores] = useState((new Array(9)).fill().map(() => {
		return {
			"Player 1": 0,
			"Player 2": 0,
			"Player 3": 0,
			"Player 4": 0
		};
	}));

	const [active, setActive] = useState(0);

	const handlePlayerScoreChange = event => {
		event.preventDefault();

		const split = event.target.id.split(`-`, 3);
		const activeHole = parseInt(split[1]);
		const player = split[2];

		const newScores = [...scores];

		newScores[activeHole][player] = parseInt(event.target.value);

		console.log(newScores);

		setScores(newScores);
	};

	const changeHole = event => {
		event.preventDefault();

		const hole = parseInt(event.target.id.split(`-`)[1]);

		setActive(hole);
	};

	return (
		<main id="edit-event">
			<h2>Event Title</h2>

			<p>Course Name <span>9 holes</span></p>

			<section>
				<div>
					{
						holes.map((hole, index) =>
							<button
								key={index}
								id={`hole-${index}`}
								onClick={changeHole}
								className={active === index ? `active`:``}
							>
								{hole}
							</button>
						)
					}
				</div>

				<ul>
					{
						players.map(player =>
							<li key={`score-${active}-${player}`}>
								<label>
									<Link to={`/profile/${player}`}>{player}</Link>
									<input
										type="number"
										id={`score-${active}-${player}`}
										value={scores[active][player]}
										onChange={handlePlayerScoreChange}
									/>
								</label>
							</li>
						)
					}
				</ul>
			</section>
		</main>
	);
};

EditEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default EditEvent;
