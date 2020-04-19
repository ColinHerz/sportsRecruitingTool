/* eslint-env jest */
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import ViewHole from "./ViewHole.js";

describe(`Rendering`, () => {
	it(`Renders beginning page correctly`, () => {
		const component = renderer.create(
			<MemoryRouter>
				<ViewHole />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
