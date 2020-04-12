/* eslint-env jest */

import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import Verify from "./Verify.js";

const genProps = () => {
	return {};
};

describe(`Rendering`, () => {
	it(`Renders correctly to start`, () => {
		const props = genProps();

		const component = renderer.create(
			<MemoryRouter>
				<Verify {...props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
