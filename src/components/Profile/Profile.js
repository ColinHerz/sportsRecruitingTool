import React from "react";

import "./profile.scss";

const Profile = props => {
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

export default Profile;
