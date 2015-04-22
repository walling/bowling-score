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
});
