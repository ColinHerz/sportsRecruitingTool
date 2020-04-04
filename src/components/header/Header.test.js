/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import { mount } from "../../../enzyme.js";
import React from "react";
import renderer from "react-test-renderer";

import Header from "./Header.js";

const genProps = loggedIn => {
	return {
		loggingIn: jest.fn(),
		registering: jest.fn(),
		loggedIn: loggedIn,
		logOut: jest.fn()
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`Rendering`, () => {
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

describe(`Functionality`, () => {
	it(`calls logging in when log in button clicked`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Header {... props} />
			</MemoryRouter>
		);

		component.find(`#log-in`).simulate(`click`);

		expect(props.loggingIn).toHaveBeenCalled();

		component.unmount();
	});

	it(`calls registering in when register button clicked`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Header {... props} />
			</MemoryRouter>
		);

		component.find(`#sign-up`).simulate(`click`);

		expect(props.registering).toHaveBeenCalled();

		component.unmount();
	});
});
