'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TrackingUser = mongoose.model('User');

/**
 * Globals
 */
var user, trackingUser;

/**
 * Unit tests
 */
describe('Tracking user Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			trackingUser = new TrackingUser({
				name: 'Tracking user Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return trackingUser.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			trackingUser.name = '';

			return trackingUser.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TrackingUser.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
