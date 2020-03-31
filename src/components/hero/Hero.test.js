/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import Hero from "./Hero.js";

const genProps = loggedIn => {
	return {
		logIn: jest.fn(),
		register: jest.fn(),
		loggedIn: loggedIn
	};
};

describe(`Hero component`, () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it(`renders correctly when not logged in`, () => {
		const props = genProps(false);

		const component = renderer.create(
			<MemoryRouter>
				<Hero {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it(`renders correctly when logged in`, () => {
		const props = genProps(true);

		const component = renderer.create(
			<MemoryRouter>
				<Hero {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
