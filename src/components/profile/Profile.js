import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import "./profile.scss";

const USER_INFO_URL = `${window.location.protocol}//${window.location.host}/api/golf/getAllGolfBags`;

const buildPromise = () => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(`GET`, USER_INFO_URL);
		request.onload = () => resolve(request);
		request.onerror = () => reject(request);
		request.send();
	});
};

const Profile = props => {
	const bags = useState(null);

	useEffect(() => {
		if (bags === null) {
			const promise = buildPromise();

			promise.then(
				data => {
					if (data.status !== 200) {
						console.error(`status`);
						console.error(data);
						return;
					}

					console.log(data);
				}
			).catch(
				reason => {
					console.error(`catch`);
					console.error(reason);
				}
			);
		}
	});

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
		</main>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default Profile;
