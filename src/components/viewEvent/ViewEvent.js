import apiCall from "../../api/api.js";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import "./ViewEvent.scss";

const ViewEvent = props => {
	const { eid } = useParams();

	const [firstLoad, setFirstLoad] = useState(true);

	const [eventInfo, setEventInfo] = useState({});

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (firstLoad) {
			apiCall(
				{
					endpoint: `/golf/getEventResults/${eid}`,
					type: `GET`
				},
				data => {
					if (data.status !== 200) {
						setShowError(true);
						return;
					}

					const response = JSON.parse(data.response);
					const startDate = new Date(response.startDate);
					const endDate = new Date(response.endDate);

					response.startDate = startDate.toDateString();
					response.endDate = endDate.toDateString();

					setEventInfo(response);
				},
				() => {
					setShowError(true);
				}
			);

			setFirstLoad(false);
		}
	}, [firstLoad, eid]);

	return (
		<main id="event">
			{
				firstLoad ?
					<p>Loading event...</p>:
					<React.Fragment>
						<section id="meta-event-info">
							<h2>{eventInfo.eventName}</h2>

							<h3>{eventInfo.course}</h3>

							<p>Start Date: {eventInfo.startDate}</p>

							<p>End Date: {eventInfo.endDate}</p>
						</section>

						<Link to={`/events/${eid}/match/add/`}><button>Add a match</button></Link>

						<section id="scores">
						</section>
					</React.Fragment>
			}

		</main>
	);
};

ViewEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default ViewEvent;
