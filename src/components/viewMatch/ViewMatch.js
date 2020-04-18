import React from "react";
import { useParams } from "react-router-dom";

import "viewMatch.scss";

const ViewMatch = props => {
	const { mid } = useParams;

	return (
		<main id="view-match">
		</main>
	);
};

export default ViewMatch;
