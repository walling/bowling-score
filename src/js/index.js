'use strict';

var React = require('react');
var App = require('./views/app');

var scoringTableData = [
	{ id: 1, name: 'David' },
	{ id: 2, name: 'Dennis' },
	{ id: 3, name: 'Diane' }
];

React.render(
	<App scoringTableData={scoringTableData}/>,
	document.body
);
