'use strict';

var React = require('react');
var ScoringRow = require('./row');

/**
 * View with the whole scoring table.
 */
var Scoring = React.createClass({
	render: function() {
		var tableData = this.props.data;

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
					{tableData.map(function(scoringRowData) {
						// Key used by React.
						var rowId = 'scoring-row-' + scoringRowData.id;

						// Create each player row in the scoring table.
						return (
							<ScoringRow key={rowId} data={scoringRowData} />
						);
					})}
				</table>
			</section>
		);
	}
});

module.exports = Scoring;
