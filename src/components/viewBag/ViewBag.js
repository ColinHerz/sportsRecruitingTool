import apiCall from "../../api/api.js";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./viewBag.scss";

const NO_CLUB = 0;
const WOOD = 1;
const IRON = 2;
const WEDGE = 3;
const PUTTER = 4;

const ViewBag = props => {
	const { bid } = useParams();

	const [showError, setShowError] = useState(false);

	const [bag, setBag] = useState({ golfClub: [], bagName: `Loading...` });
	const [updateBag, setUpdateBag] = useState(true);

	const [addClub, setAddClub] = useState(false);
	const [clubName, setClubName] = useState(``);
	const [clubType, setClubType] = useState(NO_CLUB);

	useEffect(() => {
		if (updateBag) {
			apiCall(
				{
					endpoint: `/golf/getGolfBag`,
					type: `POST`,
					body: {
						golfBag: bid
					}
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					setBag(JSON.parse(data.response));
				},
				apiError
			);

			setUpdateBag(false);
		}
	});

	const submitClub = event => {
		event.preventDefault();

		if (clubType === NO_CLUB) {
			setShowError(true);
			return;
		}

		apiCall(
			{
				endpoint: `/golf/createGolfclub`,
				type: `POST`,
				body: {
					golfBag: bid,
					clubName: clubName,
					clubType: clubType
				}
			},
			apiSuccess,
			apiError
		);

		setAddClub(false);
		setClubName(``);
		setClubType(NO_CLUB);
	};

	const handleDeleteClub = event => {
		event.preventDefault();

		const clubId = event.target.parentElement.id;

		const body = {
			golfClub: clubId,
			golfBag: bid
		};

		apiCall(
			{
				endpoint: `/golf/deleteGolfclub`,
				type: `POST`,
				body: {
					golfClub: clubId,
					golfBag: bid
				}
			},
			apiSuccess,
			apiError
		);
	};

	const apiSuccess = data => {
		if (data.status !== 200) {
			setShowError(true);
			return;
		}

		setUpdateBag(true);
	}

	const apiError = () => {
		setShowError(true);
	}

	const cancelAddClub = event => {
		event.preventDefault();

		setAddClub(false);
		setClubName(``);
		setClubType(NO_CLUB);
	};

	const handleAddClubClick = event => {
		event.preventDefault();

		setAddClub(true);
	};

	const handleChangeClubName = event => {
		event.preventDefault();

		setClubName(event.target.value);
	};

	const handleChangeClubType = event => {
		event.preventDefault();

		setClubType(parseInt(event.target.value));
	};

	return (
		<main id="view-bag">
			{
				showError ?
					<p id="error-message">An error occurred. Please try again later.</p>:
					null
			}

			<h2>{bag.bagName}</h2>

			<ul>
				{
					bag.golfClub.map(club => {
						let typeName = ``;

						switch(club.clubType) {
						case WOOD:
							typeName = `Wood`;
							break;
						case IRON:
							typeName = `Iron`;
							break;
						case WEDGE:
							typeName = `Wedge`;
							break;
						case PUTTER:
							typeName = `Putter`;
							break;
						default:
							console.error(`Incorrect putter type`);
							setShowError(true);
							break;
						}

						return (
							<li key={club._id} id={club._id}>
								<p>{club.clubName} <span className="gray-type">{typeName}</span></p>
								<button onClick={handleDeleteClub}>Delete</button>
							</li>
						);
					})
				}
			</ul>

			{
				addClub ?
					<div id="add-club-div">
						<label>
							Name:
							<input
								type="text"
								onChange={handleChangeClubName}
								value={clubName}
							/>
						</label>

						<label>
							Type:
							<select
								value={clubType}
								onChange={handleChangeClubType}
							>
								<option value={NO_CLUB}>Please choose a club type</option>
								<option value={WOOD}>Wood</option>
								<option value={IRON}>Iron</option>
								<option value={WEDGE}>Wedge</option>
								<option value={PUTTER}>Putter</option>
							</select>
						</label>

						<div>
							<button onClick={submitClub}>Add</button>
							<button onClick={cancelAddClub}>Cancel</button>
						</div>
					</div>:
					null
			}

			<button
				onClick={handleAddClubClick}
				id="add-club-btn"
			>
				Add Club
			</button>
		</main>
	);
};

ViewBag.propTypes = {
	user: PropTypes.object.isRequired
};

export default ViewBag;
