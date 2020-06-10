/** @format */

import React from 'react';
import './App.css';
import Buttons from './Buttons';

class Calculator extends React.Component {
	render() {
		let nums = [
			'C',
			'/',
			'*',
			'CE',
			1,
			2,
			3,
			'-',
			4,
			5,
			6,
			'+',
			7,
			8,
			9,
			'=',
			0,
			'(',
			')',
			'%',
		];
		return (
			<div>
				<Buttons numArray={nums} />
			</div>
		);
	}
}

export default Calculator;
