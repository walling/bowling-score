'use strict';

var React = require('react');
var Header = require('./header');
var Scoring = require('./scoring');
var SetupController = require('./controller/setup');

/**
 * View for the app.
 */
var App = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			<section className="app">
				<Header/>
				<Scoring players={this.state.players} />
				<SetupController canRemovePlayer={this.canRemovePlayer()} onAddPlayer={this.addPlayer} onRemovePlayer={this.removePlayer} onStartGame={this.startGame} />
			</section>
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
		this.state.players.push({ frames: [] });
		this.setState({ players: this.state.players });
	},

	/**
	 * Event when remove player is clicked. Removes the last player
	 * from the list, except when there is only one player left.
	 */
	removePlayer: function() {
		if (this.canRemovePlayer()) {
			this.state.players.pop();
			this.setState({ players: this.state.players });
		}
	}

});

module.exports = App;
