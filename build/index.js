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

/**
 * The sum of two arguments.
 */
function sum(a, b) {
	return a + b;
}

/**
 * Normalises the given rolls in a frame. Rolls are represented as an array of pins
 * knocked down. The result is a list of rolls as being presented in the scoreboard.
 */
function rollsData(frame, frameIndex) {
	var isStrike, isSpare, isNext, firstType, secondType;

	if (frame.length === 0) {
		// No rolls in frame, just return empty roll.
		return [
			{ frameIndex: frameIndex, type: 'empty', colSpan: 2, knockedDown: 0 }
		];

	} else if (frame.length === 1) {
		// One roll in frame. Check to see if it is a strike or not.
		isStrike = (frame[0] === 10);

		if (isStrike) {
			// A strike, there is no second roll.
			return [
				{ frameIndex: frameIndex, type: 'strike', colSpan: 2, knockedDown: 10 }
			];
		} else {
			// A single normal roll, the second roll is empty.
			// Check whether the first roll is the next one.
			isNext = (frame[0] === null);
			firstType = isNext ? 'next' : 'normal';

			return [
				{ frameIndex: frameIndex, type: firstType, colSpan: 1, knockedDown: frame[0] | 0 },
				{ frameIndex: frameIndex, type: 'empty', colSpan: 1, knockedDown: 0 },
			];
		}

	} else {
		// Two rolls in frame. Check to see if it is a spare or not.
		isSpare = (frame[0] + frame[1] === 10);

		// Check to see if the second roll is the next one.
		isNext = (frame[1] === null);

		// Determine type of second roll.
		secondType = isNext ? 'next' : isSpare ? 'spare' : 'normal';

		return [
			{ frameIndex: frameIndex, type: 'normal', colSpan: 1, knockedDown: frame[0] | 0 },
			{ frameIndex: frameIndex, type: secondType, colSpan: 1, knockedDown: frame[1] | 0 }
		];
	}
}

/**
 * Given rolls data in a frame, this function calculates the base points, ie. the sum
 * of the knocked down pins. It also determines the frame type: empty, normal, strike,
 * spare.
 */
function pointsData(rolls, frameIndex, allRolls) {
	// Collect knocked down pins in the next two rolls after the current frame.
	var nextRolls =
		Array.prototype.concat.apply([], (allRolls || []).slice(frameIndex + 1))
			.map(function(roll) { return roll.knockedDown; });

	if (rolls.length === 1 && rolls[0].type === 'strike') {
		// Strike scores 10 points plus next two rolls.
		return {
			frameIndex: frameIndex,
			type: 'strike',
			points: 10 + nextRolls.slice(0, 2).reduce(sum, 0)
		};

	} else if (rolls.length === 2) {
		// Spare or normal rolls scores number of knocked down pins (which is 10 for spare).
		var totalKnockedDown = rolls[0].knockedDown + rolls[1].knockedDown;

		return {
			frameIndex: frameIndex,
			type: (totalKnockedDown === 10) ? 'spare' : 'normal',
			points: totalKnockedDown
		};
	}

	// Frame is not yet completed.
	return {
		frameIndex: frameIndex,
		type: 'empty',
		points: null
	};
}

/**
 * For given player frames, collect all rolls, frame points and total. The frames are
 * represented with an array or rolls. Rolls are represented as an array of pins
 * knocked down. Null represents the next roll. For example,
 *
 *     [ [1, 3], [10], [7, null] ]
 *
 * represents a roll of 1 and 3 in the first frame, a strike in the second frame,
 * followed by a roll of 7. The second roll in the third frame is the next one.
 */
function framesData(frames) {
	// Shallow clone frames, so we do not mutate the original object.
	// Ensure that there are precisely ten frames. Insert empty frames as necessary.
	frames = frames.slice(0, 10);
	for (var i = 0; i < 10; i++) {
		frames[i] = frames[i] || [];
	}

	// Collect all the rolls for the given player.
	var rolls = frames.map(rollsData);

	// Collect points in each frame.
	var points = rolls.map(pointsData);

	return {
		rolls: Array.prototype.concat.apply([], rolls),
		points: points,
		total: 0
	};
}

exports.rollsData = rollsData;
exports.pointsData = pointsData;
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
		// If the game ended, display that.
		var pinsPlaceholderText =
			(!this.props.running) ? 'Game ended' :
			(this.props.pinsRemaining === 10) ? 'Knocked down pins' :
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

	componentWillReceiveProps: function(newProps) {
		// If game is not longer running, reset input field and stop auto-play.
		if (!newProps.running) {
			React.findDOMNode(this.refs.pinsInput).value = '';

			if (this.autoPlayTimer) {
				clearInterval(this.autoPlayTimer);
				this.autoPlayTimer = null;
				this.setState({ autoPlay: false });
			}
		}
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
var gameLogic = ((function() {
var exports = {};
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Simple helper function to shallow clone an object or array.
 */
function clone(obj) {
	if (Array.isArray(obj)) {
		return obj.slice();
	} else {
		var copy = {};
		for (var key in obj) {
			if (hasOwn.call(obj, key)) {
				copy[key] = obj[key];
			}
		}
		return copy;
	}
}

/**
 * Given the number of pins knocked down and some frames for a player, this function
 * advances to a state where a player can make a new roll. The frames is an array of
 * rolls. A roll is an array with zero, one, or two members, namely the number of
 * knocked down pins. The special value `null` represents a new roll for the player
 * that is not yet completed.
 *
 * Returns an object with boolean property `.nextPlayer` and the updated frames in
 * property `.advanced`.
 */
function advanceFramesToNextRoll(pins, frames) {
	// Update frames while keeping data immutable.
	var advancedFrames = clone(frames);
	var nextPlayer = false;

	// Extract last frame and clone it, so we can update it.
	var last = advancedFrames.length - 1;
	advancedFrames[last] = clone(advancedFrames[last]);

	if (advancedFrames[last].length === 1) {
		// We were awaiting the first roll. Check to see if it was a strike.
		if (pins === 10) {
			// Strike roll, next players turn.
			advancedFrames[last] = [10];
			nextPlayer = true;
		} else {
			// Normal roll, make a second roll.
			advancedFrames[last] = [pins, null];
		}
	} else {
		// We were awaiting the second roll, next players turn.
		advancedFrames[last][1] = pins;
		nextPlayer = true;
	}

	return {
		nextPlayer: nextPlayer,
		advanced: advancedFrames
	};
}

/**
 * Given the number of pins knocked down and an array of players, this function
 * advances the state to the next roll. It can be that the same player has a second
 * roll or a new player must make his first roll. The players is represented as an
 * array of player objects. A player object contains `.name` and `.frames`
 * properties. The frames is described above in the `advanceFramesToNextRoll()`
 * function.
 *
 * Returns an object with the property `.pinsRemaining` telling how many pins
 * there are left (or 10 for new players/rolls) and the updated players in
 * property `.advanced`.
 */
function advancePlayersToNextRoll(pins, players) {
	// Figure out the player that is currently playing.
	var currentPlayerIndex = indexOfCurrentPlayer(players);

	// Update players while keeping data immutable.
	var advancedPlayers = clone(players);
	advancedPlayers[currentPlayerIndex] = clone(advancedPlayers[currentPlayerIndex]);

	// Given the roll, advance the frames for the current player.
	var frames = advanceFramesToNextRoll(pins, advancedPlayers[currentPlayerIndex].frames);
	advancedPlayers[currentPlayerIndex].frames = frames.advanced;

	// If it is the next players turn, advance to the next player.
	if (frames.nextPlayer) {
		// Calculate index of next player and make the user roll.
		var nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		advancedPlayers = advanceToNextPlayer(nextPlayerIndex, advancedPlayers);
	}

	return {
		pinsRemaining: frames.nextPlayer ? 10 : 10 - pins,
		advanced: advancedPlayers
	};
}

/**
 * Given an array of players, this functions advances the state where the first
 * player must make the first roll. A uncompleted roll is represented as the
 * null value in the frames array.
 *
 * Returns an updated array of players.
 */
function advanceToNextPlayer(index, players) {
	// Update players while keeping data immutable.
	players = clone(players);
	players[index] = clone(players[index]);
	players[index].frames = clone(players[index].frames);
	players[index].frames.push([null]);
	return players;
}

/**
 * Given an array of players, return the index of the player with the next roll.
 */
function indexOfCurrentPlayer(players) {
	var framesLength = players[0].frames.length;

	// Iterate through players. The first player that have played fewer frames is
	// still waiting, so pick the player before.
	for (var index = 1; index < players.length; index++) {
		var frames = players[index].frames;
		if (frames.length < framesLength) {
			return index - 1; // pick the player before
		}
	}

	// If all players have played an equal number of frames, it is the last players turn.
	// Remember that the last player has a frame containing null.
	return players.length - 1;
}

exports.advancePlayersToNextRoll = advancePlayersToNextRoll;
exports.advanceFramesToNextRoll = advanceFramesToNextRoll;
exports.advanceToNextPlayer = advanceToNextPlayer;
exports.indexOfCurrentPlayer = indexOfCurrentPlayer;

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
					React.createElement(GameController, {pinsRemaining: this.state.pinsRemaining, running: this.state.players[0].frames.length <= 10, onRoll: this.roll}) :

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
		this.setState({
			running: true,
			players: gameLogic.advanceToNextPlayer(0, this.state.players)
		});
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

		var players = gameLogic.advancePlayersToNextRoll(pins, this.state.players);
		this.setState({
			pinsRemaining: players.pinsRemaining,
			players: players.advanced
		});
	}

});

exports = BowlingScoreApp;

return exports;
})());

// Render the app.
React.render(React.createElement(BowlingScoreApp, null), document.body);

return exports;
})(window.React);; }());