/* eslint-env jest */
import React from "react";
import renderer from "react-test-renderer";

import CreateEvent from "./CreateEvent.js";

const genProps = () => {
	return {
		user: {}
	};
};

beforeEach(() => {
	jest.resetModules();
});

describe(`Rendering`, () => {
	it(`Renders beginning page correctly`, () => {
		const props = genProps();

		const component = renderer.create(<CreateEvent {... props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
