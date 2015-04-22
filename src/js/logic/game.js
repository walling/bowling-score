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
 * Given the number of pins knocked down and some frames for a player, this function
 * advances to a state where a player can make a new roll. The frames is an array of
 * rolls. A roll is an array with zero, one, or two members, namely the number of
 * knocked down pins. The special value `null` represents a new roll for the player
 * that is not yet completed.
 *
 * Returns an object with boolean property `.nextPlayer` and the updated frames in
 * property `.advanced`.
 */
function advanceFramesToNextRoll(pins, frames) {
	// Update frames while keeping data immutable.
	var advancedFrames = clone(frames);
	var nextPlayer = false;

	// Extract last frame and clone it, so we can update it.
	var last = advancedFrames.length - 1;
	advancedFrames[last] = clone(advancedFrames[last]);

	if (advancedFrames[last].length === 1) {
		// We were awaiting the first roll. Check to see if it was a strike.
		if (pins === 10) {
			// Strike roll, next players turn.
			advancedFrames[last] = [10];
			nextPlayer = true;
		} else {
			// Normal roll, make a second roll.
			advancedFrames[last] = [pins, null];
		}
	} else {
		// We were awaiting the second roll, next players turn.
		advancedFrames[last][1] = pins;
		nextPlayer = true;
	}

	return {
		nextPlayer: nextPlayer,
		advanced: advancedFrames
	};
}

/**
 * Given the number of pins knocked down and an array of players, this function
 * advances the state to the next roll. It can be that the same player has a second
 * roll or a new player must make his first roll. The players is represented as an
 * array of player objects. A player object contains `.name` and `.frames`
 * properties. The frames is described above in the `advanceFramesToNextRoll()`
 * function.
 *
 * Returns an object with the property `.pinsRemaining` telling how many pins
 * there are left (or 10 for new players/rolls) and the updated players in
 * property `.advanced`.
 */
function advancePlayersToNextRoll(pins, players) {
	// Figure out the player that is currently playing.
	var currentPlayerIndex = indexOfCurrentPlayer(players);

	// Update players while keeping data immutable.
	var advancedPlayers = clone(players);
	advancedPlayers[currentPlayerIndex] = clone(advancedPlayers[currentPlayerIndex]);

	// Given the roll, advance the frames for the current player.
	var frames = advanceFramesToNextRoll(pins, advancedPlayers[currentPlayerIndex].frames);
	advancedPlayers[currentPlayerIndex].frames = frames.advanced;

	// If it is the next players turn, advance to the next player.
	if (frames.nextPlayer) {
		// Calculate index of next player and make the user roll.
		var nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		advancedPlayers = advanceToNextPlayer(nextPlayerIndex, advancedPlayers);
	}

	return {
		pinsRemaining: frames.nextPlayer ? 10 : 10 - pins,
		advanced: advancedPlayers
	};
}

/**
 * Given an array of players, this functions advances the state where the first
 * player must make the first roll. A uncompleted roll is represented as the
 * null value in the frames array.
 *
 * Returns an updated array of players.
 */
function advanceToNextPlayer(index, players) {
	// Update players while keeping data immutable.
	players = clone(players);
	players[index] = clone(players[index]);
	players[index].frames = clone(players[index].frames);
	players[index].frames.push([null]);
	return players;
}

/**
 * Given an array of players, return the index of the player with the next roll.
 */
function indexOfCurrentPlayer(players) {
	var framesLength = players[0].frames.length;

	// Iterate through players. The first player that have played fewer frames is
	// still waiting, so pick the player before.
	for (var index = 1; index < players.length; index++) {
		var frames = players[index].frames;
		if (frames.length < framesLength) {
			return index - 1; // pick the player before
		}
	}

	// If all players have played an equal number of frames, it is the last players turn.
	// Remember that the last player has a frame containing null.
	return players.length - 1;
}

exports.advancePlayersToNextRoll = advancePlayersToNextRoll;
exports.advanceFramesToNextRoll = advanceFramesToNextRoll;
exports.advanceToNextPlayer = advanceToNextPlayer;
exports.indexOfCurrentPlayer = indexOfCurrentPlayer;
