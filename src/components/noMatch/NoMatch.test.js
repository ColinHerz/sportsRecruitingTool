/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import NoMatch from "./NoMatch.js";

describe(`No match component`, () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it(`renders correctly`, () => {
		const props = {};

		const component = renderer.create(
			<MemoryRouter>
				<NoMatch {...props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
