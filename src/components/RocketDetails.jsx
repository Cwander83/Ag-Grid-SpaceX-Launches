import React, { useContext, useState, useEffect } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// api
import { fetchData } from '../api/api';

// style
import '../assets/styles/details.scss';

// images
import Banner from '../assets/images/banner.jpg';

const RocketDetails = () => {
	let { id, closeModal } = useContext(ModalContext);

	const [data, setData] = useState({});

	useEffect(() => {
		fetchData({ query: id.query, id: id.id }).then((results) =>
			setData(results)
		);
	}, [id]);

	return (
		data && (
			<div className="container">
				<div>
					<span onClick={() => closeModal()}>
						<i className="fas fa-times-circle"></i>
						Close
					</span>
				</div>
				<img src={Banner} alt="spaceX banner" />

				<h1> {data.name}</h1>

				<div className="row">
					<div className="col-field">
						<h4>Numbers of Stages: </h4>
					</div>
					<div className="col-description">
						<h4>{data.stages}</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-field">
						<h4>First Flight:</h4>
					</div>
					<div className="col-description">
						<h4>{data.first_flight}</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-field">
						<h4>Success Rate Percent:</h4>
					</div>
					<div className="col-description">
						<h4>{data.success_rate_pct} %</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-field">
						<h4>Country:</h4>
					</div>
					<div className="col-description">
						<h4> {data.country}</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-field">
						<h4>Description:</h4>
					</div>
					<div className="col-description">
						<h4> {data.description}</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-field">
						<h4>Wikipedia:</h4>
					</div>
					<div className="col-description">
						<h4>
							<a href={data.wikipedia}>{data.wikipedia}</a>
						</h4>
					</div>
				</div>
			</div>
		)
	);
};

export default RocketDetails;
