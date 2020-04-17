/* eslint-env jest */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "apiCall" }]*/

import apiCall from "../../api/api.js";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "../../../enzyme.js";

import Profile from "./Profile.js";

const genProps = isVerified => {
	return {
		user: {
			id: `garbage`,
			email: `john.smith@yahoo.net`,
			firstname: `John`,
			lastname: `Smith`,
			isVerified: isVerified
		}
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`Rendering`, () => {
	it(`Renders correctly when not verified`, () => {
		const props = genProps(false);

		const component = renderer.create(<Profile {...props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it(`Renders correctly when verified`, () => {
		const props = genProps(true);

		const component = renderer.create(<Profile {...props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
