import apiCall from "../../api/api.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import "./myEvents.scss";

const MyEvents = props => {

	const [myEvent, setmyEvent] = useState([]);
	const [updateEvent, setupdateEvent] = useState(true);
	const [showError, setShowError] = useState(false);

	const getEvents = () => {
		apiCall(
			{
				endpoint: `/golf/getMyEvents`,
				type: `GET`,
			},
			data => {
				if (data.status !== 200) {
					setShowError(true);
					return;
				}
				setmyEvent(JSON.parse(data.response));
				setupdateEvent(true);
			},
			() => {
				setShowError(true);
			}
		);
	};
	useEffect(() => {
		if (updateEvent) {
			getEvents();
		}
	}, [updateEvent]);

	return (
		<main id="my-events">
			<h2>My Events</h2>

			<button><Link to="/events/create/">Create Event</Link></button>

			<section id="in">
				<h3>Events</h3>
				<ul>
					{
					myEvent.map(events=> {
						return (
							<li key={events._id} id={events._id}>
								<Link
									to={`/event/${events._id}`}
								>
										{events.eventName}
								</Link>
							</li>
							);
						})
					}
				</ul>
			</section>
		</main>
	);
};

MyEvents.propTypes = {
	user: PropTypes.object.isRequired
};

export default MyEvents;
