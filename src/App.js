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
import Profile from "./components/profile/Profile.js";
import TopScores from "./components/topScores/TopScores.js";
import ViewEvent from "./components/viewEvent/ViewEvent.js";

import "./reset.scss";

const App = props => {
	const [showModal, setShowModal] = useState(false);
	const [clickedRegister, setClickedRegister] = useState(false);

	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);

	const logIn = event => {
		event.preventDefault();

		setShowModal(true);
		setClickedRegister(false);
	};

	const register = event => {
		event.preventDefault();

		setShowModal(true);
		setClickedRegister(true);
	};

	const logOut = event => {
		event.preventDefault();

		setUser(null);
		setLoggedIn(false);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<Router>
			<Header
				logIn={logIn}
				logOut={logOut}
				register={register}
				loggedIn={loggedIn}
			/>

			{
				showModal ?
					<LoginModal
						isRegistering={clickedRegister}
						closeModal={closeModal}
					/>:
					null
			}

			<Switch>
				<Route exact path="/">
					<Hero
						logIn={logIn}
						register={register}
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
			</Switch>

			<Footer
				logIn={logIn}
				logOut={logOut}
				register={register}
				loggedIn={loggedIn}
			/>
		</Router>
	);
};

export default App;
