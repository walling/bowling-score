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

		// Text for auto-play toggle button.
		var autoPlayText = this.state.autoPlay ?
			'Stop auto-play' :
			'Auto-play game';

		return (
			<section className="game controller">
				<form noValidate onSubmit={this.rollSubmitted}>
					<input disabled={!this.props.running || this.state.autoPlay} ref="pinsInput" autoFocus type="number" min="0" max={this.props.pinsRemaining} step="1" required placeholder={pinsPlaceholderText} />
					<button disabled={!this.props.running || this.state.autoPlay} type="submit">Next roll</button>
				</form>

				<button disabled={!this.props.running} className="highlighted" onClick={this.autoPlayClicked}>
					{autoPlayText}
				</button>
			</section>
		);
	},

	/**
	 * Initial state is that auto-play is disabled.
	 */
	getInitialState: function() {
		return {
			autoPlay: false
		};
	},

	/**
	 * Helper function that enables/disables auto-play.
	 */
	toggleAutoPlay: function() {
		// Reset value in input field, if any.
		var pinsInput = React.findDOMNode(this.refs.pinsInput);
		pinsInput.value = '';

		// Stop auto-play timer, if any.
		if (this.autoPlayTimer) {
			clearInterval(this.autoPlayTimer);
			this.autoPlayTimer = null;
		}

		// Toggle auto-play state.
		var autoPlay = !this.state.autoPlay;
		this.setState({ autoPlay: autoPlay }, function() {
			// When exiting auto-play, return focus to input element.
			if (!autoPlay) {
				pinsInput.value = '';
				pinsInput.focus();
			}
		});

		// Start timer, if enabling auto-play.
		if (autoPlay) {
			this.autoPlayTimer = setInterval(this.autoPlayTimerFunction, 100);
		}
	},

	/**
	 * Event when a roll is manually submitted.
	 */
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

		// Propagate event to parent view.
		if (this.props.onRoll) {
			this.props.onRoll(pins);
		}
	},

	/**
	 * Event when the auto-play toggle button is clicked.
	 */
	autoPlayClicked: function(event) {
		event.preventDefault();
		this.toggleAutoPlay();
	},

	/**
	 * Timer event (fires repeatedly) when auto-play is enabled.
	 */
	autoPlayTimerFunction: function() {
		// Calculate random number of pins knocked down based on the number of pins remaining.
		var pins = (Math.random() * (this.props.pinsRemaining + 1)) | 0;

		// Show number of pins.
		React.findDOMNode(this.refs.pinsInput).value = pins;

		// Propagate event to parent view.
		if (this.props.onRoll) {
			this.props.onRoll(pins);
		}
	}

});

module.exports = GameController;
