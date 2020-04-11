import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import "./profile.scss";

const Profile = props => {
	const [addingBag, setAddingBag] = useState(false);
	const [newBagName, setNewBagName] = useState(``);

	const [bags, setBags] = useState([]);
	const [updatedBags, setUpdatedBags] = useState(false);

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!updatedBags) {
			apiCall(
				{
					endpoint: `/golf/getAllGolfBags`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						setBags([]);
						return;
					}

					setBags(JSON.parse(data.response));
				},
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

		apiCall(
			{
				endpoint: `/golf/createGolfBag`,
				type: `POST`,
				body: {
					bagName: newBagName
				}
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
				}

				setNewBagName(``);
				setAddingBag(false);
				setUpdatedBags(false);
			},
			() => {
				setShowError(true);
			}
		);
	};

	const deleteBag = event => {
		event.preventDefault();

		const id = event.target.parentElement.id;

		apiCall(
			{
				endpoint: `/golf/deleteGolfBag`,
				type: `POST`,
				body: {
					golfBag: id
				}
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
				}

				setUpdatedBags(false);
			},
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

				<ul>
					{
						bags.map(bag => {
							return (
								<li key={bag._id} id={bag._id}>
									<Link
										to={`/profile/bag/${bag._id}/`}
									>
										{bag.bagName}
									</Link>

									<button onClick={deleteBag}>Delete</button>
								</li>
							);
						})
					}
				</ul>

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
