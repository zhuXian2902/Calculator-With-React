/** @format */

import React from 'react';
import logo from './logo.svg';
import './App.css';

class Buttons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ans: 0,
			exp: '',
		};
	}

	pre = (operator) => {
		if (operator === '*' || operator === '/' || operator === '%') return 2;
		else if (operator === '+' || operator === '-') return 1;
		return 0;
	};

	operation = (num1, num2, operator) => {
		if (operator === '+') return num1 + num2;
		else if (operator === '-') return num1 - num2;
		else if (operator === '*') return num1 * num2;
		else if (operator === '/') return num1 / num2;
		else if (operator === '%') return num1 % num2;
	};

	compute = (str, ans) => {
		let numArray = [ans];
		let operators = [];
		console.log(numArray);
		for (let i = 0; i < str.length; i++) {
			if (str[i] === '(') {
				operators.push(str[i]);
			} else if (str[i] >= 0 && str[i] <= 9) {
				let temp = 0;
				while (i < str.length && str[i] >= 0 && str[i] <= 9) {
					temp = temp * 10 + (str[i] - '0');
					i++;
				}
				i--;
				numArray.push(temp);
			} else if (str[i] === ')') {
				while (operators.length > 0 && operators[operators.length - 1] !== '(') {
					let num2 = numArray.pop();
					let num1 = numArray.pop();
					let operator = operators.pop();
					let total = this.operation(num1, num2, operator);
					numArray.push(total);
				}
				if (operators.length === 0) return 'Error';
				else operators.pop();
			} else {
				while (
					operators.length > 0 &&
					this.pre(operators[operators.length - 1]) >= this.pre(str[i])
				) {
					let num2 = numArray.pop();
					let num1 = numArray.pop();
					let operator = operators.pop();
					numArray.push(this.operation(num1, num2, operator));
				}
				operators.push(str[i]);
			}
		}
		while (operators.length > 0) {
			let num2 = numArray.pop();
			let num1 = numArray.pop();

			if (operators[operators.length - 1] === '(') operators.pop();
			if (operators.length === 0) {
				if (num1 === 0) return num2;
				else return 'Error';
			}
			let operator = operators.pop();
			numArray.push(this.operation(num1, num2, operator));
		}

		let n2 = numArray.pop();
		if (numArray.length === 0) return n2;
		let n1 = numArray.pop();
		// console.log(n1, n2);
		if (n1 !== 0) return 'Error';
		return n2;
	};

	addExp = (e, num) => {
		console.log(num !== '=' && num !== 'C');
		if (num !== '=' && num !== 'C') {
			this.setState((prev) => {
				return {
					exp: prev.exp + num,
				};
			});
		} else if (num === 'C') {
			this.setState((prev) => {
				return {
					exp: '',
					ans: 0,
				};
			});
		} else {
			let total = this.compute(this.state.exp, this.state.ans);
			console.log(total);
			this.setState((prev) => {
				return {
					ans: total,
					exp: '',
				};
			});
		}
	};

	render() {
		return (
			<div className="body">
				<div className="screen">
					{<h1>{this.state.ans}</h1>} {<h2>{this.state.exp}</h2>}
				</div>
				<div className="btns">
					{this.props.numArray.map((num) => (
						// <button onClick={(e) => this.addExp(e, num)} className="btn" key={num}>
						// 	{num}
						// </button>
						<Button addExp={this.addExp} key={num} btnValue={num} />
					))}
				</div>
			</div>
		);
	}
}

const Button = (props) => {
	return (
		<button onClick={(e) => props.addExp(e, props.btnValue)} className="btn">
			{props.btnValue}
		</button>
	);
};

class Calculator extends React.Component {
	render() {
		let nums = [
			'C',
			'/',
			'*',
			'%',
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
		];
		return (
			<div>
				<Buttons numArray={nums} />
			</div>
		);
	}
}

export default Calculator;

// class Button extends React.Component {
// val(e, val) {
// 	const variable = e.target.getAttribute('val');
// 	let ans = 0,
// 		numVariable = [],
// 		operVariable = [];
// 	if (variable >= '9' && variable <= '0') {
// 		numvariable.push(+variable);
// 	} else if (variable != '=') {
// 		operVariable.push(variable);
// 	} else {
// 		compute();
// 	}

// 	// console.log(
// 	// 	e.target.getAttribute('val') <= 9 && e.target.getAttribute('val') >= 0
// 	// );
// }
// 	render() {
// 		return (
// 			<button className="btn" onClick={this.val} val={this.props.btnValue}>
// 				{this.props.btnValue}
// 			</button>
// 		);
// 	}
// }

// class Screen extends React.Component {
// 	render() {
//     return ();
//   }
// }
