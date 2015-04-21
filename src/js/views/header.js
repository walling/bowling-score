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
			</header>
		);
	}

});

module.exports = Header;
