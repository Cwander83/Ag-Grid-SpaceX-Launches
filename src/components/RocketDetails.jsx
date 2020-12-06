import React, { useContext, useState, useEffect } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// api
import { fetchData } from '../api/api';

const RocketDetails = () => {
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
			<h1>Rocket details</h1>
			<h6>Name: {data.name}</h6>
		</div>
	);
};

export default RocketDetails;
