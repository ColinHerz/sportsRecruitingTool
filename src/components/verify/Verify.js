import apiCall from "../../api/api.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./verify.scss";

const Verify = props => {
	const { token } = useParams();

	const [firstLoad, setFirstLoad] = useState(true);
	const [verified, setVerified] = useState(false);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (firstLoad) {
			apiCall(
				{
					endpoint: `/users/verify/${token}`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					setVerified(true);
				},
				() => {
					setShowError(true);
				}
			);

			setFirstLoad(false);
		}
	}, [firstLoad]);

	return (
		<main id="verify">
			<h2>Email Verification</h2>

			{
				verified ?
					<p>Your email has been verified.</p>:
					<p>Verifying your email...</p>
			}

			{
				showError ?
					<p id="error">Something went wrong. Please try again later.</p>:
					null
			}
		</main>
	);
};

export default Verify;
