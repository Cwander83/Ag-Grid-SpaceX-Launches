import React, { useContext, useState, useEffect } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// api
import { fetchData } from '../api/api';

const LaunchPadDetails = () => {
	let { id, closeModal } = useContext(ModalContext);

	const [data, setData] = useState({});

	useEffect(() => {
		fetchData({ query: id.query, id: id.id }).then((results) =>
			setData(results)
		);
	}, [id]);

	console.log(JSON.stringify(data, null, 2));

	return (
		<div>
			<button onClick={() => closeModal()}>close</button>
			<h1>launchpad details</h1>
			<h6>Name: {data.name}</h6>
			<h6>Full Name: {data.full_name}</h6>
			<h6>Location: {data.locality}</h6>
			<h6>Region: {data.region}</h6>
			<h6>timezone: {data.timezone}</h6>
			<h6>Latitude: {data.latitude}</h6>
			<h6>Longitude: {data.longitude}</h6>
			<h6>Launchpad Status: {data.status}</h6>
			<h6>
				Launch Attempts:
				{data.launch_attempts}
			</h6>
			<h6>Successful Launches: {data.launch_successes}</h6>
			<h6>Details: {data.details}</h6>
		</div>
	);
};

export default LaunchPadDetails;
