'use strict';

var React = require('react');
var Header = require('./header');
var Scoring = require('./scoring');
var GameController = require('./controller/game');
var SetupController = require('./controller/setup');
var gameLogic = require('../logic/game');

/**
 * View for the app.
 */
var BowlingScoreApp = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			<section className="bowling-score-app">
				<Header/>
				<Scoring players={this.state.players} onNameChange={this.nameChanged} />

				{this.state.running ?

					// Show game controller when game is running.
					<GameController pinsRemaining={this.state.pinsRemaining} running={this.state.players[0].frames.length <= 10} onRoll={this.roll} onNewGame={this.newGame} /> :

					// Show setup controller (to add/remove players and start game), when game is not yet running.
					<SetupController canAddPlayer={this.canAddPlayer()} canRemovePlayer={this.canRemovePlayer()} onAddPlayer={this.addPlayer} onRemovePlayer={this.removePlayer} onStartGame={this.startGame} />
				}

			</section>
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
		// Defensive programming: Ensure pins are in the correct interval.
		pins = Math.max(0, Math.min(this.state.pinsRemaining, pins));

		// Advance to new game state.
		var players = gameLogic.advancePlayersToNextRoll(pins, this.state.players);
		this.setState({
			pinsRemaining: players.pinsRemaining,
			players: players.advanced
		});
	},

	/**
	 * Event when a new game is requested.
	 */
	newGame: function() {
		this.replaceState(this.getInitialState());
	}

});

module.exports = BowlingScoreApp;
