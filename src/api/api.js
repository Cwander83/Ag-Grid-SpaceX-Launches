// axios
import axios from 'axios';

// GET call to spacex api query is for query endpoint and 
// id for a specific object 
export const fetchData = async ({ query, id }) => {
	// setting url for with or without id
	const url = id
		? `https://api.spacexdata.com/v4/${query}/${id}`
		: `https://api.spacexdata.com/v4/${query}`;

	try {
		const result = await axios(url);

		return result.data;
	} catch (err) {
		console.error('Grid component: ' + err);
	}
};
