import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "./createMatch.scss";

const CreateMatch = props => {
	const { register, handleSubmit, errors } = useForm();

	const [firstLoad, setFirstLoad] = useState(true);
	const [showError, setShowError] = useState(false);

	const [matchId, setMatchId] = useState(``);

	const [golfBags, setGolfBags] = useState([]);

	useEffect(() => {
		if (firstLoad) {
			apiCall(
				{
					endpoint: `/golf/getAllGolfBags`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					setGolfBags(JSON.parse(data.response));
				},
				() => {
					setShowError(true);
					return;
				}
			);

			setFirstLoad(false);
		}
	}, [firstLoad]);

	const onSubmit = info => {
		apiCall(
			{
				endpoint: `/golf/createGolfMatch`,
				type: `POST`,
				body: info
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
				}

				setMatchId(JSON.parse(data.response).golf);
			},
			() => {
				setShowError(true);
			}
		);
	};

	return (
		<main id="create-match">
			<h2>Create a Match</h2>

			{
				showError ?
					<p id="error-message">Something went wrong. Please try again later.</p>:
					null
			}

			{
				matchId === `` ?
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							Match Name
							<input
								type="text"
								name="nameOfRound"
								ref={
									register({
										required: true
									})
								}
							/>
						</label>
						{errors.nameOfRound && <p className="error-text">A match name is required.</p>}

						<label>
							Course Played
							<input
								type="text"
								name="coursePlayed"
								ref={
									register({
										required: true
									})
								}
							/>
						</label>
						{errors.coursePlayed && <p className="error-text">A course name is required.</p>}

						<label>
							Date Played
							<input
								type="date"
								name="datePlayed"
								ref={
									register({
										required: true
									})
								}
							/>
						</label>
						{errors.datePlayed && <p className="error-text">A play date is required.</p>}

						<label>
							Bag Used
							<select
								name="GolfBagUsed"
								ref={
									register({
										required: true
									})
								}
							>
								<option disabled>Please select a bag</option>
								{
									golfBags.map(bag => (
										<option
											key={bag._id}
											value={bag._id}
										>
											{bag.bagName}
										</option>
									))
								}
							</select>
						</label>
						{errors.GolfBagUsed && <p className="error-text">A valid bag is required.</p>}

						<input type="submit" value="Create" />
					</form>:
					<React.Fragment>
						<p>Match created successfully.</p>

						<Link to={`/match/${matchId}/`}>View the match.</Link>
					</React.Fragment>
			}
		</main>
	);
};

export default CreateMatch;
