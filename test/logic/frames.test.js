'use strict';

var should = require('chai').should();
var frames = require('../../src/js/logic/frames');

describe('logic/frames', function() {
	describe('.data()', function() {

		it('accepts an empty list of frames and provides a list of empty rolls', function() {
			var framesData = frames.data([]);
			framesData.rolls.should.have.length(10);
			framesData.should.have.deep.property('rolls[0].knockedDown', 0);
			framesData.should.have.deep.property('rolls[3].knockedDown', 0);
			framesData.should.have.deep.property('rolls[9].knockedDown', 0);
			framesData.should.have.deep.property('rolls[0].type', 'empty');
			framesData.should.have.deep.property('rolls[3].type', 'empty');
			framesData.should.have.deep.property('rolls[9].type', 'empty');
			framesData.should.have.deep.property('rolls[0].colSpan', 2);
			framesData.should.have.deep.property('rolls[3].colSpan', 2);
			framesData.should.have.deep.property('rolls[9].colSpan', 2);
			framesData.should.have.deep.property('rolls[0].frameIndex', 0);
			framesData.should.have.deep.property('rolls[3].frameIndex', 3);
			framesData.should.have.deep.property('rolls[9].frameIndex', 9);
		});

		it('accepts an empty list of frames and provides a list of empty points', function() {
			var framesData = frames.data([]);
			framesData.points.should.have.length(10);
			framesData.should.have.deep.property('points[0].points', null);
			framesData.should.have.deep.property('points[3].points', null);
			framesData.should.have.deep.property('points[9].points', null);
			framesData.should.have.deep.property('points[0].type', 'empty');
			framesData.should.have.deep.property('points[3].type', 'empty');
			framesData.should.have.deep.property('points[9].type', 'empty');
			framesData.should.have.deep.property('points[0].frameIndex', 0);
			framesData.should.have.deep.property('points[3].frameIndex', 3);
			framesData.should.have.deep.property('points[9].frameIndex', 9);
		});

		it('accepts an empty list of frames and provides a total of 0 points', function() {
			frames.data([]).total.should.equal(0);
		});

		it('accepts a list of frames and provides a list of rolls', function() {
			var framesData = frames.data([
				[3, 7], [10]
			]);
			framesData.rolls.should.have.length(11);
			framesData.should.have.deep.property('rolls[0].knockedDown', 3);
			framesData.should.have.deep.property('rolls[1].knockedDown', 7);
			framesData.should.have.deep.property('rolls[2].knockedDown', 10);
			framesData.should.have.deep.property('rolls[3].knockedDown', 0);
			framesData.should.have.deep.property('rolls[0].type', 'normal');
			framesData.should.have.deep.property('rolls[1].type', 'spare');
			framesData.should.have.deep.property('rolls[2].type', 'strike');
			framesData.should.have.deep.property('rolls[3].type', 'empty');
			framesData.should.have.deep.property('rolls[0].colSpan', 1);
			framesData.should.have.deep.property('rolls[1].colSpan', 1);
			framesData.should.have.deep.property('rolls[2].colSpan', 2);
			framesData.should.have.deep.property('rolls[3].colSpan', 2);
			framesData.should.have.deep.property('rolls[0].frameIndex', 0);
			framesData.should.have.deep.property('rolls[1].frameIndex', 0);
			framesData.should.have.deep.property('rolls[2].frameIndex', 1);
			framesData.should.have.deep.property('rolls[3].frameIndex', 2);
		});

		it('accepts a list of frames and provides a list of points', function() {
			var framesData = frames.data([
				[3, 5], [3, 2]
			]);
			framesData.should.have.deep.property('points[0].points', 8);
			framesData.should.have.deep.property('points[1].points', 5);
			framesData.should.have.deep.property('points[2].points', null);
			framesData.should.have.deep.property('points[0].type', 'normal');
			framesData.should.have.deep.property('points[1].type', 'normal');
			framesData.should.have.deep.property('points[2].type', 'empty');

			framesData = frames.data([
				[1, 1], [6, 1], [4, 3], [0, 2]
			]);
			framesData.should.have.deep.property('points[0].points', 2);
			framesData.should.have.deep.property('points[1].points', 7);
			framesData.should.have.deep.property('points[2].points', 7);
			framesData.should.have.deep.property('points[3].points', 2);
			framesData.should.have.deep.property('points[4].points', null);
			framesData.should.have.deep.property('points[0].type', 'normal');
			framesData.should.have.deep.property('points[1].type', 'normal');
			framesData.should.have.deep.property('points[2].type', 'normal');
			framesData.should.have.deep.property('points[3].type', 'normal');
			framesData.should.have.deep.property('points[4].type', 'empty');
		});

		it('accepts a list of frames and provides total points', function() {
			frames.data([
				[3, 5], [3, 2]
			]).should.have.deep.property('total', 8 + 5);

			frames.data([
				[9, 1], [3, 2]
			]).should.have.deep.property('total', 13 + 5);

			frames.data([
				[10], [9, 1], [3, 2]
			]).should.have.deep.property('total', 20 + 13 + 5);

			frames.data([
				[3, 7], [9, 1], [7, 2]
			]).should.have.deep.property('total', 19 + 17 + 9);

			frames.data([
				[10], [10], [10], [7, 2]
			]).should.have.deep.property('total', 30 + 27 + 19 + 9);
		});

	});

	describe('.rollsData()', function() {

		it('accepts a frame index', function() {
			frames.rollsData([], 3).should.have.deep.property('[0].frameIndex', 3);
			frames.rollsData([], 4).should.have.deep.property('[0].frameIndex', 4);
			frames.rollsData([1], 7).should.have.deep.property('[0].frameIndex', 7);
			frames.rollsData([1], 7).should.have.deep.property('[1].frameIndex', 7);
			frames.rollsData([1, 2], 8).should.have.deep.property('[0].frameIndex', 8);
			frames.rollsData([1, 2], 8).should.have.deep.property('[1].frameIndex', 8);
		});

		it('accepts an empty frame', function() {
			var rollsData = frames.rollsData([], 0);
			rollsData.should.have.length(1);
			rollsData.should.have.deep.property('[0].knockedDown', 0);
			rollsData.should.have.deep.property('[0].type', 'empty');
			rollsData.should.have.deep.property('[0].colSpan', 2);
		});

		it('acceps a frame with a single normal roll', function() {
			var rollsData = frames.rollsData([1], 0);
			rollsData.should.have.length(2);
			rollsData.should.have.deep.property('[0].knockedDown', 1);
			rollsData.should.have.deep.property('[0].type', 'normal');
			rollsData.should.have.deep.property('[0].colSpan', 1);
			rollsData.should.have.deep.property('[1].knockedDown', 0);
			rollsData.should.have.deep.property('[1].type', 'empty');
			rollsData.should.have.deep.property('[1].colSpan', 1);
		});

		it('acceps a frame with a single strike roll', function() {
			var rollsData = frames.rollsData([10], 0);
			rollsData.should.have.length(1);
			rollsData.should.have.deep.property('[0].knockedDown', 10);
			rollsData.should.have.deep.property('[0].type', 'strike');
			rollsData.should.have.deep.property('[0].colSpan', 2);
		});

		it('acceps a frame with a two normal rolls', function() {
			var rollsData = frames.rollsData([3, 5], 0);
			rollsData.should.have.length(2);
			rollsData.should.have.deep.property('[0].knockedDown', 3);
			rollsData.should.have.deep.property('[0].type', 'normal');
			rollsData.should.have.deep.property('[0].colSpan', 1);
			rollsData.should.have.deep.property('[1].knockedDown', 5);
			rollsData.should.have.deep.property('[1].type', 'normal');
			rollsData.should.have.deep.property('[1].colSpan', 1);
		});

		it('acceps a frame with a two rolls that is a spare', function() {
			var rollsData = frames.rollsData([2, 8], 0);
			rollsData.should.have.length(2);
			rollsData.should.have.deep.property('[0].knockedDown', 2);
			rollsData.should.have.deep.property('[0].type', 'normal');
			rollsData.should.have.deep.property('[0].colSpan', 1);
			rollsData.should.have.deep.property('[1].knockedDown', 8);
			rollsData.should.have.deep.property('[1].type', 'spare');
			rollsData.should.have.deep.property('[1].colSpan', 1);
		});

		it('acceps a frame with a marker of the next roll', function() {
			var rollsData = frames.rollsData([null], 0);
			rollsData.should.have.length(2);
			rollsData.should.have.deep.property('[0].knockedDown', 0);
			rollsData.should.have.deep.property('[0].type', 'next');
			rollsData.should.have.deep.property('[0].colSpan', 1);
			rollsData.should.have.deep.property('[1].knockedDown', 0);
			rollsData.should.have.deep.property('[1].type', 'empty');
			rollsData.should.have.deep.property('[1].colSpan', 1);

			rollsData = frames.rollsData([5, null], 0);
			rollsData.should.have.length(2);
			rollsData.should.have.deep.property('[0].knockedDown', 5);
			rollsData.should.have.deep.property('[0].type', 'normal');
			rollsData.should.have.deep.property('[0].colSpan', 1);
			rollsData.should.have.deep.property('[1].knockedDown', 0);
			rollsData.should.have.deep.property('[1].type', 'next');
			rollsData.should.have.deep.property('[1].colSpan', 1);
		});

	});

	describe('.pointsData()', function() {

		it('accepts a frame index', function() {
			frames.pointsData([], 3).should.have.property('frameIndex', 3);
			frames.pointsData([], 4).should.have.property('frameIndex', 4);
			frames.pointsData([{}], 7).should.have.property('frameIndex', 7);
			frames.pointsData([{}, {}], 8).should.have.property('frameIndex', 8);
		});

		it('sums up points for two normal rolls', function() {
			var points = frames.pointsData([
				{ knockedDown: 2, type: 'normal' },
				{ knockedDown: 3, type: 'normal' }
			]);
			points.should.have.property('points', 5);
			points.should.have.property('type', 'normal');

			points = frames.pointsData([
				{ knockedDown: 1, type: 'normal' },
				{ knockedDown: 8, type: 'normal' }
			]);
			points.should.have.property('points', 9);
			points.should.have.property('type', 'normal');
		});

		it('sums up points for spare rolls', function() {
			var points = frames.pointsData([
				{ knockedDown: 2, type: 'normal' },
				{ knockedDown: 8, type: 'spare' }
			]);
			points.should.have.property('points', 10);
			points.should.have.property('type', 'spare');

			points = frames.pointsData([
				{ knockedDown: 1, type: 'normal' },
				{ knockedDown: 9, type: 'spare' }
			]);
			points.should.have.property('points', 10);
			points.should.have.property('type', 'spare');
		});

		it('sums up points for strike rolls', function() {
			var points = frames.pointsData([
				{ knockedDown: 10, type: 'strike' }
			]);
			points.should.have.property('points', 10);
			points.should.have.property('type', 'strike');
		});

		it('adds knocked down pins for the next two rolls in a strike', function() {
			var rolls = [
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 2, type: 'normal' },
					{ knockedDown: 0, type: 'empty' }
				]
			];
			var points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 12);
			points.should.have.property('type', 'strike');

			rolls = [
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 2, type: 'normal' },
					{ knockedDown: 5, type: 'normal' }
				],
				[
					{ knockedDown: 1, type: 'normal' },
					{ knockedDown: 4, type: 'normal' }
				]
			];
			points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 17);
			points.should.have.property('type', 'strike');

			rolls = [
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 10, type: 'normal' }
				],
				[
					{ knockedDown: 10, type: 'normal' }
				],
				[
					{ knockedDown: 10, type: 'normal' }
				]
			];
			points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 30);
			points.should.have.property('type', 'strike');
		});

		it('adds knocked down pins for the next roll in a spare', function() {
			var rolls = [
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 2, type: 'normal' },
					{ knockedDown: 0, type: 'empty' }
				]
			];
			var points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 12);
			points.should.have.property('type', 'spare');

			rolls = [
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 2, type: 'normal' },
					{ knockedDown: 5, type: 'normal' }
				],
				[
					{ knockedDown: 1, type: 'normal' },
					{ knockedDown: 4, type: 'normal' }
				]
			];
			points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 12);
			points.should.have.property('type', 'spare');

			rolls = [
				[
					{ knockedDown: 10, type: 'strike' }
				],
				[
					{ knockedDown: 3, type: 'normal' },
					{ knockedDown: 7, type: 'spare' }
				],
				[
					{ knockedDown: 10, type: 'normal' }
				],
				[
					{ knockedDown: 10, type: 'normal' }
				]
			];
			points = frames.pointsData(rolls[1], 1, rolls);
			points.should.have.property('points', 20);
			points.should.have.property('type', 'spare');
		});

	});
});
