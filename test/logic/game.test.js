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
	describe('.advancePlayersToNextRoll()', function() {

		it('returns the number of pins remaining', function() {
			var players = game.advancePlayersToNextRoll(8, singlePlayerFrames([ [null] ]));
			players.pinsRemaining.should.equal(2);

			players = game.advancePlayersToNextRoll(8, singlePlayerFrames([ [1, null] ]));
			players.pinsRemaining.should.equal(10);
		});

		it('advances the same player, when there is only one player', function() {
			var players = game.advancePlayersToNextRoll(8, singlePlayerFrames([ [null] ]));
			players.advanced.should.have.length(1);
			players.advanced[0].frames.should.deep.equal([ [8, null] ]);

			game.advancePlayersToNextRoll(10, singlePlayerFrames([
				[3, 4], [9, 1], [null]
			])).advanced[0].frames.should.deep.equal([
				[3, 4], [9, 1], [10], [null]
			]);

			game.advancePlayersToNextRoll(2, singlePlayerFrames([
				[3, 4], [9, 1], [7, null]
			])).advanced[0].frames.should.deep.equal([
				[3, 4], [9, 1], [7, 2], [null]
			]);

			game.advancePlayersToNextRoll(1, singlePlayerFrames([
				[3, 4], [9, 1], [10], [null]
			])).advanced[0].frames.should.deep.equal([
				[3, 4], [9, 1], [10], [1, null]
			]);
		});

	});

	describe('.advanceToNextPlayer()', function() {

		it('begins the game for a single player', function() {
			var players = game.advanceToNextPlayer(0, singlePlayerFrames([]));
			players.should.have.length(1);
			players[0].frames.should.deep.equal([[null]]);
		});

		it('begins the game for a multiple players', function() {
			var players = game.advanceToNextPlayer(0, [
				{ name: 'Player 1', frames: [] },
				{ name: 'Player 2', frames: [] },
				{ name: 'Player 3', frames: [] }
			]);
			players.should.have.length(3);
			players.should.deep.equal([
				{ name: 'Player 1', frames: [[null]] },
				{ name: 'Player 2', frames: [] },
				{ name: 'Player 3', frames: [] }
			]);
		});

		it('advances to another player', function() {
			var players = game.advanceToNextPlayer(1, [
				{ name: 'Player 1', frames: [ [1, 3], [10] ] },
				{ name: 'Player 2', frames: [ [10] ] },
				{ name: 'Player 3', frames: [ [3, 4] ] }
			]);
			players.should.have.length(3);
			players.should.deep.equal([
				{ name: 'Player 1', frames: [ [1, 3], [10] ] },
				{ name: 'Player 2', frames: [ [10], [null] ] },
				{ name: 'Player 3', frames: [ [3, 4] ] }
			]);
		});

	});

	describe('.advanceFramesToNextRoll()', function() {

		it('advances for the first roll in a frame', function() {
			var frames = game.advanceFramesToNextRoll(3, [ [null] ]);
			frames.should.have.property('nextPlayer', false);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [3, null] ]);

			frames = game.advanceFramesToNextRoll(6, [ [1, 9], [10], [null] ]);
			frames.should.have.property('nextPlayer', false);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [1, 9], [10], [6, null] ]);
		});

		it('advances for the second roll in a frame', function() {
			var frames = game.advanceFramesToNextRoll(3, [ [7, null] ]);
			frames.should.have.property('nextPlayer', true);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [7, 3] ]);

			frames = game.advanceFramesToNextRoll(6, [ [1, 9], [10], [2, null] ]);
			frames.should.have.property('nextPlayer', true);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [1, 9], [10], [2, 6] ]);
		});

		it('advances to the next player for a strike roll', function() {
			var frames = game.advanceFramesToNextRoll(10, [ [null] ]);
			frames.should.have.property('nextPlayer', true);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [10] ]);

			frames = game.advanceFramesToNextRoll(10, [ [1, 9], [7, 1], [null] ]);
			frames.should.have.property('nextPlayer', true);
			frames.should.have.property('advanced');
			frames.advanced.should.deep.equal([ [1, 9], [7, 1], [10] ]);
		});

	});

	describe('.indexOfCurrentPlayer()', function() {

		it('always returns 0 for a single player game', function() {
			game.indexOfCurrentPlayer(singlePlayerFrames([])).should.equal(0);
			game.indexOfCurrentPlayer(singlePlayerFrames([ [10] ])).should.equal(0);
			game.indexOfCurrentPlayer(singlePlayerFrames([ [9, 1], [null] ])).should.equal(0);
		});

		it('returns the first player in the list that did not roll yet', function() {
			game.indexOfCurrentPlayer([
				{ name: 'Player 1', frames: [ [null] ] },
				{ name: 'Player 2', frames: [] },
				{ name: 'Player 3', frames: [] }
			]).should.equal(0);

			game.indexOfCurrentPlayer([
				{ name: 'Player 1', frames: [ [1, 3] ] },
				{ name: 'Player 2', frames: [ [null] ] },
				{ name: 'Player 3', frames: [] }
			]).should.equal(1);

			game.indexOfCurrentPlayer([
				{ name: 'Player 1', frames: [ [1, 3], [10] ] },
				{ name: 'Player 2', frames: [ [10], [0, 3] ] },
				{ name: 'Player 3', frames: [ [1, 9], [null] ] }
			]).should.equal(2);
		});

	});
});
