import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./createEvent.scss";

const NOT_ENOUGH_PLAYERS = `There must be at least one player.`;
const NOT_VALID_USER = `All users must be a valid email address.`;

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth + 1).padStart(2, `0`);
const day = String(date.getDate() + 1).padStart(2, `0`);

const CURRENT_DATE = `${year}-${month}-${day}`;

const CreateEvent = props => {
	const { register, handleSubmit, errors } = useForm();

	const [playerName, setPlayerName] = useState(``);
	const [showPlayerInput, setShowPlayerInput] = useState(false);
	const [players, setPlayers] = useState([]);
	const [showPlayersError, setShowPlayersError] = useState(false);
	const [playersErrorText, setPlayersErrorText] = useState(``);

	const [showError, setShowError] = useState(false);

	const [submitted, setSubmitted] = useState(false);
	const [eventId, setEventId] = useState(``);

	const toggleShowPlayerInput = event => {
		event.preventDefault();

		if (showPlayerInput && playerName !== ``) {
			const newPlayers = [...players];

			setShowPlayersError(false);

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
		const newPlayers = [...players];

		newPlayers.splice(index, 1);

		setPlayers(newPlayers);
	};

	const onSubmit = info => {
		setShowPlayerInput(false);

		if (playersNotValid()) {
			return;
		}

		const body = Object.assign({}, info);
		body.players = players;

		apiCall(
			{
				endpoint: `/golf/createGolfEvent`,
				type: `POST`,
				body: body
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}

				const eid = JSON.parse(data.response).event;

				setEventId(eid);
				setSubmitted(true);
			},
			() => {
				setShowError(true);
			}
		);
	};

	const playersNotValid = () => {
		if (players.length < 1) {
			setPlayersErrorText(NOT_ENOUGH_PLAYERS);
			setShowPlayersError(true);
			return true;
		}

		if (notAllEmails()) {
			setPlayersErrorText(NOT_VALID_USER);
			setShowPlayersError(true);
			return true;
		}

		return false;
	};

	const notAllEmails = () => {
		const notEmails = players.filter(player => !player.match(/^.+@.+\..+$/));

		return notEmails.length !== 0;
	};

	if (submitted) {
		return (
			<main id="create-event-success">
				<h2>Create An Event</h2>

				<p>Event created successfully.</p>

				<p>You can view it <Link to={`/events/${eventId}`}>Here</Link></p>
			</main>
		);
	}

	return (
		<main id="create-event">
			<h2>Create An Event</h2>

			{
				showError ?
					<p className="error-text">Something went wrong. Please try again later.</p>:
					null
			}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-group">
					<label>
						Event Name
						<input
							type="text"
							name="eventName"
							ref={
								register({
									required: true
								})
							}
						/>
					</label>
					{errors.eventName && <p className="error-text">An event name is required.</p>}
				</div>

				<div className="input-group">
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
					{errors.course && <p className="error-text">A course name is required.</p>}
				</div>

				<div className="input-group">
					<label>
						Start Date
						<input
							type="date"
							name="startDate"
							min={CURRENT_DATE}
							ref={
								register({
									required: true,
									min: CURRENT_DATE
								})
							}
						/>
					</label>
					{errors.startDate && <p className="error-text">A start date is required.</p>}
				</div>

				<div className="input-group">
					<label>
						End Date
						<input
							type="date"
							name="endDate"
							min={CURRENT_DATE}
							ref={
								register({
									required: true,
									min: CURRENT_DATE
								})
							}
						/>
					</label>
					{errors.endDate && <p className="error-text">An end date is required.</p>}
				</div>

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

				<div id="add-player-section">
					{
						showPlayerInput ?
							<input
								aria-label="New Player Name"
								type="text"
								onChange={updatePlayerName}
								value={playerName}
							/>:
							null
					}

					<button
						onClick={toggleShowPlayerInput}
						id="add-player-btn"
					>
						{
							showPlayerInput ?
								`Done`:
								`Add Player`
						}
					</button>

					{
						showPlayersError ?
							<p className="error-text">{playersErrorText}</p>:
							null
					}
				</div>

				<input type="submit" value="Create" />
			</form>
		</main>
	);
};

CreateEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default CreateEvent;
