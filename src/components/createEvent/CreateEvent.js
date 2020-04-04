import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./createEvent.scss";

const CreateEvent = props => {
	const { register, handleSubmit, errors } = useForm();

	const [holeCount, setHoleCount] = useState(1);

	const [playerName, setPlayerName] = useState(``);
	const [showPlayerInput, setShowPlayerInput] = useState(false);
	const [players, setPlayers] = useState([]);

	const updateHoleCount = event => {
		const count = parseInt(event.target.value);

		if (count > 0) {
			setHoleCount(count);
		}
		else {
			setHoleCount(1);
		}
	};

	const toggleShowPlayerInput = event => {
		event.preventDefault();

		// @TODO
		// will need to make api call to check if player exists
		if (showPlayerInput && playerName !== ``) {
			const newPlayers = [... players];

			if (newPlayers.includes(playerName)) {
				return;
			}

			newPlayers.push(playerName);

			setPlayers(newPlayers);
			setPlayerName(``);
		}

		setShowPlayerInput(!showPlayerInput);
	};

	const updatePlayerName = event => {
		setPlayerName(event.target.value);
	};

	const deletePlayer = event => {
		event.preventDefault();

		const index = event.target.parentElement.id.split(`-`)[1];
		const newPlayers = [... players];

		newPlayers.splice(index, 1);

		setPlayers(newPlayers);
	};

	const onSubmit = info => {
		setShowPlayerInput(false);
	};

	return (
		<main id="create-event">
			<h2>Create An Event</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Title
					<input
						type="text"
						name="title"
						ref={
							register({
								required: true
							})
						}
					/>
				</label>
				{errors.title && <p>An event title is required.</p>}

				<label>
					Course
					<input
						type="text"
						name="course"
						ref={
							register({
								required: true
							})
						}
					/>
				</label>
				{errors.course && <p>A course name is required.</p>}

				<label>
					Hole Count
					<input
						type="number"
						name="holeCount"
						onChange={updateHoleCount}
						value={holeCount}
						ref={
							register({
								required: true,
								min: 1
							})
						}
					/>
				</label>
				{errors.holeCount && <p>A hole count greater than 0 is required.</p>}

				<h3>Hole Pars</h3>

				<h3>Players</h3>

				<ul>
					{
						players.map((player, index) =>
							<li
								key={index}
								id={`player-${index}`}
							>
								<span>{player}</span>
								<button onClick={deletePlayer}>Delete</button>
							</li>
						)
					}
				</ul>

				{
					showPlayerInput ?
						<input
							type="text"
							onChange={updatePlayerName}
							value={playerName}
						/>:
						null
				}

				<button onClick={toggleShowPlayerInput}>
					{
						showPlayerInput ?
							`Done`:
							`Add Player`
					}
				</button>

				<input type="submit" value="Create" />
			</form>
		</main>
	);
};

CreateEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default CreateEvent;
