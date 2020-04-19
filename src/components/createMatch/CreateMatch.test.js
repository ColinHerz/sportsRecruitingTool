/* eslint-env jest */
import React from "react";
import renderer from "react-test-renderer";

import CreateMatch from "./CreateMatch.js";

describe(`Rendering`, () => {
	it(`Renders the basic page correctly`, () => {
		const component = renderer.create(<CreateMatch />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
