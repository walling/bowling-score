'use strict';

var React = require('react');
var App = require('./views/app');

function createFrames() {
	var frames = [];
	for (var i = 1; i <= 10; i++) {
		frames.push({
			id: i,
			color: (i % 2 === 1) ? 'blue' : 'white',
			rolls: Math.random() > 0.5 ? [3, 4] : [7],
			points: 7
		});
	}
	return frames;
}

var scoringTableData = [
	{ id: 1, name: 'David', frames: createFrames(), total: 70 },
	{ id: 2, name: 'Dennis', frames: createFrames(), total: 70 },
	{ id: 3, name: 'Diane', frames: createFrames(), total: 70 }
];

React.render(
	<App scoringTableData={scoringTableData}/>,
	document.body
);
