'use strict';

var React = require('react');

// Key codes used in keyDown event.
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

/**
 * View for one row in the scoring table representing a single player.
 */
var ScoringRow = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		var self = this;
		var rowKey = 'scoring-row-' + this.props.playerId; // key used by React

		// Calculate points for all frames as well as total.
		// TODO: Move this out in seperate module for application logic.
		var total = 0;
		var framesData = [];
		for (var index = 0; index < 10; index++) {
			framesData[index] = {
				rolls: this.props.frames[index] || [],
				points: null
			};
		}

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns in the table beforehand.
		// TODO: Calculate rolls in application logic to keep view logic simpler.
		var rolls = [];
		framesData.forEach(function(frameData, index) {
			var rollsData = frameData.rolls;
			var frameKey = rowKey + '-frame-' + index; // key used by React

			if (rollsData.length === 1) {
				// If there was only one roll in this frame, it must be a strike.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls strike ' + self.frameColor(index)}>&#215;</td>
				);

			} else if (rollsData.length === 2) {
				// We insert class name 'spare' if the total number of pins knocked down is 10.
				var spare = ((rollsData[0] | 0) + (rollsData[1] | 0) === 10) ? 'spare ' : '';

				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					<td key={frameKey + '-roll-1'} colSpan="1" className={'points rolls ' + self.frameColor(index)}>{rollsData[0]}</td>,
					<td key={frameKey + '-roll-2'} colSpan="1" className={'points rolls ' + spare + ' ' + self.frameColor(index)}>{spare ? '/' : rollsData[1]}</td>
				);

			} else {
				// Do not show any information in this frame.
				rolls.push(
					<td key={frameKey + '-roll'} colSpan="2" className={'points rolls ' + self.frameColor(index)}>&nbsp;</td>
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			<tbody>
				<tr>
					{this.state.editingName
						// Either show inline editing of name using input element.
						? <td className="edit name" rowSpan="2">
								<input type="text" ref="nameInput" autoFocus placeholder={this.placeholderName(this.props.playerId)} defaultValue={this.state.name} onBlur={this.editNameBlur} onKeyDown={this.editNameKey} />
							</td>
						// Otherwise just show the name (or the default placeholder name, if unnamed).
						: <td ref="name" className="name" rowSpan="2" tabIndex="0" onClick={this.nameClicked} onKeyDown={this.nameKey}>{this.state.name || this.placeholderName(this.props.playerId)}</td>
					}

					{rolls /* display the rolls columns as calculated above */}

					<td className="total" rowSpan="2">42</td>
				</tr>
				<tr>

					{framesData.map(function(frameData, index) {
						var frameKey = rowKey + '-frame-' + index; // key used by React
						var text = frameData.points || '\u00A0'; // show non-breaking space if no data

						// Insert the number of points for each frame.
						return (
							<td key={frameKey} colSpan="2" className={'points frame ' + self.frameColor(index)}>{text}</td>
						);
					})}

				</tr>
			</tbody>
		);
	},

	/**
	 * The initial state is an unnamed player and editing the name is actived.
	 */
	getInitialState: function() {
		return {
			name: '',
			editingName: true
		};
	},

	/**
	 * Creates alternating color for each frame.
	 */
	frameColor: function(index) {
		return (index % 2 === 0) ? 'blue' : 'white';
	},

	/**
	 * Default name for a given player.
	 */
	placeholderName: function(id) {
		return 'Player ' + id;
	},

	/**
	 * Helper method to activate editing of the name.
	 */
	startEditingName: function() {
		this.setState({ editingName: true }, function() {
			// When the view updated, select the content and set focus.
			var inputElement = React.findDOMNode(this.refs.nameInput);
			inputElement.select();
			inputElement.focus();
		});
	},

	/**
	 * Helper method to deactivate editing of the name.
	 */
	stopEditingName: function(keepFocus, newName) {
		// Create new state where editing is disabled.
		var newState = { editingName: false };

		// Update name, if given. If not given, the name is not updated, ie. it reverts back to old name.
		if (newName !== undefined) {
			newState.name = newName.trim();
		}

		this.setState(newState, function() {
			// Select focus of the current player as requested, when the view updated.
			if (keepFocus) {
				React.findDOMNode(this.refs.name).focus();
			}
		});
	},

	/**
	 * Event when player name is clicked. This starts editing.
	 */
	nameClicked: function(event) {
		event.preventDefault();
		this.startEditingName();
	},

	/**
	 * Event when key is pressed down on player name. Checks for enter key, which simulates a click to start editing.
	 */
	nameKey: function(event) {
		if (event.which === ENTER_KEY) {
			event.preventDefault();
			this.startEditingName();
		}
	},

	/**
	 * Event when focus leaves the name editing field. This stops editing.
	 */
	editNameBlur: function(event) {
		event.preventDefault();
		this.stopEditingName(false, React.findDOMNode(this.refs.nameInput).value);
	},

	/**
	 * Event when key is pressed down in name editing field:
	 *
	 *  - Escape key cancels the edit and reverts back to the old name.
	 *  - Enter key accepts the edit and saves the new name.
	 */
	editNameKey: function(event) {
		if (event.which === ESCAPE_KEY) {
			// Escape key: Cancel editing.
			event.preventDefault();
			this.stopEditingName(true); // not specifying name reverts to old name
		} else if (event.which === ENTER_KEY) {
			// Enter key: Accept new name.
			event.preventDefault();
			this.stopEditingName(true, React.findDOMNode(this.refs.nameInput).value);
		}
	}

});

module.exports = ScoringRow;
