(function(){ "use strict"; window.app = (function(__small$_mod_0) {
var exports = {};
'use strict';

var React = __small$_mod_0;
var App = ((function() {
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
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls strike ' + self.frameColor(index)}, "×")
				);

			} else if (rollsData.length === 2) {
				// We insert class name 'spare' if the total number of pins knocked down is 10.
				var spare = ((rollsData[0] | 0) + (rollsData[1] | 0) === 10) ? 'spare ' : '';

				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll-1', colSpan: "1", className: 'points rolls ' + self.frameColor(index)}, rollsData[0]),
					React.createElement("td", {key: frameKey + '-roll-2', colSpan: "1", className: 'points rolls ' + spare + ' ' + self.frameColor(index)}, spare ? '/' : rollsData[1])
				);

			} else {
				// Do not show any information in this frame.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls ' + self.frameColor(index)}, " ")
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					this.state.editingName
						// Either show inline editing of name using input element.
						? React.createElement("td", {className: "edit name", rowSpan: "2"}, 
								React.createElement("input", {type: "text", ref: "nameInput", autoFocus: true, placeholder: this.placeholderName(this.props.playerId), defaultValue: this.state.name, onBlur: this.editNameBlur, onKeyDown: this.editNameKey})
							)
						// Otherwise just show the name (or the default placeholder name, if unnamed).
						: React.createElement("td", {ref: "name", className: "name", rowSpan: "2", tabIndex: "0", onClick: this.nameClicked, onKeyDown: this.nameKey}, this.state.name || this.placeholderName(this.props.playerId)), 
					

					rolls, /* display the rolls columns as calculated above */

					React.createElement("td", {className: "total", rowSpan: "2"}, "42")
				), 
				React.createElement("tr", null, 

					framesData.map(function(frameData, index) {
						var frameKey = rowKey + '-frame-' + index; // key used by React
						var text = frameData.points || '\u00A0'; // show non-breaking space if no data

						// Insert the number of points for each frame.
						return (
							React.createElement("td", {key: frameKey, colSpan: "2", className: 'points frame ' + self.frameColor(index)}, text)
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
							React.createElement(ScoringRow, {key: rowKey, playerId: playerId, frames: player.frames})
						);
					})

				)
			)
		);
	}

});

exports = Scoring;

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
				React.createElement("button", {onClick: this.addPlayerClicked}, "Add player"), 
				React.createElement("button", {disabled: !this.props.canRemovePlayer, onClick: this.removePlayerClicked}, "Remove player"), 
				React.createElement("button", {className: "highlighted"}, "Start game")
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
	}

});

exports = SetupController;

return exports;
})());

/**
 * View for the app.
 */
var App = React.createClass({displayName: "App",

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			React.createElement("section", {className: "app"}, 
				React.createElement(Header, null), 
				React.createElement(Scoring, {players: this.state.players}), 
				React.createElement(SetupController, {canRemovePlayer: this.canRemovePlayer(), onAddPlayer: this.addPlayer, onRemovePlayer: this.removePlayer, onStartGame: this.startGame})
			)
		);
	},

	/**
	 * Initial state of the app is just a single unnamed player.
	 */
	getInitialState: function() {
		return {
			players: [ { frames: [] } ]
		};
	},

	/**
	 * Returns true if more players can be removed from the list.
	 * Ensures that there are at least one player left.
	 */
	canRemovePlayer: function() {
		return (this.state.players.length > 1);
	},

	/**
	 * Event when add player is clicked. Adds another player to the list.
	 */
	addPlayer: function() {
		var players = this.state.players.concat([ { frames: [] } ]);
		this.setState({ players: players });
	},

	/**
	 * Event when remove player is clicked. Removes the last player
	 * from the list, except when there is only one player left.
	 */
	removePlayer: function() {
		if (this.canRemovePlayer()) {
			this.setState({ players: this.state.players.slice(0, -1) });
		}
	}

});

exports = App;

return exports;
})());

// Render the app.
React.render(React.createElement(App, null), document.body);

return exports;
})(window.React);; }());