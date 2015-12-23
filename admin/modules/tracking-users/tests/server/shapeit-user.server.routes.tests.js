'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TrackingUser = mongoose.model('User'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, trackingUser;

/**
 * Tracking user routes tests
 */
describe('Tracking user CRUD tests', function() {
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

		// Save a user to the test db and create new Tracking user
		user.save(function() {
			trackingUser = {
				name: 'Tracking user Name'
			};

			done();
		});
	});

	it('should be able to save Tracking user instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user._id;

				// Save a new Tracking user
				agent.post('/api/tracking-users')
					.send(trackingUser)
					.expect(200)
					.end(function(trackingUserSaveErr, trackingUserSaveRes) {
						// Handle Tracking user save error
						if (trackingUserSaveErr) done(trackingUserSaveErr);

						// Get a list of Tracking users
						agent.get('/api/tracking-users')
							.end(function(trackingUsersGetErr, trackingUsersGetRes) {
								// Handle Tracking user save error
								if (trackingUsersGetErr) done(trackingUsersGetErr);

								// Get Tracking users list
								var trackingUsers = trackingUsersGetRes.body;

								// Set assertions
								(trackingUsers[0].user._id).should.equal(userId);
								(trackingUsers[0].name).should.match('Tracking user Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tracking user instance if not logged in', function(done) {
		agent.post('/api/tracking-users')
			.send(trackingUser)
			.expect(403)
			.end(function(trackingUserSaveErr, trackingUserSaveRes) {
				// Call the assertion callback
				done(trackingUserSaveErr);
			});
	});

	it('should not be able to save Tracking user instance if no name is provided', function(done) {
		// Invalidate name field
		trackingUser.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user._id;

				// Save a new Tracking user
				agent.post('/api/tracking-users')
					.send(trackingUser)
					.expect(400)
					.end(function(trackingUserSaveErr, trackingUserSaveRes) {
						// Set message assertion
						(trackingUserSaveRes.body.message).should.match('Please fill Tracking user name');
						
						// Handle Tracking user save error
						done(trackingUserSaveErr);
					});
			});
	});

	it('should be able to update Tracking user instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user._id;

				// Save a new Tracking user
				agent.post('/api/tracking-users')
					.send(trackingUser)
					.expect(200)
					.end(function(trackingUserSaveErr, trackingUserSaveRes) {
						// Handle Tracking user save error
						if (trackingUserSaveErr) done(trackingUserSaveErr);

						// Update Tracking user name
						trackingUser.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tracking user
						agent.put('/api/tracking-users/' + trackingUserSaveRes.body._id)
							.send(trackingUser)
							.expect(200)
							.end(function(trackingUserUpdateErr, trackingUserUpdateRes) {
								// Handle Tracking user update error
								if (trackingUserUpdateErr) done(trackingUserUpdateErr);

								// Set assertions
								(trackingUserUpdateRes.body._id).should.equal(trackingUserSaveRes.body._id);
								(trackingUserUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tracking users if not signed in', function(done) {
		// Create new Tracking user model instance
		var trackingUserObj = new TrackingUser(trackingUser);

		// Save the Tracking user
		trackingUserObj.save(function() {
			// Request Tracking users
			request(app).get('/api/tracking-users')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tracking user if not signed in', function(done) {
		// Create new Tracking user model instance
		var trackingUserObj = new TrackingUser(trackingUser);

		// Save the Tracking user
		trackingUserObj.save(function() {
			request(app).get('/api/tracking-users/' + trackingUserObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', trackingUser.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tracking user instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user._id;

				// Save a new Tracking user
				agent.post('/api/tracking-users')
					.send(trackingUser)
					.expect(200)
					.end(function(trackingUserSaveErr, trackingUserSaveRes) {
						// Handle Tracking user save error
						if (trackingUserSaveErr) done(trackingUserSaveErr);

						// Delete existing Tracking user
						agent.delete('/api/tracking-users/' + trackingUserSaveRes.body._id)
							.send(trackingUser)
							.expect(200)
							.end(function(trackingUserDeleteErr, trackingUserDeleteRes) {
								// Handle Tracking user error error
								if (trackingUserDeleteErr) done(trackingUserDeleteErr);

								// Set assertions
								(trackingUserDeleteRes.body._id).should.equal(trackingUserSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tracking user instance if not signed in', function(done) {
		// Set Tracking user user
		trackingUser.user = user;

		// Create new Tracking user model instance
		var trackingUserObj = new TrackingUser(trackingUser);

		// Save the Tracking user
		trackingUserObj.save(function() {
			// Try deleting Tracking user
			request(app).delete('/api/tracking-users/' + trackingUserObj._id)
			.expect(403)
			.end(function(trackingUserDeleteErr, trackingUserDeleteRes) {
				// Set message assertion
				(trackingUserDeleteRes.body.message).should.match('User is not authorized');

				// Handle Tracking user error error
				done(trackingUserDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			TrackingUser.remove().exec(function(){
				done();
			});
		});
	});
});
