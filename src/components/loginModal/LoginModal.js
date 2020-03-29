import PropTypes from "prop-types";
import React, { useState } from "react";

import "./loginModal.scss";

const SUBMIT_INFO_URL = `${window.location.host}/api/users/`;
const SUBMIT_INFO_REGISTERING = `register`;
const SUBMIT_INFO_LOGIN = `login`;

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
		let url;

		if (isRegistering) {
			info.firstname = firstName;
			info.lastname = lastName;

			url = `http://${SUBMIT_INFO_URL}${SUBMIT_INFO_REGISTERING}`;
		}
		else {
			url = `http://${SUBMIT_INFO_URL}${SUBMIT_INFO_LOGIN}`;
		}

		const promise = new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();

			request.open(`POST`, url);
			request.setRequestHeader(`Content-type`, `application/json`)
			request.onload = () => resolve(JSON.parse(request.responseText));
			request.onerror = () => reject(request.statusText);
			request.send(JSON.stringify(info));
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
								First Name:
									<input
										id="first-name"
										type="text"
										value={firstName}
										required
										onChange={handleFirstNameChange}
									/>
								</label>
								<label>
								Last Name:
									<input
										id="last-name"
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
							id="email"
							type="text"
							value={email}
							required
							onChange={handleEmailChange}
						/>
						{ /* matches at least on char, @, at least one char, ., at least one char in that order
							pattern="^.+@.+\..+$"
						*/ }
					</label>

					<label>
						Password:
						<input
							type="password"
							value={password}
							required
							onChange={handlePasswordChange}
						/>
						{ /* Matches >12 chars, 1 lowercase, 1 uppercase, 1 special, 1 digit in any order
							minLength="8"
							pattern="^(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).*$"
						*/ }
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
