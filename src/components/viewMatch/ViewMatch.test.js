/* eslint-env jest */
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import ViewMatch from "./ViewMatch.js";

const genProps = () => {
	return {
		user: {}
	};
};

describe(`Rendering`, () => {
	it(`Renders beginning page correctly`, () => {
		const props = genProps();

		const component = renderer.create(
			<MemoryRouter>
				<ViewMatch {...props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
