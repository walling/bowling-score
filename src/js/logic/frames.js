'use strict';

/**
 * Normalises the given rolls in a frame. Rolls are represented as an array of pins
 * knocked down. The result is a list of rolls as being presented in the scoreboard.
 */
function rollsData(frame, frameIndex) {
	var isStrike, isSpare, isNext, firstType, secondType;

	if (frame.length === 0) {
		// No rolls in frame, just return empty roll.
		return [
			{ frameIndex: frameIndex, type: 'empty', colSpan: 2, knockedDown: 0 }
		];

	} else if (frame.length === 1) {
		// One roll in frame. Check to see if it is a strike or not.
		isStrike = (frame[0] === 10);

		if (isStrike) {
			// A strike, there is no second roll.
			return [
				{ frameIndex: frameIndex, type: 'strike', colSpan: 2, knockedDown: 10 }
			];
		} else {
			// A single normal roll, the second roll is empty.
			// Check whether the first roll is the next one.
			isNext = (frame[0] === null);
			firstType = isNext ? 'next' : 'normal';

			return [
				{ frameIndex: frameIndex, type: firstType, colSpan: 1, knockedDown: frame[0] | 0 },
				{ frameIndex: frameIndex, type: 'empty', colSpan: 1, knockedDown: 0 },
			];
		}

	} else {
		// Two rolls in frame. Check to see if it is a spare or not.
		isSpare = (frame[0] + frame[1] === 10);

		// Check to see if the second roll is the next one.
		isNext = (frame[1] === null);

		// Determine type of second roll.
		secondType = isNext ? 'next' : isSpare ? 'spare' : 'normal';

		return [
			{ frameIndex: frameIndex, type: 'normal', colSpan: 1, knockedDown: frame[0] | 0 },
			{ frameIndex: frameIndex, type: secondType, colSpan: 1, knockedDown: frame[1] | 0 }
		];
	}
}

/**
 * Given rolls data in a frame, this function calculates the base points, ie. the sum
 * of the knocked down pins. It also determines the frame type: empty, normal, strike,
 * spare.
 */
function pointsData(rolls, frameIndex) {
	if (rolls.length === 1 && rolls[0].type === 'strike') {
		// Strike roll scores 10 points.
		return { frameIndex: frameIndex, type: 'strike', points: 10 };

	} else if (rolls.length === 2) {
		// Spare or normal rolls scores number of knocked down pins (which is 10 for spare).
		var totalKnockedDown = rolls[0].knockedDown + rolls[1].knockedDown;

		return {
			frameIndex: frameIndex,
			type: (totalKnockedDown === 10) ? 'spare' : 'normal',
			points: totalKnockedDown
		};
	}

	// Frame is not yet completed.
	return {
		frameIndex: frameIndex,
		type: 'empty',
		points: null
	};
}

/**
 * For given player frames, collect all rolls, frame points and total. The frames are
 * represented with an array or rolls. Rolls are represented as an array of pins
 * knocked down. Null represents the next roll. For example,
 *
 *     [ [1, 3], [10], [7, null] ]
 *
 * represents a roll of 1 and 3 in the first frame, a strike in the second frame,
 * followed by a roll of 7. The second roll in the third frame is the next one.
 */
function framesData(frames) {
	var rolls = [];
	var points = [];

	// Shallow clone frames, so we do not mutate the original object.
	// Ensure that there are precisely ten frames. Insert empty frames as necessary.
	frames = frames.slice(0, 10);
	for (var i = 0; i < 10; i++) {
		frames[i] = frames[i] || [];
	}

	frames.forEach(function(frame, frameIndex) {
		// Collect all the rolls for the given player.
		var frameRolls = rollsData(frame, frameIndex);
		rolls = rolls.concat(frameRolls);

		// Collect points in each frame.
		points.push(pointsData(frameRolls, frameIndex));
	});

	return {
		rolls: rolls,
		points: points,
		total: 0
	};
}

exports.rollsData = rollsData;
exports.pointsData = pointsData;
exports.data = framesData;
