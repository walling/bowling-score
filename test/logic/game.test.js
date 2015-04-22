'use strict';

var should = require('chai').should();
var game = require('../../src/js/logic/game');

/**
 * Helper function to create a single player game with given frames.
 */
function singlePlayerFrames(frames) {
	return [ { frames: frames, name: 'Player 1' } ];
}

describe('logic/game', function() {
	describe('.advanceToNextRoll()', function() {

		it('advances the same player, when there is only one player', function() {
			var players = game.advanceToNextRoll(singlePlayerFrames([]));
			players.should.have.length(1);
			players[0].frames.should.deep.equal([[null]]);

			game.advanceToNextRoll(singlePlayerFrames([
				[3, 4], [9, 1], []
			]))[0].frames.should.deep.equal([
				[3, 4], [9, 1], [null]
			]);

			game.advanceToNextRoll(singlePlayerFrames([
				[3, 4], [9, 1], [7]
			]))[0].frames.should.deep.equal([
				[3, 4], [9, 1], [7, null]
			]);

			game.advanceToNextRoll(singlePlayerFrames([
				[3, 4], [9, 1], [10]
			]))[0].frames.should.deep.equal([
				[3, 4], [9, 1], [10], [null]
			]);
		});

	});
});
