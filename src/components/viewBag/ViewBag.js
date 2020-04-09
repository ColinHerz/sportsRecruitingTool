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

const buildPromise = (url, type, body) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(type, url);

		let requestBody = body;

		if (body !== null) {
			request.setRequestHeader(`Content-type`, `application/json`);
			requestBody = JSON.stringify(body);
		}

		request.onload = () => resolve(request);
		request.onerror = () => reject(JSON.parse(request.response));
		request.send(requestBody);
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
			const promise = buildPromise(`${GOLF_URL}getGolfBag`, `POST`, { golfBag: bid });

			promise.then(
				data => {
					console.log(data);

					if (data.status !== 200) {
						console.error(JSON.parse(data.response).warning);
						setShowError(true);
						return;
					}

					setBag(JSON.parse(data.response));
				}
			).catch(
				reason => {
					console.error(reason.warning);
					setShowError(true);
				}
			);

			setUpdateBag(false);
		}
	}, [updateBag, bid]);

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

		setClubType(event.target.value);
	};

	const submitClub = event => {
		event.preventDefault();

		setAddClub(false);
		setClubName(``);
		setClubType(NO_CLUB);
	};

	const cancelAddClub = event => {
		event.preventDefault();

		setAddClub(false);
		setClubName(``);
		setClubType(NO_CLUB);
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
					bag.golfClub.map((club, index) =>
						<li key={index}>
							{index}
						</li>
					)
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
