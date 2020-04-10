import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import "./profile.scss";

const USER_INFO_URL = `${window.location.protocol}//${window.location.host}/api/golf/`;

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

const Profile = props => {
	const [addingBag, setAddingBag] = useState(false);
	const [newBagName, setNewBagName] = useState(``);

	const [bags, setBags] = useState([]);
	const [updatedBags, setUpdatedBags] = useState(false);

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!updatedBags) {
			const promise = buildPromise(`${USER_INFO_URL}getAllGolfBags`, `GET`, null);

			promise.then(
				data => {
					if (data.status !== 200) {
						setShowError(true);
						setBags([]);
						return;
					}

					setBags(JSON.parse(data.response));
				}
			).catch(
				() => {
					setShowError(true);
					setBags([]);
				}
			);

			setUpdatedBags(true);
		}
	}, [updatedBags]);

	const showAddingBag = event => {
		event.preventDefault();

		setAddingBag(true);
	};

	const cancelAddBag = event => {
		event.preventDefault();

		setNewBagName(``);
		setAddingBag(false);
	};

	const addBag = event => {
		event.preventDefault();

		const promise = buildPromise(`${USER_INFO_URL}createGolfBag`, `POST`, { bagName: newBagName });

		promise.then(
			data => {
				if (data.status !== 200) {
					setShowError(true);
				}

				setNewBagName(``);
				setAddingBag(false);
				setUpdatedBags(false);
			}
		).catch(
			() => {
				setShowError(true);
			}
		);
	};

	const handleBagNameChange = event => {
		event.preventDefault();

		setNewBagName(event.target.value);
	};

	return (
		<main id="profile">
			{
				showError ?
					<p id="error-message">Something went wrong. Please try again latter.</p>:
					null
			}

			<section id="login-info">
				<h2>{`${props.user.firstname} ${props.user.lastname}`}</h2>
				<p>{`${props.user.email}`}</p>
			</section>

			<section id="personal-info">
				<p><span>Height:</span> 5&apos; 10&quot;</p>
				<p><span>Weight:</span> 140 lbs</p>
				<p><span>Age:</span> 21</p>
			</section>

			<section id="bags">
				<h3>Bags</h3>

				{
					bags.map(bag => {
						return (
							<Link
								key={bag._id}
								to={`/profile/bag/${bag._id}/`}
							>
								{bag.bagName}
							</Link>
						);
					})
				}

				{
					addingBag ?
						<div id="adding-bag-dialogue">
							<label>
								Bag Name:
								<input
									type="text"
									id="bag-name"
									value={newBagName}
									onChange={handleBagNameChange}
								/>
							</label>

							<button onClick={addBag}>Add</button>
							<button onClick={cancelAddBag}>Cancel</button>
						</div>:
						null
				}

				<button
					id="add-bag"
					onClick={showAddingBag}
				>
					Add Bag
				</button>
			</section>
		</main>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default Profile;
