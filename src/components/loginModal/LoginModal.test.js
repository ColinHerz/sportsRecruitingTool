/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "../../../enzyme.js";

import LoginModal from "./LoginModal.js";

const genProps = isRegistering => {
	return {
		logIn: jest.fn(),
		isRegistering: isRegistering,
		closeModal: jest.fn()
	};
};

describe(`rendering`, () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it(`renders without first and last name when logging in`, () => {
		const props = genProps(false);

		const component = renderer.create(<LoginModal {... props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it(`renders with first and last name when registering`, () => {
		const props = genProps(true);

		const component = renderer.create(<LoginModal {... props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe(`functionality`, () => {
	it(`closes when close button clicked`, () => {
		const props = genProps(false);

		const component = shallow(<LoginModal {... props} />);

		component.find(`#close`).simulate(`click`, {
			preventDefault: jest.fn()
		});

		expect(props.closeModal).toHaveBeenCalled();

		component.unmount();
	});

	it(`switches to logging on log in button clicked`, () => {
		const props = genProps(true);

		const component = shallow(<LoginModal {... props} />);

		expect(component.html()).toMatchSnapshot();

		component.find(`#login-btn`).simulate(`click`, {
			preventDefault: jest.fn()
		});

		expect(component.html()).toMatchSnapshot();

		component.unmount();
	});

	it(`switches to registering when registering clicked`, () => {
		const props = genProps(false);

		const component = shallow(<LoginModal {... props} />);

		expect(component.html()).toMatchSnapshot();

		component.find(`#register-btn`).simulate(`click`, {
			preventDefault: jest.fn()
		});

		expect(component.html()).toMatchSnapshot();

		component.unmount();
	});
});
