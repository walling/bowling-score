'use strict';

var React = require('react');
var ScoringRow = require('./row');

/**
 * View with the whole scoring table.
 */
var Scoring = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		var self = this;

		return (
			<section className="scoring">
				<table>
					<thead>
						<th className="name">Name</th>
						<th colSpan="2" className="points blue">1</th>
						<th colSpan="2" className="points white">2</th>
						<th colSpan="2" className="points blue">3</th>
						<th colSpan="2" className="points white">4</th>
						<th colSpan="2" className="points blue">5</th>
						<th colSpan="2" className="points white">6</th>
						<th colSpan="2" className="points blue">7</th>
						<th colSpan="2" className="points white">8</th>
						<th colSpan="2" className="points blue">9</th>
						<th colSpan="2" className="points white">10</th>
						<th className="total">Total</th>
					</thead>

					{this.props.players.map(function(player, index) {
						var rowKey = 'scoring-' + index; // key used by React
						var playerId = index + 1;

						// Create each player row in the scoring table.
						return (
							<ScoringRow key={rowKey} playerId={playerId} frames={player.frames} name={player.name} onNameChange={self.nameChanged} />
						);
					})}

				</table>
			</section>
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

module.exports = Scoring;
