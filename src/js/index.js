'use strict';

var React = require('react');
var App = require('./views/app');

/**
 * Creates test data with frames for a given player.
 */
function createTestFrames() {
	var frames = [];
	for (var i = 1; i <= 10; i++) {
		frames.push({
			rolls: Math.random() > 0.5 ? [3, 4] : [7],
			points: 7
		});
	}
	return frames;
}

// Mock-up data with three players.
var scoringTableData = [
	{ id: 1, name: 'David', frames: createTestFrames(), total: 70 },
	{ id: 2, name: 'Dennis', frames: createTestFrames(), total: 70 },
	{ id: 3, name: 'Diane', frames: createTestFrames(), total: 70 }
];

// Render the app.
React.render(
	<App scoringTableData={scoringTableData}/>,
	document.body
);
