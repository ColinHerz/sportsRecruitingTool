import apiCall from "../../api/api.js";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./viewHole.scss";

const clubs = [
	``,
	`Wood`,
	`Iron`,
	`Wedge`,
	`Putter`
];

const ViewHole = props => {
	const { mid, hid } = useParams();
	// const { register, handleSubmit, errors } = useForm();

	const [updateHole, setUpdateHole] = useState(true);
	const [showError, setShowError] = useState(false);

	const [bag, setBag] = useState({});
	const [hole, setHole] = useState({});

	useEffect(() => {
		const getBag = () => {
			getBagById();
		};

		const getBagById = () => {
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

					const bagId = JSON.parse(data.response).GolfBagUsed;
					searchForBag(bagId);
				},
				showErrorMessage
			);
		};

		const searchForBag = id => {
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

					setBag(JSON.parse(data.response));
				},
				showErrorMessage
			);
		};

		const getHoleInfo = () => {
			apiCall(
				{
					endpoint: `/golf/getGolfHole/${mid}/${hid}`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
					}

					setHole(JSON.parse(data.response));
				},
				showErrorMessage
			);
		};

		if (updateHole) {
			getHoleInfo();
			getBag();
			setUpdateHole(false);
		}

	}, [updateHole, hid, mid]);

	const showErrorMessage = () => {
		setShowError(true);
	};

	const findClubById = club => {
		const item = bag.golfClub.find(item => item._id === club);

		return item;
	};

	const safeToTraverse = () => {
		return hole.clubsUsed !== undefined && bag !== undefined && bag.golfClub !== undefined;
	};

	return(
		<main id="view-hole">
			<h2>View Hole Score</h2>

			{
				showError ?
					<p id="error-text">Something went wrong. Please try again later.</p>:
					null
			}

			{
				updateHole ?
					<p>Loading...</p>:
					<React.Fragment>
						<p><span className="bolder">Score:</span> {hole.score}</p>

						<p><span className="bolder">Number of Putts:</span> {hole.numberOfPutts}</p>

						<p><span className="bolder">Hit the Fairway:</span> {hole.fairwayHit ? `Yes`: `No`}</p>

						<p><span className="bolder">Green in Regulation:</span> {hole.greenInRegulation ? `Yes`: `No`}</p>

						<h3>Clubs Used</h3>
						<ul>
							{
								safeToTraverse() ?
									hole.clubsUsed.map(club => {
										const clubInfo = findClubById(club);

										return (
											<li key={clubInfo._id}>
												{clubInfo.clubName} <span className="smaller">({clubs[clubInfo.clubType]})</span>
											</li>
										);
									}):
									null
							}
						</ul>
					</React.Fragment>
			}
		</main>
	);
};

export default ViewHole;
