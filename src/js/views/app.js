'use strict';

var React = require('react');
var Header = require('./header');
var Scoring = require('./scoring');
var SetupController = require('./controller/setup');

/**
 * View for the app.
 */
var App = React.createClass({
	render: function() {
		return (
			<section className="app">
				<Header/>
				<Scoring players={this.state.players} />
				<SetupController onAddPlayer={this.addPlayer} onRemovePlayer={this.removePlayer} onStartGame={this.startGame} />
			</section>
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

module.exports = App;
