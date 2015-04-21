'use strict';

var React = require('react');

/**
 * View for the controller.
 */
var SetupController = React.createClass({
	render: function() {
		return (
			<section className="setup controller">
				<button onClick={this.addPlayerClicked}>Add player</button>
				<button onClick={this.removePlayerClicked}>Remove player</button>
				<button className="highlighted">Start game</button>
			</section>
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

module.exports = SetupController;
