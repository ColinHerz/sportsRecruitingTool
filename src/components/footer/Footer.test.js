/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import { mount } from "../../../enzyme.js";
import React from "react";
import renderer from "react-test-renderer";

import Footer from "./Footer.js";

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
				<Footer {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it(`renders correctly when logged in`, () => {
		const props = genProps(true);

		const component = renderer.create(
			<MemoryRouter>
				<Footer {... props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe(`Functionality`, () => {
	it(`calls log in when log in button clicked`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Footer {... props} />
			</MemoryRouter>
		);

		component.find(`#log-in`).simulate(`click`);

		expect(props.loggingIn).toHaveBeenCalled();

		component.unmount();
	});

	it(`calls registering when register button clicked`, () => {
		const props = genProps(false);

		const component = mount(
			<MemoryRouter>
				<Footer {... props} />
			</MemoryRouter>
		);

		component.find(`#sign-up`).simulate(`click`);

		expect(props.registering).toHaveBeenCalled();

		component.unmount();
	});

	it(`calls log out when log out button clicked`, () => {
		const props = genProps(true);

		const component = mount(
			<MemoryRouter>
				<Footer {... props} />
			</MemoryRouter>
		);

		component.find(`button`).simulate(`click`);

		expect(props.logOut).toHaveBeenCalled();

		component.unmount();
	});
});
