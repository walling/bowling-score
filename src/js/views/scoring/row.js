'use strict';

var React = require('react');

var ScoringRow = React.createClass({
	render: function() {
		var data = this.props.data;
		var rowId = 'scoring-row-' + data.id;

		var rolls = [];
		data.frames.forEach(function(frameData) {
			var frameId = rowId + '-frame-' + frameData.id;
			var rollsData = frameData.rolls;

			if (rollsData.length === 1) {
				rolls.push(
					<td key={frameId + '-roll-1'} colSpan="2" className={'points ' + frameData.color}>{rollsData[0]}</td>
				);
			} else if (rollsData.length === 2) {
				rolls.push(
					<td key={frameId + '-roll-1'} colSpan="1" className={'points ' + frameData.color}>{rollsData[0]}</td>,
					<td key={frameId + '-roll-2'} colSpan="1" className={'points ' + frameData.color}>{rollsData[1]}</td>
				);
			}
		});

		return (
			<tbody>
				<tr>
					<td className="name" rowSpan="2">{data.name}</td>
					{rolls}
					<td className="total" rowSpan="2">{data.total}</td>
				</tr>
				<tr>
					{data.frames.map(function(frameData) {
						var frameId = rowId + '-frame-' + frameData.id;

						return (
							<td key={frameId} colSpan="2" className={'points ' + frameData.color}>{frameData.points}</td>
						);
					})}
				</tr>
			</tbody>
		);
	}
});

module.exports = ScoringRow;
