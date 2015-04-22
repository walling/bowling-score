'use strict';

var React = require('react');

/**
 * View for the app header/title.
 */
var Header = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		return (
			<header>
				<h1>Bowling Score</h1>
				<p>by <a href="https://www.bjarkewalling.com/en?utm_source=bowling-score&amp;utm_medium=web&amp;utm_content=header&amp;utm_campaign=project" target="_blank">Bjarke Walling</a></p>
			</header>
		);
	}

});

module.exports = Header;
