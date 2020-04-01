import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

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

	const logIn = user => {
		setLoggedIn(true);
		setUser(user);
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

				<Route path="/myevents/:uid/">
					<MyEvents
						user={user}
					/>
				</Route>

				<Route path="/topScores/">
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
