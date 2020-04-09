import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./viewBag.scss";

const GOLF_URL = `${window.location.protocol}//${window.location.host}/api/golf/`;

const NO_CLUB = 0;
const WOOD = 1;
const IRON = 2;
const WEDGE = 3;
const PUTTER = 4;

const buildPromise = (url, body) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(`POST`, url);
		request.setRequestHeader(`Content-type`, `application/json`);
		request.onload = () => resolve(request);
		request.onerror = () => reject(JSON.parse(request.response));
		request.send(JSON.stringify(body));
	});
};

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
			apiCall(`getGolfBag`, { golfBag: bid });
			setUpdateBag(false);
		}
	});

	const submitClub = event => {
		event.preventDefault();

		if (clubType === NO_CLUB) {
			setShowError(true);
			return;
		}

		const body = {
			golfBag: bid,
			clubName: clubName,
			clubType: clubType
		};

		apiCall(`createGolfclub`, body);

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

		apiCall(`deleteGolfclub`, body);
	};

	const apiCall = async (endpoint, body) => {
		const url = `${GOLF_URL}${endpoint}`;
		const promise = buildPromise(url, body);

		switch (endpoint) {
		case `getGolfBag`:
			await getGolfBag(promise);
			break;
		default:
			await genericApiCall(promise);
			break;
		}
	};

	const getGolfBag = async promise => {
		promise.then(
			data => {
				if (data.status !== 200) {
					console.error(JSON.parse(data.response).warning);
					setShowError(true);
					return;
				}

				setBag(JSON.parse(data.response));
			}
		).catch(
			reason => {
				console.error(reason);
				setShowError(true);
			}
		);
	};

	const genericApiCall = async promise => {
		promise.then(
			data => {
				if (data.status !== 200) {
					console.error(JSON.parse(data.response).warning);
					setShowError(true);
					return;
				}

				setUpdateBag(true);
			}
		).catch(
			reason => {
				console.error(reason);
				setShowError(true);
			}
		);
	};

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
		<main>
			{
				showError ?
					<p>An error occurred. Please try again later.</p>:
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
								<p>{club.clubName}: {typeName}</p>
								<button onClick={handleDeleteClub}>Delete</button>
							</li>
						);
					})
				}
			</ul>

			<button onClick={handleAddClubClick}>Add Club</button>

			{
				addClub ?
					<div>
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

						<button onClick={submitClub}>Add</button>
						<button onClick={cancelAddClub}>Cancel</button>
					</div>:
					null
			}
		</main>
	);
};

ViewBag.propTypes = {
	user: PropTypes.object.isRequired
};

export default ViewBag;
