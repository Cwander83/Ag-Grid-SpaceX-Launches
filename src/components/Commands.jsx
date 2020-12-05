import React from 'react';

// styles
import '../assets/styles/commands.scss';

const Commands = ({ onExportClick, onPaginationChange }) => {
	return (
		<div className="root">
			<span onClick={() => onExportClick()}>
				<i className="fas fa-file-export"></i>
				Export Selected to CSV
			</span>
			<div className="select-section">
				<label htmlFor="select">Rows per Page </label>
				<select
					id="select"
					onChange={(e) => onPaginationChange(e.target.value)}
				>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</select>
			</div>
		</div>
	);
};

export default Commands;
