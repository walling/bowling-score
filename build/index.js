(function(){ "use strict"; window.app = (function(__small$_mod_0) {
var exports = {};
'use strict';

var React = __small$_mod_0;
var App = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;
var Header = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;

/**
 * View for the app header/title.
 */
var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("header", null, 
				React.createElement("h1", null, "Bowling Score")
			)
		);
	}
});

exports = Header;

return exports;
})());
var Scoring = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;
var ScoringRow = ((function() {
var exports = {};
'use strict';

var React = __small$_mod_0;

/**
 * Creates alternating color for each frame.
 */
function frameColor(index) {
	return (index % 2 === 0) ? 'blue' : 'white';
}

/**
 * Default name for a given player.
 */
function placeholderName(id) {
	return 'Player ' + id;
}

/**
 * View for one row in the scoring table representing a single player.
 */
var ScoringRow = React.createClass({displayName: "ScoringRow",
	render: function() {
		var rowData = this.props.data;

		// Key used by React.
		var rowKey = 'scoring-row-' + rowData.id;

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns beforehand.
		var rolls = [];
		rowData.frames.forEach(function(frameData, index) {
			var rollsData = frameData.rolls;

			// Key used by React.
			var frameKey = rowKey + '-frame-' + index;

			if (rollsData.length === 1) {
				// If there was only one roll in this frame, it must be a strike.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls strike ' + frameColor(index)}, "×")
				);

			} else if (rollsData.length === 2) {
				// We insert class name 'spare' if the total number of pins knocked down is 10.
				var spare = ((rollsData[0] | 0) + (rollsData[1] | 0) === 10) ? 'spare ' : '';

				// If there was two rolls in this frame, we create two columns with colspan=1.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll-1', colSpan: "1", className: 'points rolls ' + frameColor(index)}, rollsData[0]),
					React.createElement("td", {key: frameKey + '-roll-2', colSpan: "1", className: 'points rolls ' + spare + ' ' + frameColor(index)}, spare ? '/' : rollsData[1])
				);

			} else {
				// Do not show any information in this frame.
				rolls.push(
					React.createElement("td", {key: frameKey + '-roll', colSpan: "2", className: 'points rolls ' + frameColor(index)}, " ")
				);
			}
		});

		// View for one row (ie. one player) in the scoring table.
		return (
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					rowData.editName
					? React.createElement("td", {className: "edit name", rowSpan: "2"}, 
							React.createElement("input", {type: "text", ref: "name", placeholder: placeholderName(rowData.id), defaultValue: rowData.name, onBlur: this.editNameDone, onKeyDown: this.editNameKey})
						)
					: React.createElement("td", {className: "name", rowSpan: "2", onClick: this.editNameBegin}, rowData.name || placeholderName(rowData.id)), 
					
					rolls, 
					React.createElement("td", {className: "total", rowSpan: "2"}, rowData.total)
				), 
				React.createElement("tr", null, 
					rowData.frames.map(function(frameData, index) {
						// Key used by React.
						var frameKey = rowKey + '-frame-' + index;

						// Insert the number of points in each frame.
						return (
							React.createElement("td", {key: frameKey, colSpan: "2", className: 'points frame ' + frameColor(index)}, frameData.points || '\u00A0')
						);
					})
				)
			)
		);
	},

	editNameBegin: function(event) {
		event.preventDefault();
		var data = this.props.data;
		data.editName = true;
		this.setState({ data: data }, function() {
			var inputElement = React.findDOMNode(this.refs.name);
			inputElement.select();
			inputElement.focus();
		});
	},

	editNameDone: function(event) {
		event.preventDefault();

		var data = this.props.data;
		data.editName = false;
		data.name = React.findDOMNode(this.refs.name).value.trim();
		this.setState({ data: data });
	},

	editNameKey: function(event) {
		var data = this.props.data;

		if (event.which === 27) {
			// Escape key: Cancel editing and revert to old name.
			event.preventDefault();
			data.editName = false;
			this.setState({ data: data });

		} else if (event.which === 13) {
			// Enter key: Accept new name.
			event.preventDefault();
			data.editName = false;
			data.name = React.findDOMNode(this.refs.name).value.trim();
			this.setState({ data: data });
		}
	}
});

exports = ScoringRow;

return exports;
})());

/**
 * View with the whole scoring table.
 */
var Scoring = React.createClass({displayName: "Scoring",
	render: function() {
		var tableData = this.props.data;

		return (
			React.createElement("section", {className: "scoring"}, 
				React.createElement("table", null, 
					React.createElement("thead", null, 
						React.createElement("th", {className: "name"}, "Name"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "1"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "2"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "3"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "4"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "5"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "6"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "7"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "8"), 
						React.createElement("th", {colSpan: "2", className: "points blue"}, "9"), 
						React.createElement("th", {colSpan: "2", className: "points white"}, "10"), 
						React.createElement("th", {className: "total"}, "Total")
					), 
					tableData.map(function(scoringRowData) {
						// Key used by React.
						var rowKey = 'scoring-row-' + scoringRowData.id;

						// Create each player row in the scoring table.
						return (
							React.createElement(ScoringRow, {key: rowKey, data: scoringRowData})
						);
					})
				)
			)
		);
	}
});

exports = Scoring;

return exports;
})());

/**
 * View for the app.
 */
var App = React.createClass({displayName: "App",
	render: function() {
		return (
			React.createElement("section", {className: "app"}, 
				React.createElement(Header, null), 
				React.createElement(Scoring, {data: this.props.scoringTableData})
			)
		);
	}
});

exports = App;

return exports;
})());

/**
 * Creates test data with frames for a given player.
 */
function createTestFrames() {
	var frames = [];
	for (var i = 1; i <= 10; i++) {
		frames.push({
			rolls: Math.random() > 0.5 ? [3, 7] : [10],
			points: 10
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
	React.createElement(App, {scoringTableData: scoringTableData}),
	document.body
);

return exports;
})(window.React);; }());