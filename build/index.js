(function(){ "use strict"; window.app = (function(__small$_mod_0) {
var exports = {};
'use strict';

var React = __small$_mod_0;
var BowlingScoreApp = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;
var Header = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;

/**
 * View for the app header/title.
 */
var Header = React.createClass({displayName: "Header",

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			React.createElement("header", null, 
				React.createElement("h1", null, "Bowling Score")
			)
		);
	}

});

exports = Header;

return exports;
})());
var Scoring = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;
var ScoringRow = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;
var framesLogic = ((function() {
var exports = {};
'use strict';

/*  ***** Adapted from views/scoring/row.js, but not yet tested *****

function rollsData(frame, key, index) {
	// If first roll is not a strike, the player must roll one more time.
	if (frame.length === 1 && frame[0] < 10) {
		frame = [frame[0], null];
	}

	if (frame.length === 1) {
		// If there was only one roll in this frame, it must be a strike.
		return [
			{ frameIndex: index, key: key + '-roll', colSpan: 2, type: 'strike', knockedDown: 10 }
		];

	} else if (frame.length === 2) {
		// It is a spare if the total number of pins knocked down is 10.
		var first = frame[0] | 0;
		var second = frame[1] | 0;
		var isSpare = (first + second === 10);
		var firstType =
			(first === null) ? 'next' :
			'normal';
		var secondType =
			isSpare ? 'spare' :
			(first !== null && second === null) ? 'next' :
			'normal';

		// If there was two rolls in this frame, we create two columns with colspan=1.
		return [
			{ frameIndex: index, key: key + '-roll-1', colSpan: 1, type: firstType, knockedDown: first },
			{ frameIndex: index, key: key + '-roll-2', colSpan: 1, type: secondType, knockedDown: second }
		];

	} else {
		// Do not show any information in this frame.
		return [
			{ frameIndex: index, key: key + '-roll', colSpan: 2, type: 'empty', knockedDown: 0 }
		];
	}
}

function framesData(frames, key) {
	var rolls = [];
	var points = [];
	var total = 0;

	// Calculate points for all frames as well as total.
	for (var index = 0; index < 10; index++) {
		var frameKey = key + '-frame-' + index;
		var frame = frames[index] || [];

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns in the table beforehand.
		rolls = rolls.concat(rollsData(frame, frameKey, index));

		points.push({
			key: frameKey + '-points',
			points: null
		});
	}

	return {
		rolls: rolls,
		points: points,
		total: total
	};
}
*/

function framesData(frames) {
	var rolls = [];
	var points = [];

	for (var index = 0; index < 10; index++) {
		rolls.push({
			frameIndex: index,
			type: 'empty',
			colSpan: 2,
			knockedDown: 0
		});

		points.push({
			frameIndex: index,
			points: null
		});
	}

	return {
		rolls: rolls,
		points: points,
		total: 0
	};
}

exports.data = framesData;

return exports;
})());

// Key codes used in keyDown event.
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

/**
 * View for one row in the scoring table representing a single player.
 */
var ScoringRow = React.createClass({displayName: "ScoringRow",

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
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					self.state.editingName ?

						// Either show inline editing of name using input element.
						React.createElement("td", {className: "edit name", rowSpan: "2"}, 
							React.createElement("input", {type: "text", ref: "nameInput", autoFocus: true, placeholder: self.placeholderName(self.props.playerId), defaultValue: self.props.name, onBlur: self.editNameBlur, onKeyDown: self.editNameKey})
						) :

						// Otherwise just show the name (or the default placeholder name, if unnamed).
						React.createElement("td", {ref: "name", className: "name", rowSpan: "2", tabIndex: "0", onClick: self.nameClicked, onKeyDown: self.nameKey}, 
							self.props.name || self.placeholderName(self.props.playerId)
						), 
					

					framesData.rolls.map(function(roll, index) {
						// Insert the number of knocked down pins for each roll.
						// Strike/spare is shown in a special way.
						return (
							React.createElement("td", {key: rowKey + '-roll-' + index, colSpan: roll.colSpan, className: roll.type + ' points rolls ' + self.frameColor(roll.frameIndex)}, 
									roll.type === 'normal' ? roll.knockedDown :
									roll.type === 'strike' ? '\u00D7' :
									roll.type === 'spare' ? '/' :
									'\u00A0'
							)
						);
					}), 

					React.createElement("td", {className: "total", rowSpan: "2"}, 
						framesData.total
					)
				), 

				React.createElement("tr", null, 
					framesData.points.map(function(frame, index) {
						// Insert the number of points for each frame.
						return (
							React.createElement("td", {key: rowKey + '-frame-' + index, colSpan: "2", className: 'points frame ' + self.frameColor(frame.frameIndex)}, 
								frame.points || '\u00A0'
							)
						);
					})
				)
			)
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

exports = ScoringRow;

return exports;
})());

/**
 * View with the whole scoring table.
 */
var Scoring = React.createClass({displayName: "Scoring",

	/**
	 * Renders this view.
	 */
	render: function() {
		var self = this;

		return (
			React.createElement("section", {className: "scoring"}, 
				React.createElement("table", null, 
					React.createElement("thead", null, 
						React.createElement("th", {className: "name"}, "Name"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "1"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "2"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "3"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "4"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "5"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "6"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "7"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "8"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "9"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "10"), 
						React.createElement("th", {className: "total"}, "Total")
					), 

					this.props.players.map(function(player, index) {
						var rowKey = 'scoring-' + index; // key used by React
						var playerId = index + 1;

						// Create each player row in the scoring table.
						return (
							React.createElement(ScoringRow, {key: rowKey, playerId: playerId, frames: player.frames, name: player.name, onNameChange: self.nameChanged})
						);
					})

				)
			)
		);
	},

	/**
	 * Event when player name changed. Forward the information to parent view.
	 */
	nameChanged: function(player) {
		if (this.props.onNameChange) {
			this.props.onNameChange({
				index: player.playerId - 1,
				name: player.name
			});
		}
	}

});

exports = Scoring;

return exports;
})());
var GameController = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;

/**
 * View for the controller.
 */
var GameController = React.createClass({displayName: "GameController",

	/**
	 * Renders this view.
	 */
	render: function() {
		// If there are 10 pins remaining, show default text, otherwise the number of remaining pins.
		var pinsPlaceholderText = (this.props.pinsRemaining === 10) ?
			'Knocked down pins' :
			this.props.pinsRemaining + ' remaining';

		// Text for auto-play toggle button.
		var autoPlayText = this.state.autoPlay ?
			'Stop auto-play' :
			'Auto-play game';

		return (
			React.createElement("section", {className: "game controller"}, 
				React.createElement("form", {noValidate: true, onSubmit: this.rollSubmitted}, 
					React.createElement("input", {disabled: !this.props.running || this.state.autoPlay, ref: "pinsInput", autoFocus: true, type: "number", min: "0", max: this.props.pinsRemaining, step: "1", required: true, placeholder: pinsPlaceholderText}), 
					React.createElement("button", {disabled: !this.props.running || this.state.autoPlay, type: "submit"}, "Next roll")
				), 

				React.createElement("button", {disabled: !this.props.running, className: "highlighted", onClick: this.autoPlayClicked}, 
					autoPlayText
				)
			)
		);
	},

	/**
	 * Initial state is that auto-play is disabled.
	 */
	getInitialState: function() {
		return {
			autoPlay: false
		};
	},

	/**
	 * Helper function that enables/disables auto-play.
	 */
	toggleAutoPlay: function() {
		// Reset value in input field, if any.
		var pinsInput = React.findDOMNode(this.refs.pinsInput);
		pinsInput.value = '';

		// Stop auto-play timer, if any.
		if (this.autoPlayTimer) {
			clearInterval(this.autoPlayTimer);
			this.autoPlayTimer = null;
		}

		// Toggle auto-play state.
		var autoPlay = !this.state.autoPlay;
		this.setState({ autoPlay: autoPlay }, function() {
			// When exiting auto-play, return focus to input element.
			if (!autoPlay) {
				pinsInput.value = '';
				pinsInput.focus();
			}
		});

		// Start timer, if enabling auto-play.
		if (autoPlay) {
			this.autoPlayTimer = setInterval(this.autoPlayTimerFunction, 100);
		}
	},

	/**
	 * Event when a roll is manually submitted.
	 */
	rollSubmitted: function(event) {
		event.preventDefault();

		// Get number of pins knocked down, as entered in the input field.
		var pinsInput = React.findDOMNode(this.refs.pinsInput);
		var pinsText = pinsInput.value.trim();
		var pins = pinsText | 0; // convert to integer

		// Number of knocked down pins must be an integer between 0 and pins remaining.
		if (!(/^[0-9]{1,2}$/.test(pinsText) && pins >= 0 && pins <= this.props.pinsRemaining)) {
			pinsInput.select();
			pinsInput.focus();
			return;
		}

		// Empty input element and return focus.
		pinsInput.value = '';
		pinsInput.focus();

		// Propagate event to parent view.
		if (this.props.onRoll) {
			this.props.onRoll(pins);
		}
	},

	/**
	 * Event when the auto-play toggle button is clicked.
	 */
	autoPlayClicked: function(event) {
		event.preventDefault();
		this.toggleAutoPlay();
	},

	/**
	 * Timer event (fires repeatedly) when auto-play is enabled.
	 */
	autoPlayTimerFunction: function() {
		// Calculate random number of pins knocked down between 1 and number of pins remaining.
		// In a real game you could potentially not knock down any pins, but the specification
		// states that the number should be between 1 and 10, although I changed it to knock
		// down the maximum number of pins remaining. In a second roll you usually don't have
		// all pins remaining.
		var pins = ((Math.random() * this.props.pinsRemaining) | 0) + 1;

		// Show number of pins.
		React.findDOMNode(this.refs.pinsInput).value = pins;

		// Propagate event to parent view.
		if (this.props.onRoll) {
			this.props.onRoll(pins);
		}
	}

});

exports = GameController;

return exports;
})());
var SetupController = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;

/**
 * View for the controller.
 */
var SetupController = React.createClass({displayName: "SetupController",

	/**
	 * Renders this view. The Remove Player button is disabled if no players can be removed.
	 */
	render: function() {
		return (
			React.createElement("section", {className: "setup controller"}, 
				React.createElement("button", {disabled: !this.props.canAddPlayer, onClick: this.addPlayerClicked}, "Add player"), 
				React.createElement("button", {disabled: !this.props.canRemovePlayer, onClick: this.removePlayerClicked}, "Remove player"), 
				React.createElement("button", {className: "highlighted", onClick: this.startGameClicked}, "Start game")
			)
		);
	},

	/**
	 * Event when Add Player button is clicked.
	 */
	addPlayerClicked: function(event) {
		event.preventDefault();
		this.props.onAddPlayer();
	},

	/**
	 * Event when Remove Player button is clicked.
	 */
	removePlayerClicked: function(event) {
		event.preventDefault();
		this.props.onRemovePlayer();
	},

	/**
	 * Event when Start Game button is clicked.
	 */
	startGameClicked: function(event) {
		event.preventDefault();
		this.props.onStartGame();
	}

});

exports = SetupController;

return exports;
})());

/**
 * View for the app.
 */
var BowlingScoreApp = React.createClass({displayName: "BowlingScoreApp",

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			React.createElement("section", {className: "bowling-score-app"}, 
				React.createElement(Header, null), 
				React.createElement(Scoring, {players: this.state.players, onNameChange: this.nameChanged}), 

				this.state.running ?

					// Show game controller when game is running.
					React.createElement(GameController, {pinsRemaining: this.state.pinsRemaining, running: true, onRoll: this.roll}) :

					// Show setup controller (to add/remove players and start game), when game is not yet running.
					React.createElement(SetupController, {canAddPlayer: this.canAddPlayer(), canRemovePlayer: this.canRemovePlayer(), onAddPlayer: this.addPlayer, onRemovePlayer: this.removePlayer, onStartGame: this.startGame})
				

			)
		);
	},

	/**
	 * Initial state of the app is just a single unnamed player, and game is not yet running.
	 */
	getInitialState: function() {
		return {
			players: [ this.newUnnamedPlayer() ],
			running: false,
			pinsRemaining: 10
		};
	},

	/**
	 * Create state for a new unnamed player.
	 */
	newUnnamedPlayer: function() {
		return { frames: [], name: '' };
	},

	/**
	 * Returns true if more players can be added to the list.
	 * Ensures that there are a maximum of 6 players.
	 */
	canAddPlayer: function() {
		return (this.state.players.length < 6);
	},

	/**
	 * Returns true if more players can be removed from the list.
	 * Ensures that there are at least one player left.
	 */
	canRemovePlayer: function() {
		return (this.state.players.length > 1);
	},

	/**
	 * Event when name is changed for a player.
	 */
	nameChanged: function(player) {
		this.state.players[player.index].name = player.name;
		this.setState({ players: this.state.players });
	},

	/**
	 * Event when add player is clicked. Adds another player to the list.
	 */
	addPlayer: function() {
		if (this.canAddPlayer()) {
			var players = this.state.players.concat([ this.newUnnamedPlayer() ]);
			this.setState({ players: players });
		}
	},

	/**
	 * Event when remove player is clicked. Removes the last player
	 * from the list, except when there is only one player left.
	 */
	removePlayer: function() {
		if (this.canRemovePlayer()) {
			this.setState({ players: this.state.players.slice(0, -1) });
		}
	},

	/**
	 * Event when start game is clicked.
	 */
	startGame: function() {
		this.setState({ running: true });
	},

	/**
	 * Event when a roll is performed.
	 */
	roll: function(pins) {
		pins = Math.max(0, Math.min(this.state.pinsRemaining, pins));
		console.log('Roll: ' + pins);

		var pinsRemaining = this.state.pinsRemaining - pins;
		if (pinsRemaining <= 0) {
			pinsRemaining = 10;
		}
		this.setState({ pinsRemaining: pinsRemaining });
	}

});

exports = BowlingScoreApp;

return exports;
})());

// Render the app.
React.render(React.createElement(BowlingScoreApp, null), document.body);

return exports;
})(window.React);; }());