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
		return (
			React.createElement("tbody", null, 
				React.createElement("tr", null, 
					React.createElement("td", {className: "name", rowSpan: "2"}, this.props.data.name), 
					React.createElement("td", {colSpan: "1"}, "4"), 
					React.createElement("td", {colSpan: "1"}, "3"), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {className: "total", rowSpan: "2"}, "7")
				), 
				React.createElement("tr", null, 
					React.createElement("td", {colSpan: "2"}, "7"), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"}), 
					React.createElement("td", {colSpan: "2"})
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
		var scoringRows = this.props.data.map(function(scoringRowData) {
			return (
				React.createElement(ScoringRow, {key: scoringRowData.id, data: scoringRowData})
			);
		});

		return (
			React.createElement("section", {className: "scoring"}, 
				React.createElement("table", null, 
					React.createElement("thead", null, 
						React.createElement("th", {className: "name"}, "Name"), 
						React.createElement("th", {colSpan: "2"}, "1"), 
						React.createElement("th", {colSpan: "2"}, "2"), 
						React.createElement("th", {colSpan: "2"}, "3"), 
						React.createElement("th", {colSpan: "2"}, "4"), 
						React.createElement("th", {colSpan: "2"}, "5"), 
						React.createElement("th", {colSpan: "2"}, "6"), 
						React.createElement("th", {colSpan: "2"}, "7"), 
						React.createElement("th", {colSpan: "2"}, "8"), 
						React.createElement("th", {colSpan: "2"}, "9"), 
						React.createElement("th", {colSpan: "2"}, "10"), 
						React.createElement("th", {className: "total"}, "Total")
					), 
					scoringRows
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

var scoringTableData = [
	{ id: 1, name: 'David' },
	{ id: 2, name: 'Dennis' },
	{ id: 3, name: 'Diane' }
];

React.render(
	React.createElement(App, {scoringTableData: scoringTableData}),
	document.body
);

return exports;
})(window.React);; }());