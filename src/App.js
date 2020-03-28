import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import Event from "./components/event/Event.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import Hero from "./components/hero/Hero.js";
import LoginModal from "./components/loginModal/LoginModal.js";
import Profile from "./components/profile/Profile.js";
import TopScores from "./components/topScores/TopScores.js";

import "./reset.scss";

const App = props => {
	const [showModal, setShowModal] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);

	const logIn = event => {
		event.preventDefault();

		setShowModal(true);
		setIsRegistering(false);
	};

	const register = event => {
		event.preventDefault();

		setShowModal(true);
		setIsRegistering(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<Router>
			<Header
				logIn={logIn}
				register={register}
				loggedIn={false}
			/>

			{
				showModal ?
					<LoginModal
						isRegistering={isRegistering}
						closeModal={closeModal}
					/>:
					null
			}

			<Switch>
				<Route path="/profile/:id/">
					<Profile />
				</Route>

				<Route path="/event/:id/">
					<Event />
				</Route>

				<Route path="/topScores/">
					<TopScores />
				</Route>

				<Route path="/">
					<Hero
						logIn={logIn}
						register={register}
					/>
				</Route>
			</Switch>

			<Footer
				logIn={logIn}
				register={register}
				loggedIn={false}
			/>
		</Router>
	);
};

export default App;
