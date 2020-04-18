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
	const [showError, setShowError] = useState(false);

	const [matchInfo, setMatchInfo] = useState({});
	const [golfBag, setGolfBag] = useState({});

	const [showAddScore, setShowAddScore] = useState(false);

	useEffect(() => {
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
					console.log(response);
				},
				() => {
					setShowError(true);
				}
			);
		}
	}, [updateMatch, mid]);

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
			() => {
				setShowError(true);
			}
		);
	};

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
			() => {
				setShowError(true);
			}
		);
	};

	return (
		<main id="view-match">
			{
				showError ?
					<p>Something went wrong. Please try again later.</p>:
					null
			}

			{
				updateMatch ?
					<p>Loading...</p>:
					<React.Fragment>
						<h2>{matchInfo.nameOfRound}</h2>

						<h3>{matchInfo.coursePlayed}</h3>

						<p><span className="bolder">Date Played:</span> {(new Date(matchInfo.datePlayed)).toDateString()}</p>

						<p><span className="bolder">Bag Used:</span> <Link to={`/profile/bag/${matchInfo.GolfBagUsed}`}>{golfBag.bagName}</Link></p>

						<p><span className="bolder">Total Score:</span> {matchInfo.totalScore}</p>

						<h4>Scores</h4>

						<p>Click on a score for more info.</p>

						<button onClick={toggleAddScore}>Add Score</button>

						{
							showAddScore ?
								<form onSubmit={handleSubmit(onSubmit)}>
									<label>
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

									<label>
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
									<label>
										Yes
										<input
											type="radio"
											name="fairwayHit"
											value={true}
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									<label>
										No
										<input
											type="radio"
											name="fairwayHit"
											value={false}
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									{errors.fairwayHit && <p className="error-text">Fairway hit is required.</p>}

									<h5>Green in Regulation</h5>
									<label>
										Yes
										<input
											type="radio"
											name="greenInRegulation"
											value={true}
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									<label>
										No
										<input
											type="radio"
											name="greenInRegulation"
											value={false}
											ref={
												register({
													required: true
												})
											}
										/>
									</label>
									{errors.greenInRegulation && <p className="error-text">Green in regulation is required.</p>}

									<h5>Clubs Used</h5>
									{
										golfBag.golfClub.map(club => (
											<label key={club._id}>
												{club.clubName} ({clubs[club.clubType]})
												<input
													type="checkbox"
													name="clubsUsed"
													value={club._id}
													ref={
														register({
															required: true
														})
													}
												/>
											</label>
										))
									}
									{errors.clubsUsed && <p className="error-text">Clubs used is required.</p>}

									<input type="submit" value="Done" />
									<button onClick={toggleAddScore}>Cancel</button>
								</form>:
								null
						}

						<ol>
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
