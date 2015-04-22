'use strict';

var React = require('react');

/**
 * View for the controller.
 */
var GameController = React.createClass({

	/**
	 * Renders this view.
	 */
	render: function() {
		// If there are 10 pins remaining, show default text, otherwise the number of remaining pins.
		var pinsPlaceholderText = (this.props.pinsRemaining === 10) ?
			'Knocked down pins' :
			this.props.pinsRemaining + ' remaining';

		return (
			<section className="game controller">
				<form noValidate onSubmit={this.rollSubmitted}>
					<input disabled={!this.props.running} ref="pinsInput" autoFocus type="number" min="0" max={this.props.pinsRemaining} step="1" required placeholder={pinsPlaceholderText} />
					<button disabled={!this.props.running} type="submit">Next roll</button>
				</form>
				<button disabled={!this.props.running} className="highlighted" onClick={this.autoPlayClicked}>Auto-play game</button>
			</section>
		);
	},

	rollSubmitted: function(event) {
		event.preventDefault();

		// Get number of pins knocked down, as entered in the input field.
		var pinsInput = React.findDOMNode(this.refs.pinsInput);
		var pinsText = pinsInput.value.trim();
		var pins = pinsText | 0; // convert to integer

		// Number of knocked down pins must be an integer between 0 and pins remaining.
		if (!(/^[0-9]{1,2}$/.test(pinsText) && pins >= 0 && pins <= this.props.pinsRemaining)) {
			pinsInput.select();
			pinsInput.focus();
			return;
		}

		// Empty input element and return focus.
		pinsInput.value = '';
		pinsInput.focus();
	},

	autoPlayClicked: function(event) {
		event.preventDefault();
	}

});

module.exports = GameController;
