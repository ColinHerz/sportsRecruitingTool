import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./viewMatch.scss";

const clubs = [
	``,
	`Wood`,
	`Iron`,
	`Wedge`,
	`Putter`
];

const ViewMatch = props => {
	const { mid } = useParams();
	const { register, handleSubmit, errors } = useForm();

	const [updateMatch, setUpdateMatch] = useState(true);
	const [updateEvents, setUpdateEvents] = useState(true);
	const [showError, setShowError] = useState(false);

	const [matchInfo, setMatchInfo] = useState({});
	const [golfBag, setGolfBag] = useState({});

	const [showAddScore, setShowAddScore] = useState(false);

	const [events, setEvents] = useState([]);
	const [showEventPicker, setShowEventPicker] = useState(false);
	const [matchSendSuccess, setMatchSendSuccess] = useState(false);

	useEffect(() => {
		const getBag = id => {
			apiCall(
				{
					endpoint: `/golf/getGolfBag`,
					type: `POST`,
					body: {
						golfBag: id
					}
				},
				data => {
					if (data.status !==  200) {
						setShowError(true);
						return;
					}

					setGolfBag(JSON.parse(data.response));
				},
				setShowErrorMessage
			);
		};

		if (updateMatch) {
			apiCall(
				{
					endpoint: `/golf/getGolfMatch/${mid}`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					const response = JSON.parse(data.response);

					setMatchInfo(response);
					getBag(response.GolfBagUsed);
					setUpdateMatch(false);
				},
				setShowErrorMessage
			);
		}
	}, [updateMatch, mid]);

	useEffect(() => {
		if (updateEvents) {
			apiCall(
				{
					endpoint: `/golf/getMyEvents`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					setEvents(JSON.parse(data.response));
					setUpdateEvents(false);
				},
				setShowErrorMessage
			);
		}
	}, [updateEvents]);

	const toggleAddScore = event => {
		event.preventDefault();
		setShowAddScore(!showAddScore);
	};

	const onSubmit = info => {
		setShowAddScore(false);
		const body = Object.assign({}, info);
		body.golfMatch = mid;

		apiCall(
			{
				endpoint: `/golf/createHoleScore`,
				type: `POST`,
				body: body
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}

				setUpdateMatch(true);
			},
			setShowErrorMessage
		);
	};

	const toggleEventPicker = event => {
		event.preventDefault();
		setShowEventPicker(!showEventPicker);
	};

	const sendMatch = info => {
		apiCall(
			{
				endpoint: `/golf/postEventScore`,
				type: `POST`,
				body: {
					event: info.event,
					golfMatch: mid
				}
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}

				setMatchSendSuccess(true);
				setShowEventPicker(false);
			},
			setShowErrorMessage
		);
	};

	const cancelSendMatch = event => {
		event.preventDefault();

		setShowEventPicker(false);
	};

	const setShowErrorMessage = () => {
		setShowError(true);
	};

	return (
		<main id="view-match">
			{
				showError ?
					<p className="error-text">Something went wrong. Please try again later.</p>:
					null
			}

			{
				updateMatch ?
					<p>Loading...</p>:
					<React.Fragment>
						<h2>{matchInfo.nameOfRound}</h2>

						<h3>{matchInfo.coursePlayed}</h3>

						<button id="send-match-btn" onClick={toggleEventPicker}>Send Match to an Event</button>

						{
							showEventPicker ?
								<form onSubmit={handleSubmit(sendMatch)}>
									<label>
										Select an Event:
										<select
											name="event"
											ref={
												register({
													required: true
												})
											}
										>
											<option disabled>Please select an Event</option>

											{
												events.map(event => {
													return (
														<option
															key={event._id}
															value={event._id}
														>
															{event.eventName}
														</option>
													);
												})
											}
										</select>
									</label>

									<input type="submit" value="Send" />
									<button onClick={cancelSendMatch}>Cancel</button>
								</form>:
								null
						}

						{
							matchSendSuccess ?
								<p>Match sent successfully.</p>:
								null
						}

						<p><span className="bolder">Date Played:</span> {(new Date(matchInfo.datePlayed)).toDateString()}</p>

						<p><span className="bolder">Bag Used:</span> <Link to={`/profile/bag/${matchInfo.GolfBagUsed}`}>{golfBag.bagName}</Link></p>

						<p><span className="bolder">Total Score:</span> {matchInfo.totalScore}</p>

						<h4>Scores</h4>

						<p>Click on a score for more info.</p>

						<button id="add-score-btn" onClick={toggleAddScore}>Add Score</button>

						{
							showAddScore ?
								<form onSubmit={handleSubmit(onSubmit)}>
									<label className="wide-label">
										Score
										<input
											type="number"
											name="score"
											placeholder="3"
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									{errors.score && <p className="error-text">A score is required.</p>}

									<label className="wide-label">
										Number of Putts
										<input
											type="number"
											name="numberOfPutts"
											placeholder="2"
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									{errors.numberOfPutts && <p className="error-text">A putt count is required.</p>}

									<h5>Fairway Hit</h5>
									<div>
										<input
											type="radio"
											name="fairwayHit"
											id="yes-fairway"
											value={true}
											ref={
												register({
													required: true
												})
											}
										/>
										<label htmlFor="yes-fairway">Yes</label>
									</div>

									<div>
										<input
											type="radio"
											name="fairwayHit"
											id="no-fairway"
											value={false}
											ref={
												register({
													required: true
												})
											}
										/>
										<label htmlFor="no-fairway">No</label>
									</div>
									{errors.fairwayHit && <p className="error-text">Fairway hit is required.</p>}

									<h5>Green in Regulation</h5>
									<div>
										<input
											type="radio"
											name="greenInRegulation"
											id="yes-green"
											value={true}
											ref={
												register({
													required: true
												})
											}
										/>
										<label htmlFor="yes-green">Yes</label>
									</div>

									<div>
										<input
											type="radio"
											name="greenInRegulation"
											id="no-green"
											value={false}
											ref={
												register({
													required: true
												})
											}
										/>
										<label htmlFor="no-green">No</label>
									</div>
									{errors.greenInRegulation && <p className="error-text">Green in regulation is required.</p>}

									<h5>Clubs Used</h5>
									{
										golfBag.golfClub.map(club => (
											<div key={club._id}>
												<input
													type="checkbox"
													name="clubsUsed"
													id={club._id}
													value={club._id}
													ref={
														register({
															required: true
														})
													}
												/>
												<label htmlFor={club._id}>{club.clubName} ({clubs[club.clubType]})</label>
											</div>
										))
									}
									{errors.clubsUsed && <p className="error-text">Clubs used is required.</p>}

									<div id="submission-btns">
										<input type="submit" value="Done" />
										<button onClick={toggleAddScore}>Cancel</button>
									</div>
								</form>:
								null
						}

						<ol id="scores-grid">
							{
								matchInfo.golfMatch.map(hole => {
									return(
										<li key={hole._id}>
											<Link to={`/match/${mid}/${hole._id}/`}>{hole.score}</Link>
										</li>
									);
								})
							}
						</ol>
					</React.Fragment>
			}
		</main>
	);
};

export default ViewMatch;
