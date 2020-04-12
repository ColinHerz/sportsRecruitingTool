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

	const [firstLoad, setFirstLoad] = useState(true);
	useEffect(() => {
		if (firstLoad) {
			userInfo();
			setFirstLoad(false);
		}
	}, [firstLoad]);

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

	const [userData, setUserData] = useState({});
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
	}
	const updateAge = event => {
		event.preventDefault();
		const data = Object.assign({},updateUserData);
		data.age = parseInt(event.target.value);
		if (isNaN(data.age))
			return;
		setupdatedUserData(data);
	};

	const updateWeight = event => {
		event.preventDefault();
		const data = Object.assign({},updateUserData);
		data.weight = parseInt(event.target.value);
		if (isNaN(data.weight))
			return;
		setupdatedUserData(data);
	};

	const updateHeight = event => {
		event.preventDefault();
		const data = Object.assign({},updateUserData);
		data.height = parseInt(event.target.value);
		if (isNaN(data.height))
			return;
		setupdatedUserData(data);
	};

	const [updateUserData, setupdatedUserData] = useState({});
	const [updatedInfo, setUpdatedInfo] = useState(false);

	const updateUserInfo = () => {

		apiCall(
			{
				endpoint: `/users/detail/update`,
				type: `POST`,
				body: updateUserData
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					console.log(data);
					return;
				}
				setFirstLoad(true);
				
			},
			param => {
				console.log(param);
				setShowError(true);
			}
		)
	}
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
	const cancelUpdateInfo = event => {
		event.preventDefault();
		setUpdatedInfo(false);
	}
	const showEditProfile = event => {
		event.preventDefault();
		setUpdatedInfo(true);
	}
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
				{	updatedInfo ?
					<div className="info">
					<label className="userDetails">
						Height:
						<input
							type="text"
							value={updateUserData.height}
							onChange={updateHeight}
						/>
					</label>
					<br/>
					<label className="userDetails">
						Weight:
						<input
							type="text"
							value={updateUserData.weight}
							onChange={updateWeight}
						/>
					</label>
					<br/>
					<label className="userDetails">
						Age:
						<input
							type="text"
							value={updateUserData.age}
							onChange={updateAge}
						/>
					</label>
					<br/>

					<button onClick={updateUserInfo}>Change</button>
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
