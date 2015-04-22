'use strict';

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Simple helper function to shallow clone an object or array.
 */
function clone(obj) {
	if (Array.isArray(obj)) {
		return obj.slice();
	} else {
		var copy = {};
		for (var key in obj) {
			if (hasOwn.call(obj, key)) {
				copy[key] = obj[key];
			}
		}
		return copy;
	}
}

/**
 * Given some frames for a player, this function advances to a state where a player
 * can make a new roll. The frames is an array of rolls. A roll is an array with
 * zero, one, or two members, namely the number of knocked down pins. The special
 * value `null` represents a new roll for the player that is not yet completed.
 */
function advanceFramesToNextRoll(frames) {
	if (frames.length === 0) {
		// If no frames for the player yet, he must make a roll in the first frame.
		return [[null]];
	} else {
		// Already played some frames. We look at the last frame to determine whether
		// a new frame is required or just a new roll in the same frame.
		frames = clone(frames);
		var lastIndex = frames.length - 1;
		var lastFrame = frames[lastIndex] = clone(frames[lastIndex]);
		if (lastFrame.length === 0) {
			// No rolls in the frame yet, make a roll.
			lastFrame.push(null);
		} else if (lastFrame.length === 1) {
			if (lastFrame[0] < 10) {
				// Player knocked down less than 10 pins in the first roll, make a second roll.
				lastFrame.push(null);
			} else {
				// Player got a strike in the last roll, create a new frame.
				frames.push([null]);
			}
		} else {
			// Player had two rolls in last frame, make a roll in a new frame.
			frames.push([null]);
		}
		return frames;
	}
}

/**
 * Given an array of players, advances to a state where a player must make a roll.
 * It can be that the same player has a second roll or a new player must make his
 * first roll. The players is represented as an array of player objects. A player
 * object contains `.name` and `.frames` properties. The frames is described above
 * in the `advanceFramesToNextRoll()` function.
 */
function advanceToNextRoll(players) {
	// Update players while keeping data immutable.
	players = clone(players);
	players[0] = clone(players[0]);
	players[0].frames = advanceFramesToNextRoll(players[0].frames);
	return players;
}

exports.advanceToNextRoll = advanceToNextRoll;
