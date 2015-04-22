'use strict';

/*  ***** Adapted from views/scoring/row.js, but not yet tested *****

function rollsData(frame, key, index) {
	// If first roll is not a strike, the player must roll one more time.
	if (frame.length === 1 && frame[0] < 10) {
		frame = [frame[0], null];
	}

	if (frame.length === 1) {
		// If there was only one roll in this frame, it must be a strike.
		return [
			{ frameIndex: index, key: key + '-roll', colSpan: 2, type: 'strike', knockedDown: 10 }
		];

	} else if (frame.length === 2) {
		// It is a spare if the total number of pins knocked down is 10.
		var first = frame[0] | 0;
		var second = frame[1] | 0;
		var isSpare = (first + second === 10);
		var firstType =
			(first === null) ? 'next' :
			'normal';
		var secondType =
			isSpare ? 'spare' :
			(first !== null && second === null) ? 'next' :
			'normal';

		// If there was two rolls in this frame, we create two columns with colspan=1.
		return [
			{ frameIndex: index, key: key + '-roll-1', colSpan: 1, type: firstType, knockedDown: first },
			{ frameIndex: index, key: key + '-roll-2', colSpan: 1, type: secondType, knockedDown: second }
		];

	} else {
		// Do not show any information in this frame.
		return [
			{ frameIndex: index, key: key + '-roll', colSpan: 2, type: 'empty', knockedDown: 0 }
		];
	}
}

function framesData(frames, key) {
	var rolls = [];
	var points = [];
	var total = 0;

	// Calculate points for all frames as well as total.
	for (var index = 0; index < 10; index++) {
		var frameKey = key + '-frame-' + index;
		var frame = frames[index] || [];

		// Collect all the rolls for the given player. We do it this way instead of a simple
		// `.map`, since there can be either one or two rolls in each frame, so we don't know
		// the exact number of output columns in the table beforehand.
		rolls = rolls.concat(rollsData(frame, frameKey, index));

		points.push({
			key: frameKey + '-points',
			points: null
		});
	}

	return {
		rolls: rolls,
		points: points,
		total: total
	};
}
*/

function framesData(frames) {
	var rolls = [];
	var points = [];

	for (var index = 0; index < 10; index++) {
		rolls.push({
			frameIndex: index,
			type: 'empty',
			colSpan: 2,
			knockedDown: 0
		});

		points.push({
			frameIndex: index,
			points: null
		});
	}

	return {
		rolls: rolls,
		points: points,
		total: 0
	};
}

exports.data = framesData;
