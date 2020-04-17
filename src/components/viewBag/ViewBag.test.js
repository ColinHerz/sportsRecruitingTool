/* eslint-env jest */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "apiCall" }]*/

import apiCall from "../../api/api.js";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "../../../enzyme.js";

import ViewBag from "./ViewBag.js";

const genProps = () => {
	return {
		user: {
			id: `garbage`,
			email: `john.smith@yahoo.net`,
			firstname: `John`,
			lastname: `Smith`,
			isVerified: true
		}
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`Rendering`, () => {
	it(`Renders correctly`, () => {
		const props = genProps(false);

		const component = renderer.create(
			<MemoryRouter>
				<ViewBag {...props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
