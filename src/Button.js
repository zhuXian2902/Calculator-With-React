/** @format */

import React from 'react';

const Button = (props) => {
	return (
		<button onClick={(e) => props.addExp(e, props.btnValue)} className="btn">
			{props.btnValue}
		</button>
	);
};

export default Button;
