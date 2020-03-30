import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./loginModal.scss";

const SUBMIT_INFO_URL = `${window.location.host}/api/users/`;
const SUBMIT_INFO_REGISTERING = `register`;
const SUBMIT_INFO_LOGIN = `login`;

const buildPromise = (url, body) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(`POST`, url);
		request.setRequestHeader(`Content-type`, `application/json`);
		request.onload = () => resolve(request);
		request.onerror = () => reject(request);
		request.send(JSON.stringify(body));
	});
};

const LoginModal = props => {
	const [isRegistering, setIsRegistering] = useState(props.isRegistering);
	const [isError, setIsError] = useState(false);

	const { register, handleSubmit, errors } = useForm();

	const [errorText, setErrorText] = useState(``);

	// this will not be same as submit eventually
	const handleClose = event => {
		event.preventDefault();

		props.closeModal();
	};

	const registering = event => {
		event.preventDefault();

		setIsError(false);
		setIsRegistering(true);
	};

	const loggingIn = event => {
		event.preventDefault();

		setIsError(false);
		setIsRegistering(false);
	};

	const onSubmit = info => {
		setIsError(false);

		const promise = buildPromise(buildURL(), info);

		promise.then(
			data => {
				console.log(data);

				if (data.warning != undefined) {
					setIsError(true);
					setErrorText(data.warning);
					return;
				}

				props.closeModal();
			}
		).catch(
			reason => {
				console.error(reason);
				setIsError(true);
				setErrorText(reason.warning);
			}
		);
	};

	const buildURL = () => {
		let url = `http://${SUBMIT_INFO_URL}${SUBMIT_INFO_LOGIN}`;

		if (isRegistering) {
			url = `http://${SUBMIT_INFO_URL}${SUBMIT_INFO_REGISTERING}`;
		}

		return url;
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

				<form onSubmit={handleSubmit(onSubmit)}>
					{
						/* First and last name names have to be all lowercase for api */
						isRegistering ?
							<React.Fragment>
								<label>
								First Name:
									<input
										id="first-name"
										name="firstname"
										type="text"
										ref={
											register({
												required: true
											})
										}
									/>
								</label>
								{errors.firstname && <p className="error">First name is required.</p>}

								<label>
								Last Name:
									<input
										id="last-name"
										name="lastname"
										type="text"
										ref={
											register({
												required: true
											})
										}
									/>
								</label>
								{errors.lastname && <p className="error">Last name is required.</p>}
							</React.Fragment>:
							null
					}

					<label>
						Email:
						<input
							id="email"
							name="email"
							type="text"
							ref={
								register({
									required: true,
									pattern: /^.+@.+\..+$/
								})
							}
						/>
						{ /* matches at least on char, @, at least one char, ., at least one char in that order
							pattern="^.+@.+\..+$"
						*/ }
					</label>
					{errors.email && <p className="error">Please enter a valid email address.</p>}

					<label>
						Password:
						<input
							name="password"
							type="password"
							ref={
								register({
									required: true,
									minlength: 6,
									pattern: /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).*$/
								})
							}
						/>
						{ /* Matches >6 chars, 1 lowercase, 1 uppercase, 1 special, 1 digit in any order
							minLength="6"
							pattern="^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).*$"
						*/ }
					</label>
					{errors.password && <p className="error">Passwords must be at least 6 characters and contain 1 lowercase, 1 uppercase, 1 special character, and 1 number.</p>}

					<input type="submit" value="Submit" />
				</form>

				{
					isError ?
						<p id="submission-error">Error: {errorText}</p>:
						null
				}
			</div>
		</div>
	);
};

LoginModal.propTypes = {
	isRegistering: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};

export default LoginModal;
