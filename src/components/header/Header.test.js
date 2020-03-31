/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import Header from "./Header.js";

const genProps = loggedIn => {
	return {
		logIn: jest.fn(),
		register: jest.fn(),
		loggedIn: loggedIn,
		logOut: jest.fn()
	};
};

describe(`Header component`, () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it(`renders correctly when not logged in`, () => {
		const props = genProps(false);

		const component = renderer.create(
			<MemoryRouter>
				<Header {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it(`renders correctly when logged in`, () => {
		const props = genProps(true);

		const component = renderer.create(
			<MemoryRouter>
				<Header {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
