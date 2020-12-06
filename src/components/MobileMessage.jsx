import React, { memo } from 'react';

import '../assets/styles/mobile-message.scss';

const mobileMessage = () => (
	<div className="message">
		<h4>Sorry, only desktop support at the moment.</h4>
	</div>
);

export default memo(mobileMessage);
