import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import Hero from "./components/hero/Hero.js";
import Profile from "./components/profile/Profile.js";

const App = props => {
	return (
		<Router>
			<Header />

			<Switch>
				<Route path="/profile/:id/">
					<Profile />
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
