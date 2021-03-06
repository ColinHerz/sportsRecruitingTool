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
		<main id="view-event">
			{
				firstLoad ?
					<p>Loading event...</p>:
					<React.Fragment>
						<section id="meta-event-info">
							<h2>{eventInfo.eventName}</h2>

							{
								showError ?
									<p id="error-message">Something went wrong. Please try again later.</p>:
									null
							}

							<h3>{eventInfo.course}</h3>

							<p><span className="bolder">Start Date:</span> {eventInfo.startDate}</p>

							<p><span className="bolder">End Date:</span> {eventInfo.endDate}</p>
						</section>

						<Link id="profile-link" to="/profile/">Add a match from your profile.</Link>

						<section id="scores">
							<h4>Scores</h4>

							<ol>
								{
									eventInfo.results !== undefined ?
										eventInfo.results.map((result, index) => {
											return (
												<li key={`${result.user}-${index}`}>
													<span className="bolder">{result.user}:</span> {result.total}
												</li>
											);
										}):
										null
								}
							</ol>
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
