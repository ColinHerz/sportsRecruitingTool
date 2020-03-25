import React from "react";

import "./profile.scss"

const Profile = props => {
	return (
		<main>
			<p className="name">
				First Name Last Name
			</p>
			<p className="usern">
				Username
			</p>
			<div>
				<p className="scoreEvent">
					Top Scores
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
				</p>
			</div>
			<p className="scoreEvent">
				Past Events
				<ol>
					<li>
						Event 1
					</li>
					<li>
						Event 2
					</li>
					<li>
						Event 3
					</li>
				</ol>
			</p>
		</main>
	);
};

export default Profile;