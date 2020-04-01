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

});
