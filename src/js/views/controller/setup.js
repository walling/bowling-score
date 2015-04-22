'use strict';

var React = require('react');

/**
 * View for the controller.
 */
var SetupController = React.createClass({

	/**
	 * Renders this view. The Remove Player button is disabled if no players can be removed.
	 */
	render: function() {
		return (
			<section className="setup controller">
				<button disabled={!this.props.canAddPlayer} onClick={this.addPlayerClicked}>Add player</button>
				<button disabled={!this.props.canRemovePlayer} onClick={this.removePlayerClicked}>Remove player</button>
				<button className="highlighted" onClick={this.startGameClicked}>Start game</button>
			</section>
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

module.exports = SetupController;
