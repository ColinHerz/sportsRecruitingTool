import apiCall from "./api/api.js";
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import CreateMatch from "./components/createMatch/CreateMatch.js";
import CreateEvent from "./components/createEvent/CreateEvent.js";
import EditEvent from "./components/editEvent/EditEvent.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import Hero from "./components/hero/Hero.js";
import LoginModal from "./components/loginModal/LoginModal.js";
import MyEvents from "./components/myEvents/MyEvents.js";
import NoMatch from "./components/noMatch/NoMatch.js";
import Profile from "./components/profile/Profile.js";
import Verify from "./components/verify/Verify.js";
import ViewBag from "./components/viewBag/ViewBag.js";
import ViewEvent from "./components/viewEvent/ViewEvent.js";
import ViewMatch from "./components/viewMatch/ViewMatch.js";

import "./reset.scss";

const fixCapitalization = user => {
	const newUser = Object.assign({}, user);

	let firstname = newUser.firstname;
	firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);

	let lastname = newUser.lastname;
	lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);

	newUser.firstname = firstname;
	newUser.lastname = lastname;

	return newUser;
};

const App = props => {
	const [showModal, setShowModal] = useState(false);
	const [clickedRegister, setClickedRegister] = useState(false);

	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		if (initialLoad && !loggedIn) {
			apiCall(
				{
					endpoint: `/users/get`,
					type: `GET`
				},
				data => {
					if (data.status === 200) {
						const userData = fixCapitalization(JSON.parse(data.response));

						setUser(userData);
						setLoggedIn(true);
					}
				},
				() => {
					return;
				}
			);

			setInitialLoad(false);
		}
	}, [initialLoad, loggedIn]);

	const loggingIn = event => {
		event.preventDefault();

		setShowModal(true);
		setClickedRegister(false);
	};

	const registering = event => {
		event.preventDefault();

		setShowModal(true);
		setClickedRegister(true);
	};

	const logIn = () => {
		apiCall(
			{
				endpoint: `/users/get`,
				type: `GET`
			},
			data => {
				if (data.status !== 200) {
					console.error(JSON.parse(data.response).warning);
					return;
				}

				const userData = fixCapitalization(JSON.parse(data.response));

				setUser(userData);
				setLoggedIn(true);
			},
			reason => {
				console.error(reason.warning);
			}
		);
	};

	const logOut = event => {
		event.preventDefault();

		setUser({});
		setLoggedIn(false);

		apiCall(
			{
				endpoint: `/users/logout`,
				type: `GET`
			},
			() => {
				return;
			},
			() => {
				return;
			}
		);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<Router>
			<Header
				loggingIn={loggingIn}
				logOut={logOut}
				registering={registering}
				loggedIn={loggedIn}
			/>

			{
				showModal ?
					<LoginModal
						logIn={logIn}
						isRegistering={clickedRegister}
						closeModal={closeModal}
					/>:
					null
			}

			<Switch>
				<Route exact path="/">
					<Hero
						loggingIn={loggingIn}
						registering={registering}
						loggedIn={loggedIn}
					/>
				</Route>

				<Route path="/events/:eid/edit/">
					{
						loggedIn ?
							<EditEvent />:
							<Redirect to="/" />
					}
				</Route>

				<Route path="/events/create/">
					{
						loggedIn ?
							<CreateEvent />:
							<Redirect to="/" />

					}
				</Route>

				<Route path="/events/:eid/">
					<ViewEvent />
				</Route>

				<Route path="/profile/bag/:bid/">
					{
						loggedIn ?
							<ViewBag />:
							<Redirect to="/" />
					}
				</Route>

				<Route path="/verify/:token">
					<Verify />
				</Route>

				<Route path="/profile/">
					{
						loggedIn ?
							<Profile
								user={user}
							/>:
							<Redirect to="/" />
					}
				</Route>

				<Route path="/events/">
					{
						loggedIn ?
							<MyEvents />:
							<Redirect to="/" />
					}
				</Route>

				<Route exact path="/match/add/">
					<CreateMatch />
				</Route>

				<Route path="/match/:mid/">
					<ViewMatch />
				</Route>

				<Route>
					<NoMatch />
				</Route>
			</Switch>

			<Footer
				loggingIn={loggingIn}
				logOut={logOut}
				registering={registering}
				loggedIn={loggedIn}
			/>
		</Router>
	);
};

export default App;
