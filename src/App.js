import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import CreateEvent from "./components/createEvent/CreateEvent.js";
import EditEvent from "./components/editEvent/EditEvent.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import Hero from "./components/hero/Hero.js";
import LoginModal from "./components/loginModal/LoginModal.js";
import MyEvents from "./components/myEvents/MyEvents.js";
import NoMatch from "./components/noMatch/NoMatch.js";
import Profile from "./components/profile/Profile.js";
import TopScores from "./components/topScores/TopScores.js";
import ViewEvent from "./components/viewEvent/ViewEvent.js";

import "./reset.scss";

const SUBMIT_INFO_URL = `${window.location.protocol}//${window.location.host}/api/users/get`;

const buildPromise = () => {
	console.log(SUBMIT_INFO_URL);
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(`GET`, SUBMIT_INFO_URL);
		request.onload = () => resolve(request);
		request.onerror = () => reject(JSON.parse(request.response));
		request.send();
	});
};

const App = props => {
	const [showModal, setShowModal] = useState(false);
	const [clickedRegister, setClickedRegister] = useState(false);

	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

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
		const promise = buildPromise();

		promise.then(
			data => {
				if (data.status !== 200) {
					console.error(JSON.parse(data.response).warning);
					return;
				}

				console.log(JSON.parse(data.response));
				setUser(JSON.parse(data.response));
				setLoggedIn(true);
			}
		).catch(
			reason => {
				console.error(reason.warning);
			}
		);
	};

	const logOut = event => {
		event.preventDefault();

		setUser({});
		setLoggedIn(false);
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

				<Route path="/MyEvents/create/">
					<CreateEvent
						user={user}
					/>
				</Route>

				<Route path="/event/edit/:eid/">
					<EditEvent
						user={user}
					/>
				</Route>

				<Route path="/event/:eid/">
					<ViewEvent
						user={user}
					/>
				</Route>

				<Route path="/profile/:uid/">
					<Profile
						user={user}
					/>
				</Route>

				<Route path="/MyEvents/">
					<MyEvents
						user={user}
					/>
				</Route>

				<Route path="/TopScores/">
					<TopScores />
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
