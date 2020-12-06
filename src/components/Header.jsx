import React, { memo } from 'react';

// styles
import '../assets/styles/header.scss';

const Header = () => (
	<header>
		<h1>SpaceX Launches</h1>
		<ul>
			<li>
				<div className="success" />
				<span> = Succeeded</span>
			</li>
			<li>
				<div className="failure" />
				<span> = Failed</span>
			</li>
			<li>
				<div />
				<span> = Upcoming</span>
			</li>
		</ul>
	</header>
);

export default memo(Header);
