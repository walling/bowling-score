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

var ScoringRow = React.createClass({displayName: "ScoringRow",
	render: function() {
		var data = this.props.data;
		var rowId = 'scoring-row-' + data.id;

		var rolls = [];
		data.frames.forEach(function(frameData) {
			var frameId = rowId + '-frame-' + frameData.id;
			var rollsData = frameData.rolls;

			if (rollsData.length === 1) {
				rolls.push(
					React.createElement("td", {key: frameId + '-roll-1', colSpan: "2", className: 'points ' + frameData.color}, rollsData[0])
				);
			} else if (rollsData.length === 2) {
				rolls.push(
					React.createElement("td", {key: frameId + '-roll-1', colSpan: "1", className: 'points ' + frameData.color}, rollsData[0]),
					React.createElement("td", {key: frameId + '-roll-2', colSpan: "1", className: 'points ' + frameData.color}, rollsData[1])
				);
			}
		});

		return (
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					React.createElement("td", {className: "name", rowSpan: "2"}, data.name), 
					rolls, 
					React.createElement("td", {className: "total", rowSpan: "2"}, data.total)
				), 
				React.createElement("tr", null, 
					data.frames.map(function(frameData) {
						var frameId = rowId + '-frame-' + frameData.id;

						return (
							React.createElement("td", {key: frameId, colSpan: "2", className: 'points ' + frameData.color}, frameData.points)
						);
					})
				)
			)
		);
	}
});

exports = ScoringRow;

return exports;
})());

var Scoring = React.createClass({displayName: "Scoring",
	render: function() {
		var data = this.props.data;

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
					data.map(function(scoringRowData) {
						var rowId = 'scoring-row-' + scoringRowData.id;

						return (
							React.createElement(ScoringRow, {key: rowId, data: scoringRowData})
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
	React.createElement(App, {scoringTableData: scoringTableData}),
	document.body
);

return exports;
})(window.React);; }());