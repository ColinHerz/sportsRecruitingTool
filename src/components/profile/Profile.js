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
			request.setRequestHeader(`Content-Type`, `application/json`);
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

	useEffect(() => {
		if (!updatedBags) {
			console.log(`update bags`);
			const promise = buildPromise(`${USER_INFO_URL}getAllGolfBags`, `GET`, null);

			promise.then(
				data => {
					if (data.status !== 200) {
						console.error(`status`);
						console.error(JSON.parse(data.response));
						setBags([]);
						return;
					}

					console.log(data);
					setBags(JSON.parse(data.response));
				}
			).catch(
				reason => {
					console.error(`catch`);
					console.error(reason);
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

		console.log(`add bag`);
		promise.then(
			data => {
				console.log(data);

				if (data.status !== 200) {
					console.error(`status`);
					console.error(JSON.stringify(data.response).warning);
				}

				setNewBagName(``);
				setAddingBag(false);
				setUpdatedBags(false);
			}
		).catch(
			reason => {
				console.error(`catch`);
				console.error(reason.warning);
			}
		);
	};

	const handleBagNameChange = event => {
		event.preventDefault();

		setNewBagName(event.target.value);
	};

	return (
		<main id="profile">
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
					bags.map((bag, index) => {
						console.log(bag);
						return (
							<div
								key={bag._id}
								id={`bag-${index}`}
							>
								<Link to={`/profile/bag/edit/${bag._id}`}>{bag.bagName}</Link>
							</div>
						);
					})
				}

				<button
					id="add-bag"
					onClick={showAddingBag}
				>
					Add Bag
				</button>

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
			</section>
		</main>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default Profile;
