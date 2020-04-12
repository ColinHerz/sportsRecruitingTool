import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";

const AddMatch = props => {
	const { eid } = useParams();

	return (
		<main>
		</main>
	);
};

AddMatch.propTypes = {
	user: PropTypes.object.isRequired
};

export default AddMatch;
