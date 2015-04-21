'use strict';

var React = require('react');
var ScoringRow = require('./row');

var Scoring = React.createClass({
	render: function() {
		var scoringRows = this.props.data.map(function(scoringRowData) {
			return (
				<ScoringRow key={scoringRowData.id} data={scoringRowData} />
			);
		});

		return (
			<section className="scoring">
				<table>
					<thead>
						<th className="name">Name</th>
						<th colSpan="2">1</th>
						<th colSpan="2">2</th>
						<th colSpan="2">3</th>
						<th colSpan="2">4</th>
						<th colSpan="2">5</th>
						<th colSpan="2">6</th>
						<th colSpan="2">7</th>
						<th colSpan="2">8</th>
						<th colSpan="2">9</th>
						<th colSpan="2">10</th>
						<th className="total">Total</th>
					</thead>
					{scoringRows}
				</table>
			</section>
		);
	}
});

module.exports = Scoring;
