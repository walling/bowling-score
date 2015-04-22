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

	});
});
