'use strict';

var React = require('react');

/**
 * Creates alternating color for each frame.
 */
function frameColor(index) {
	return (index % 2 === 0) ? 'blue' : 'white';
}

/**
 * Default name for a given player.
 */
function placeholderName(id) {
	return 'Player ' + id;
}

/**
 * View for one row in the scoring table representing a single player.
 */
var ScoringRow = React.createClass({
	render: function() {
		// Key used by React.
		var rowKey = 'scoring-row-' + this.props.playerId;

		var framesData = [];
		for (var index = 0; index < 10; index++) {
			framesData[index] = {
				rolls: this.props.frames[index] || [],
				points: null
			};
		}

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns beforehand.
		var rolls = [];
		framesData.forEach(function(frameData, index) {
			var rollsData = frameData.rolls;

			// Key used by React.
			var frameKey = rowKey + '-frame-' + index;

			if (rollsData.length === 1) {
				// If there was only one roll in this frame, it must be a strike.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls strike ' + frameColor(index)}>&#215;</td>
				);

			} else if (rollsData.length === 2) {
				// We insert class name 'spare' if the total number of pins knocked down is 10.
				var spare = ((rollsData[0] | 0) + (rollsData[1] | 0) === 10) ? 'spare ' : '';

				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					<td key={frameKey + '-roll-1'} colSpan="1" className={'points rolls ' + frameColor(index)}>{rollsData[0]}</td>,
					<td key={frameKey + '-roll-2'} colSpan="1" className={'points rolls ' + spare + ' ' + frameColor(index)}>{spare ? '/' : rollsData[1]}</td>
				);

			} else {
				// Do not show any information in this frame.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls ' + frameColor(index)}>&nbsp;</td>
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			<tbody>
				<tr>
					{this.state.editName
						? <td className="edit name" rowSpan="2">
								<input type="text" ref="nameInput" autoFocus placeholder={placeholderName(this.props.playerId)} defaultValue={this.state.name} onBlur={this.editNameBlur} onKeyDown={this.editNameKey} />
							</td>
						: <td ref="name" className="name" rowSpan="2" tabIndex="0" onClick={this.nameClicked} onKeyDown={this.nameKey}>{this.state.name || placeholderName(this.props.playerId)}</td>
					}
					{rolls}
					<td className="total" rowSpan="2">42</td>
				</tr>
				<tr>
					{framesData.map(function(frameData, index) {
						// Key used by React.
						var frameKey = rowKey + '-frame-' + index;

						// Insert the number of points in each frame.
						return (
							<td key={frameKey} colSpan="2" className={'points frame ' + frameColor(index)}>{frameData.points || '\u00A0'}</td>
						);
					})}
				</tr>
			</tbody>
		);
	},

	getInitialState: function() {
		return {
			name: '',
			editName: true
		};
	},

	startEditingName: function() {
		this.setState({ editName: true }, function() {
			var inputElement = React.findDOMNode(this.refs.nameInput);
			inputElement.select();
			inputElement.focus();
		});
	},

	stopEditingName: function(keepFocus, newName) {
		var newState = { editName: false };
		if (newName !== undefined) {
			newState.name = newName.trim();
		}
		this.setState(newState, function() {
			if (keepFocus) {
				React.findDOMNode(this.refs.name).focus();
			}
		});
	},

	nameClicked: function(event) {
		event.preventDefault();
		this.startEditingName();
	},

	nameKey: function(event) {
		if (event.which === 13) {
			event.preventDefault();
			this.startEditingName();
		}
	},

	editNameBlur: function(event) {
		event.preventDefault();
		this.stopEditingName(false, React.findDOMNode(this.refs.nameInput).value);
	},

	editNameKey: function(event) {
		var data = this.props.data;

		if (event.which === 27) {
			// Escape key: Cancel editing.
			event.preventDefault();
			this.stopEditingName(true); // not specifying name reverts to old name
		} else if (event.which === 13) {
			// Enter key: Accept new name.
			event.preventDefault();
			this.stopEditingName(true, React.findDOMNode(this.refs.nameInput).value);
		}
	}
});

module.exports = ScoringRow;
