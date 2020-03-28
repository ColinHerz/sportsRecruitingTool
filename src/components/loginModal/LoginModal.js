import PropTypes from "prop-types";
import React, { useState } from "react";

import "./loginModal.scss";

const LoginModal = props => {
	const [isRegistering, setIsRegistering] = useState(props.isRegistering);
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);

	const registering = event => {
		event.preventDefault();
		setIsRegistering(true);
	};

	const loggingIn = event => {
		event.preventDefault();
		setIsRegistering(false);
	};

	const handleEmailChange = event => {
		event.preventDefault();

		setEmail(event.target.value);
	};

	const handlePasswordChange = event => {
		event.preventDefault();

		setPassword(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	return (
		<div id="gray-background">
			<div id="login-modal">
				<h2>Sporta</h2>

				<div id="btn-sec">
					<button
						id="login-btn"
						onClick={loggingIn}
						className={!isRegistering ? `selected`:``}
					>
						Log In
					</button>

					<button
						id="register-btn"
						onClick={registering}
						className={isRegistering ? `selected`:``}
					>
						Register
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<label>
						Email:
						<input
							type="text"
							value={email}
							onChange={handleEmailChange}
						/>
					</label>

					<label>
						Password:
						<input
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</label>

					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
	);
};

LoginModal.propTypes = {
	isRegistering: PropTypes.bool
};

export default LoginModal;
