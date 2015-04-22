'use strict';

var React = require('react');
var framesLogic = require('../../logic/frames');

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
		var rowKey = 'scoring-row-' + self.props.playerId; // key used by React

		// Calculate rolls, points and total for all frames.
		var framesData = framesLogic.data(self.props.frames);

		// View for one row (ie. one player) in the scoring table.
		return (
			<tbody>
				<tr>
					{self.state.editingName ?

						// Either show inline editing of name using input element.
						<td className="edit name" rowSpan="2">
							<input type="text" ref="nameInput" autoFocus placeholder={self.placeholderName(self.props.playerId)} defaultValue={self.props.name} onBlur={self.editNameBlur} onKeyDown={self.editNameKey} />
						</td> :

						// Otherwise just show the name (or the default placeholder name, if unnamed).
						<td ref="name" className="name" rowSpan="2" tabIndex="0" onClick={self.nameClicked} onKeyDown={self.nameKey} title={self.props.name}>
							{self.props.name || self.placeholderName(self.props.playerId)}
						</td>
					}

					{framesData.rolls.map(function(roll, index) {
						// Insert the number of knocked down pins for each roll.
						// Strike/spare is shown in a special way.
						return (
							<td key={rowKey + '-roll-' + index} colSpan={roll.colSpan} className={roll.type + ' points rolls ' + self.frameColor(roll.frameIndex)}>
								{	roll.type === 'normal' ? roll.knockedDown :
									roll.type === 'strike' ? '\u00D7' :
									roll.type === 'spare' ? '/' :
									'\u00A0' }
							</td>
						);
					})}

					<td className="total" rowSpan="2">
						{framesData.total}
					</td>
				</tr>

				<tr>
					{framesData.points.map(function(frame, index) {
						// Insert the number of points for each frame.
						return (
							<td key={rowKey + '-frame-' + index} colSpan="2" className={'points frame ' + self.frameColor(frame.frameIndex)}>
								{(''+[frame.points]) || '\u00A0'}
							</td>
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
		// Report new name, if given. If not given, the name is not updated, ie. it reverts back to old name.
		if (newName !== undefined && this.props.onNameChange) {
			this.props.onNameChange({
				playerId: this.props.playerId,
				name: newName
			});
		}

		// Disable editing.
		this.setState({ editingName: false }, function() {
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
