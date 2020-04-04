/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "../../../enzyme.js";

import Hero from "./Hero.js";

const genProps = loggedIn => {
	return {
		loggingIn: jest.fn(),
		registering: jest.fn(),
		loggedIn: loggedIn
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`rendering`, () => {
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

describe(`functionality`, () => {
	it(`opens login modal for registering`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Hero {... props} />
			</MemoryRouter>
		);

		component.find(`#sign-up`).simulate(`click`);

		expect(props.registering).toHaveBeenCalled();

		component.unmount();
	});

	it(`opens login modal for logging in`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Hero {... props} />
			</MemoryRouter>
		);

		component.find(`#log-in`).simulate(`click`);

		expect(props.loggingIn).toHaveBeenCalled();

		component.unmount();
	});
});
