'use strict';

var React = require('react');

/**
 * Creates alternating color for each frame.
 */
function frameColor(index) {
	return (index % 2 === 0) ? 'blue' : 'white';
}

/**
 * View for one row in the scoring table representing a single player.
 */
var ScoringRow = React.createClass({
	render: function() {
		var rowData = this.props.data;

		// Key used by React.
		var rowKey = 'scoring-row-' + rowData.id;

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns beforehand.
		var rolls = [];
		rowData.frames.forEach(function(frameData, index) {
			var rollsData = frameData.rolls;

			// Key used by React.
			var frameKey = rowKey + '-frame-' + index;

			if (rollsData.length === 1) {
				// If there was only one roll in this frame, we create a column with colspan=2.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls ' + frameColor(index)}>{rollsData[0]}</td>
				);
			} else if (rollsData.length === 2) {
				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					<td key={frameKey + '-roll-1'} colSpan="1" className={'points rolls ' + frameColor(index)}>{rollsData[0]}</td>,
					<td key={frameKey + '-roll-2'} colSpan="1" className={'points rolls ' + frameColor(index)}>{rollsData[1]}</td>
				);
			} else {
				// Do not show any information in this frame.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls ' + frameColor(index)}></td>
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			<tbody>
				<tr>
					<td className="name" rowSpan="2">{rowData.name}</td>
					{rolls}
					<td className="total" rowSpan="2">{rowData.total}</td>
				</tr>
				<tr>
					{rowData.frames.map(function(frameData, index) {
						// Key used by React.
						var frameKey = rowKey + '-frame-' + index;

						// Insert the number of points in each frame.
						return (
							<td key={frameKey} colSpan="2" className={'points frame ' + frameColor(index)}>{frameData.points}</td>
						);
					})}
				</tr>
			</tbody>
		);
	}
});

module.exports = ScoringRow;
