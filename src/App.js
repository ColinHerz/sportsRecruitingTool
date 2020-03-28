import React from "react";
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

const App = props => {
	return (
		<Router>
			<Header />

			<LoginModal isRegistering={true} />

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
					<Hero />
				</Route>
			</Switch>

			<Footer />
		</Router>
	);
};

export default App;
