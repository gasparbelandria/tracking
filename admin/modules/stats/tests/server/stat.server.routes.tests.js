'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Stat = mongoose.model('Stat'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, stat;

/**
 * Stat routes tests
 */
describe('Stat CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Stat
		user.save(function() {
			stat = {
				name: 'Stat Name'
			};

			done();
		});
	});

	it('should be able to save Stat instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stat
				agent.post('/api/stats')
					.send(stat)
					.expect(200)
					.end(function(statSaveErr, statSaveRes) {
						// Handle Stat save error
						if (statSaveErr) done(statSaveErr);

						// Get a list of Stats
						agent.get('/api/stats')
							.end(function(statsGetErr, statsGetRes) {
								// Handle Stat save error
								if (statsGetErr) done(statsGetErr);

								// Get Stats list
								var stats = statsGetRes.body;

								// Set assertions
								(stats[0].user._id).should.equal(userId);
								(stats[0].name).should.match('Stat Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Stat instance if not logged in', function(done) {
		agent.post('/api/stats')
			.send(stat)
			.expect(403)
			.end(function(statSaveErr, statSaveRes) {
				// Call the assertion callback
				done(statSaveErr);
			});
	});

	it('should not be able to save Stat instance if no name is provided', function(done) {
		// Invalidate name field
		stat.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stat
				agent.post('/api/stats')
					.send(stat)
					.expect(400)
					.end(function(statSaveErr, statSaveRes) {
						// Set message assertion
						(statSaveRes.body.message).should.match('Please fill Stat name');
						
						// Handle Stat save error
						done(statSaveErr);
					});
			});
	});

	it('should be able to update Stat instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stat
				agent.post('/api/stats')
					.send(stat)
					.expect(200)
					.end(function(statSaveErr, statSaveRes) {
						// Handle Stat save error
						if (statSaveErr) done(statSaveErr);

						// Update Stat name
						stat.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Stat
						agent.put('/api/stats/' + statSaveRes.body._id)
							.send(stat)
							.expect(200)
							.end(function(statUpdateErr, statUpdateRes) {
								// Handle Stat update error
								if (statUpdateErr) done(statUpdateErr);

								// Set assertions
								(statUpdateRes.body._id).should.equal(statSaveRes.body._id);
								(statUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Stats if not signed in', function(done) {
		// Create new Stat model instance
		var statObj = new Stat(stat);

		// Save the Stat
		statObj.save(function() {
			// Request Stats
			request(app).get('/api/stats')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Stat if not signed in', function(done) {
		// Create new Stat model instance
		var statObj = new Stat(stat);

		// Save the Stat
		statObj.save(function() {
			request(app).get('/api/stats/' + statObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', stat.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Stat instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stat
				agent.post('/api/stats')
					.send(stat)
					.expect(200)
					.end(function(statSaveErr, statSaveRes) {
						// Handle Stat save error
						if (statSaveErr) done(statSaveErr);

						// Delete existing Stat
						agent.delete('/api/stats/' + statSaveRes.body._id)
							.send(stat)
							.expect(200)
							.end(function(statDeleteErr, statDeleteRes) {
								// Handle Stat error error
								if (statDeleteErr) done(statDeleteErr);

								// Set assertions
								(statDeleteRes.body._id).should.equal(statSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Stat instance if not signed in', function(done) {
		// Set Stat user 
		stat.user = user;

		// Create new Stat model instance
		var statObj = new Stat(stat);

		// Save the Stat
		statObj.save(function() {
			// Try deleting Stat
			request(app).delete('/api/stats/' + statObj._id)
			.expect(403)
			.end(function(statDeleteErr, statDeleteRes) {
				// Set message assertion
				(statDeleteRes.body.message).should.match('User is not authorized');

				// Handle Stat error error
				done(statDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Stat.remove().exec(function(){
				done();
			});
		});
	});
});
