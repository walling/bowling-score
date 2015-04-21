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
var ScoringRow = React.createClass({displayName: "ScoringRow",
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
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls strike ' + frameColor(index)}, "×")
				);

			} else if (rollsData.length === 2) {
				// We insert class name 'spare' if the total number of pins knocked down is 10.
				var spare = ((rollsData[0] | 0) + (rollsData[1] | 0) === 10) ? 'spare ' : '';

				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll-1', colSpan: "1", className: 'points rolls ' + frameColor(index)}, rollsData[0]),
					React.createElement("td", {key: frameKey + '-roll-2', colSpan: "1", className: 'points rolls ' + spare + ' ' + frameColor(index)}, spare ? '/' : rollsData[1])
				);

			} else {
				// Do not show any information in this frame.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls ' + frameColor(index)}, " ")
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					this.state.editName
						? React.createElement("td", {className: "edit name", rowSpan: "2"}, 
								React.createElement("input", {type: "text", ref: "nameInput", autoFocus: true, placeholder: placeholderName(this.props.playerId), defaultValue: this.state.name, onBlur: this.editNameBlur, onKeyDown: this.editNameKey})
							)
						: React.createElement("td", {ref: "name", className: "name", rowSpan: "2", tabIndex: "0", onClick: this.nameClicked, onKeyDown: this.nameKey}, this.state.name || placeholderName(this.props.playerId)), 
					
					rolls, 
					React.createElement("td", {className: "total", rowSpan: "2"}, "42")
				), 
				React.createElement("tr", null, 
					framesData.map(function(frameData, index) {
						// Key used by React.
						var frameKey = rowKey + '-frame-' + index;

						// Insert the number of points in each frame.
						return (
							React.createElement("td", {key: frameKey, colSpan: "2", className: 'points frame ' + frameColor(index)}, frameData.points || '\u00A0')
						);
					})
				)
			)
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

exports = ScoringRow;

return exports;
})());

/**
 * View with the whole scoring table.
 */
var Scoring = React.createClass({displayName: "Scoring",
	render: function() {
		var playersData = this.props.players;

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
					playersData.map(function(playerData, index) {
						// Key used by React.
						var playerId = index + 1;
						var rowKey = 'scoring-row-' + playerId;

						// Create each player row in the scoring table.
						return (
							React.createElement(ScoringRow, {key: rowKey, playerId: playerId, frames: playerData.frames})
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
	render: function() {
		return (
			React.createElement("section", {className: "setup controller"}, 
				React.createElement("button", {onClick: this.addPlayerClicked}, "Add player"), 
				React.createElement("button", {disabled: !this.props.canRemovePlayer, onClick: this.removePlayerClicked}, "Remove player"), 
				React.createElement("button", {className: "highlighted"}, "Start game")
			)
		);
	},

	addPlayerClicked: function(event) {
		event.preventDefault();
		this.props.onAddPlayer();
	},

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
	render: function() {
		return (
			React.createElement("section", {className: "app"}, 
				React.createElement(Header, null), 
				React.createElement(Scoring, {players: this.state.players}), 
				React.createElement(SetupController, {canRemovePlayer: this.state.players.length > 1, onAddPlayer: this.addPlayer, onRemovePlayer: this.removePlayer, onStartGame: this.startGame})
			)
		);
	},

	getInitialState: function() {
		// Begin with just a single unnamed player.
		return {
			players: [ { frames: [] } ]
		};
	},

	addPlayer: function() {
		this.state.players.push({ frames: [] });
		this.setState({ players: this.state.players });
	},

	removePlayer: function() {
		if (this.state.players.length > 1) {
			this.state.players.pop();
			this.setState({ players: this.state.players });
		}
	}

});

exports = App;

return exports;
})());

// Render the app.
React.render(
	React.createElement(App, null),
	document.body
);

return exports;
})(window.React);; }());