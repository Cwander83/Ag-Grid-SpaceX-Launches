import React, { useContext, useState, useEffect } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// api
import { fetchData } from '../api/api';

// style
import '../assets/styles/details.scss';

// images
import Banner from '../assets/images/banner.jpg';

const LaunchPadDetails = () => {
	let { id, closeModal } = useContext(ModalContext);

	const [data, setData] = useState({});

	useEffect(() => {
		fetchData({ query: id.query, id: id.id }).then((results) =>
			setData(results)
		);
	}, [id]);

	return (
		<div className="container">
			<div>
				<span onClick={() => closeModal()}>
					<i className="fas fa-times-circle"></i>
					Close
				</span>
			</div>
			<img src={Banner} alt="spaceX banner" />

			<h1> {data.full_name}</h1>
			<h3>{data.name}</h3>
			<div className="row">
				<div className="col-field">
					<h4>Location: </h4>
				</div>
				<div className="col-description">
					<h4>{data.locality}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Region:</h4>
				</div>
				<div className="col-description">
					<h4>{data.region}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Timezone:</h4>
				</div>
				<div className="col-description">
					<h4>{data.timezone}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Latitude:</h4>
				</div>
				<div className="col-description">
					<h4>{data.latitude}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Longitude:</h4>
				</div>
				<div className="col-description">
					<h4>{data.longitude}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Launchpad Status:</h4>
				</div>
				<div className="col-description">
					<h4> {data.status}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Launch Attempts:</h4>
				</div>
				<div className="col-description">
					<h4>{data.launch_attempts}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Successful Launches:</h4>
				</div>
				<div className="col-description">
					<h4>{data.launch_successes}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-field">
					<h4>Details:</h4>
				</div>
				<div className="col-description">
					<h4> {data.details}</h4>
				</div>
			</div>
		</div>
	);
};

export default LaunchPadDetails;
