'use strict';

var React = require('react');

var ScoringRow = React.createClass({
	render: function() {
		return (
			<tbody>
				<tr>
					<td className="name" rowSpan="2">{this.props.data.name}</td>
					<td colSpan="1">4</td>
					<td colSpan="1">3</td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td className="total" rowSpan="2">7</td>
				</tr>
				<tr>
					<td colSpan="2">7</td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
					<td colSpan="2"></td>
				</tr>
			</tbody>
		);
	}
});

module.exports = ScoringRow;
