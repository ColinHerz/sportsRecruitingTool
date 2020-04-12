import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import "./profile.scss";

const Profile = props => {
	const [addingBag, setAddingBag] = useState(false);
	const [newBagName, setNewBagName] = useState(``);

	const [bags, setBags] = useState([]);
	const [updateBags, setUpdateBags] = useState(false);

	const [updateUser, setUpdateUser] = useState(true);
	const [userData, setUserData] = useState({});
	const [newUserData, setNewUserData] = useState({});
	const [updatingUserData, setUpdatingUserData] = useState(false);

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (updateBags) {
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

			setUpdateBags(false);
		}
	}, [updateBags]);

	useEffect(() => {
		if (updateUser) {
			userInfo();
			setUpdateUser(false);
		}
	}, [updateUser]);

	// API call methods

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
				setUpdateBags(true);
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

				setUpdateBags(true);
			},
			() => {
				setShowError(true);
			}
		);
	};

	const userInfo = () => {
		apiCall(
			{
				endpoint: `/users/detail/get`,
				type: `GET`,
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}
				setUserData(JSON.parse(data.response));
			},
			() => {
				setShowError(true);
			}
		)
	};

	const sendUserData = () => {
		apiCall(
			{
				endpoint: `/users/detail/update`,
				type: `POST`,
				body: newUserData
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}

				setUpdateUser(true);
			},
			() => {
				setShowError(true);
			}
		)
	};

	// Info handling and transformation functions

	const showEditProfile = event => {
		event.preventDefault();

		setUpdatingUserData(true);
	};

	const updateAge = event => {
		event.preventDefault();

		const data = Object.assign({},newUserData);
		data.age = parseInt(event.target.value);

		if (isNaN(data.age)) {
			return;
		}

		setNewUserData(data);
	};

	const updateWeight = event => {
		event.preventDefault();

		const data = Object.assign({},newUserData);
		data.weight = parseInt(event.target.value);

		if (isNaN(data.weight)) {
			return;
		}

		setNewUserData(data);
	};

	const updateHeight = event => {
		event.preventDefault();

		const data = Object.assign({},newUserData);
		data.height = parseInt(event.target.value);

		if (isNaN(data.height)) {
			return;
		}

		setNewUserData(data);
	};

	const cancelUpdateInfo = event => {
		event.preventDefault();

		setUpdatingUserData(false);
	};

	const showAddingBag = event => {
		event.preventDefault();

		setAddingBag(true);
	};

	const cancelAddBag = event => {
		event.preventDefault();

		setNewBagName(``);
		setAddingBag(false);
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
				<p><span>Height: </span> {`${userData.height}`}</p>
				<p><span>Weight: </span>{`${userData.weight}`} lbs</p>
				<p><span>Age: </span>{`${userData.age}`}</p>
				<div><button onClick={showEditProfile}>Edit Profile</button></div>
				{
					updatingUserData ?
						<div className="info">
							<label className="userDetails">
								Height:
								<input
									type="text"
									value={newUserData.height}
									onChange={updateHeight}
								/>
							</label>

							<label className="userDetails">
								Weight:
								<input
									type="text"
									value={newUserData.weight}
									onChange={updateWeight}
								/>
							</label>

							<label className="userDetails">
								Age:
								<input
									type="text"
									value={newUserData.age}
									onChange={updateAge}
								/>
							</label>

							<button onClick={sendUserData}>Change</button>
							<button onClick={cancelUpdateInfo}>Cancel</button>
						</div>:
						null
				}
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
