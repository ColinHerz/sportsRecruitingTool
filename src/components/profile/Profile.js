import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./profile.scss";

const USER_INFO_URL = `${window.location.host}/api/users/detail/get`;

const buildPromise = body => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(`GET`, USER_INFO_URL);
		request.setRequestHeader(`Content-type`, `application/json`);
		request.onload = () => resolve(request);
		request.onerror = () => reject(request);
		request.send(JSON.stringify(body));
	});
};

const Profile = props => {
	const { uid } = useParams();

	const promise = buildPromise({
		id: uid
	});

	promise.then(
		data => {
			console.log(data);
		}
	).catch(
		reason => {
			console.error(reason);
		}
	);

	return (
		<main id="profile">
			<section id="login-info">
				<h2>First Name Last Name</h2>
				<p>Username</p>
			</section>

			<section id="personal-info">
				<p><span>Gender:</span> Male</p>
				<p><span>Height:</span> 5&apos; 10&quot;</p>
				<p><span>Weight:</span> 140 lbs</p>
				<p><span>Age:</span> 21</p>
			</section>

			<section id="top-scores" className="stats">
				<h3>Top Scores</h3>
				<ol>
					<li>
						Score 1
					</li>
					<li>
						Score 2
					</li>
					<li>
						Score 3
					</li>
				</ol>
			</section>

			<section id="past-events" className="stats">
				<h3>Past Events</h3>
				<ul>
					<li>
						Event 1
					</li>
					<li>
						Event 2
					</li>
					<li>
						Event 3
					</li>
				</ul>
			</section>
		</main>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default Profile;
