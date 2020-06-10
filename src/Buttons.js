/** @format */

import React from 'react';
import Button from './Button';

export default class Buttons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ans: 0,
			exp: '',
		};
	}

	/** somw good test cases failing on eval
	 * a. (1-2
	 * b. (1--2)
	 * c. (1-(-2))
	 */

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
		// console.log(numArray);
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
		// console.log(num !== '=' && num !== 'C');
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
			let expression = this.state.exp;
			let { ans } = this.state;
			if (this.state.exp.includes('--'))
				expression = this.state.exp.replace('--', '+');
			if (this.state.exp.includes('-(-'))
				expression = expression.replace('-(-', '+(');
			console.log(expression);
			let total = this.compute(expression, ans);
			if (isNaN(total) || typeof total === 'undefined')
				this.setState(() => {
					return { ans: 'Error', exp: '' };
				});
			// console.log(total);
			else {
				this.setState((prev) => {
					return {
						ans: total,
						exp: '',
					};
				});
			}
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
