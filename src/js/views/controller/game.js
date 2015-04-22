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
		// If the game ended, display that.
		var pinsPlaceholderText =
			(!this.props.running) ? 'Game ended' :
			(this.props.pinsRemaining === 10) ? 'Knock down pins' :
			this.props.pinsRemaining + ' remaining';

		// Text for auto-play toggle button.
		var autoPlayText =
			(!this.props.running) ? 'New game' :
			this.state.autoPlay ? 'Stop auto-play' :
			'Auto-play game';

		return (
			<section className="game controller">
				<form noValidate onSubmit={this.rollSubmitted}>
					<input disabled={!this.props.running || this.state.autoPlay} ref="pinsInput" autoFocus type="number" min="0" max={this.props.pinsRemaining} step="1" required placeholder={pinsPlaceholderText} />
					<button disabled={!this.props.running || this.state.autoPlay} type="submit">Next roll</button>
				</form>

				<button className="highlighted" onClick={this.autoPlayClicked}>
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

	componentWillReceiveProps: function(newProps) {
		// If game is not longer running, reset input field and stop auto-play.
		if (!newProps.running) {
			React.findDOMNode(this.refs.pinsInput).value = '';

			if (this.autoPlayTimer) {
				clearInterval(this.autoPlayTimer);
				this.autoPlayTimer = null;
				this.setState({ autoPlay: false });
			}
		}
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
	 * A special case is when the game ended, this button creates a new game.
	 */
	autoPlayClicked: function(event) {
		event.preventDefault();
		if (this.props.running) {
			this.toggleAutoPlay();
		} else if (this.props.onNewGame) {
			this.props.onNewGame();
		}
	},

	/**
	 * Timer event (fires repeatedly) when auto-play is enabled.
	 */
	autoPlayTimerFunction: function() {
		// Calculate random number of pins knocked down between 1 and number of pins remaining.
		// In a real game you could potentially not knock down any pins, but the specification
		// states that the number should be between 1 and 10, although I changed it to knock
		// down the maximum number of pins remaining. In a second roll you usually don't have
		// all pins remaining.
		var pins = ((Math.random() * this.props.pinsRemaining) | 0) + 1;

		// Show number of pins.
		React.findDOMNode(this.refs.pinsInput).value = pins;

		// Propagate event to parent view.
		if (this.props.onRoll) {
			this.props.onRoll(pins);
		}
	}

});

module.exports = GameController;
