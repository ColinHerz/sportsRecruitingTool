import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./createEvent.scss";

const CreateEvent = props => {
	const { register, handleSubmit, errors } = useForm();
	const [holeCount, setHoleCount] = useState(1);

	const updateHoleCount = event => {
		const count = parseInt(event.target.value);

		if (count > 0) {
			setHoleCount(count);
		}
		else {
			setHoleCount(1);
		}
	};

	const onSubmit = info => {

	};

	return (
		<main id="create-event">
			<h2>Create An Event</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Title
					<input
						type="text"
						name="title"
						ref={
							register({
								required: true
							})
						}
					/>
				</label>
				{errors.title && <p>An event title is required.</p>}

				<label>
					Course
					<input
						type="text"
						name="course"
						ref={
							register({
								required: true
							})
						}
					/>
				</label>
				{errors.course && <p>A course name is required.</p>}

				<label>
					Hole Count
					<input
						type="number"
						name="holeCount"
						onChange={updateHoleCount}
						value={holeCount}
						ref={
							register({
								required: true,
								min: 1
							})
						}
					/>
				</label>
				{errors.holeCount && <p>A hole count greater than 0 is required.</p>}

				<label>
					Hole Pars
				</label>

				<h3>Players</h3>

				<ul>
					<li>Player 1</li>
					<li>Player 2</li>
					<li>Player 3</li>
				</ul>

				<button>Add Players</button>

				<input type="submit" value="Create" />
			</form>
		</main>
	);
};

CreateEvent.propTypes = {
	user: PropTypes.object.isRequired
};

export default CreateEvent;
