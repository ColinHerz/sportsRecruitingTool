import PropTypes from "prop-types";
import React, { useState } from "react";

import "./loginModal.scss";

const SUBMIT_INFO_URL = `${window.location.host}/users/`;
const SUBMIT_INFO_REGISTERING = `register`;
const SUBMIT_INFO_LOGIN = `login`;

const submitInfo = (info, isRegistering) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		const url = `${SUBMIT_INFO_URL}${isRegistering ? SUBMIT_INFO_REGISTERING:SUBMIT_INFO_LOGIN}`;

		console.log(url);

		request.open(`POST`, url);
		request.setRequestHeader(`Content-type`, `application/json`);
		request.onload = () => resolve(JSON.parse(request.responseText));
		request.onerror = () => reject(request.statusText);
		request.send(JSON.stringify(info));
	});
};

const LoginModal = props => {
	const [isRegistering, setIsRegistering] = useState(props.isRegistering);
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);
	const [firstName, setFirstName] = useState(``);
	const [lastName, setLastName] = useState(``);

	// this will not be same as submit eventually
	const handleClose = event => {
		event.preventDefault();

		props.closeModal();
	};

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

	const handleFirstNameChange = event => {
		event.preventDefault();

		setFirstName(event.target.value);
	};

	const handleLastNameChange = event => {
		event.preventDefault();

		setLastName(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();

		const info = {
			email: email,
			password: password
		};

		if (isRegistering) {
			info.firstName = firstName;
			info.lastName = lastName;
		}

		submitInfo(info, isRegistering).then(
			data => {
				console.log(data);
			}
		).catch(
			reason => {
				console.error(reason);
			}
		);

		props.closeModal();
	};

	return (
		<div id="gray-background">
			<div id="login-modal">
				<h2>Sporta</h2>

				{ /* This will have to be improved */ }
				<button
					id="close"
					onClick={handleClose}
				>
					X
				</button>

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
					{
						isRegistering ?
							<React.Fragment>
								<label>
								First Name
									<input
										type="text"
										value={firstName}
										required
										onChange={handleFirstNameChange}
									/>
								</label>
								<label>
								Last Name
									<input
										type="text"
										value={lastName}
										required
										onChange={handleLastNameChange}
									/>
								</label>
							</React.Fragment>:
							null
					}

					<label>
						Email:
						<input
							type="text"
							value={email}
							pattern="^.+@.+\..+$"
							required
							onChange={handleEmailChange}
						/>
						{ /* matches at least on char, @, at least one char, ., at least one char in that order */ }
					</label>

					<label>
						Password:
						<input
							type="password"
							value={password}
							minLength="8"
							pattern="^(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).*$"
							required
							onChange={handlePasswordChange}
						/>
						{ /* Matches >12 chars, 1 lowercase, 1 uppercase, 1 special, 1 digit in any order */ }
					</label>

					<input
						type="submit"
						value="Submit"
						onClick={handleSubmit}
					/>
				</form>
			</div>
		</div>
	);
};

LoginModal.propTypes = {
	isRegistering: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};

export default LoginModal;
