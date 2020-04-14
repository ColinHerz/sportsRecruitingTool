/* eslint-env jest */

// MemoryRouter needed because header contains NavLinks, which need to
// be rendered within a Router
import { MemoryRouter } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";

import EditEvent from "./EditEvent.js";

const genProps = () => {
	return {
		user: {}
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`Rendering`, () => {
	it(`renders correctly`, () => {
		const props = genProps();

		const component = renderer.create(
			<MemoryRouter>
				<EditEvent {...props} />
			</MemoryRouter>
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
