'use strict';

var React = require('react');
var Header = require('./header');
var Scoring = require('./scoring');

var App = React.createClass({
	render: function() {
		return (
			<section className="app">
				<Header/>
				<Scoring data={this.props.scoringTableData} />
			</section>
		);
	}
});

module.exports = App;
