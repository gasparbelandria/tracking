'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tdetail = mongoose.model('Tdetail'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, tdetail;

/**
 * Tdetail routes tests
 */
describe('Tdetail CRUD tests', function() {
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

		// Save a user to the test db and create new Tdetail
		user.save(function() {
			tdetail = {
				name: 'Tdetail Name'
			};

			done();
		});
	});

	it('should be able to save Tdetail instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tdetail
				agent.post('/api/tdetails')
					.send(tdetail)
					.expect(200)
					.end(function(tdetailSaveErr, tdetailSaveRes) {
						// Handle Tdetail save error
						if (tdetailSaveErr) done(tdetailSaveErr);

						// Get a list of Tdetails
						agent.get('/api/tdetails')
							.end(function(tdetailsGetErr, tdetailsGetRes) {
								// Handle Tdetail save error
								if (tdetailsGetErr) done(tdetailsGetErr);

								// Get Tdetails list
								var tdetails = tdetailsGetRes.body;

								// Set assertions
								(tdetails[0].user._id).should.equal(userId);
								(tdetails[0].name).should.match('Tdetail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tdetail instance if not logged in', function(done) {
		agent.post('/api/tdetails')
			.send(tdetail)
			.expect(403)
			.end(function(tdetailSaveErr, tdetailSaveRes) {
				// Call the assertion callback
				done(tdetailSaveErr);
			});
	});

	it('should not be able to save Tdetail instance if no name is provided', function(done) {
		// Invalidate name field
		tdetail.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tdetail
				agent.post('/api/tdetails')
					.send(tdetail)
					.expect(400)
					.end(function(tdetailSaveErr, tdetailSaveRes) {
						// Set message assertion
						(tdetailSaveRes.body.message).should.match('Please fill Tdetail name');
						
						// Handle Tdetail save error
						done(tdetailSaveErr);
					});
			});
	});

	it('should be able to update Tdetail instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tdetail
				agent.post('/api/tdetails')
					.send(tdetail)
					.expect(200)
					.end(function(tdetailSaveErr, tdetailSaveRes) {
						// Handle Tdetail save error
						if (tdetailSaveErr) done(tdetailSaveErr);

						// Update Tdetail name
						tdetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tdetail
						agent.put('/api/tdetails/' + tdetailSaveRes.body._id)
							.send(tdetail)
							.expect(200)
							.end(function(tdetailUpdateErr, tdetailUpdateRes) {
								// Handle Tdetail update error
								if (tdetailUpdateErr) done(tdetailUpdateErr);

								// Set assertions
								(tdetailUpdateRes.body._id).should.equal(tdetailSaveRes.body._id);
								(tdetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tdetails if not signed in', function(done) {
		// Create new Tdetail model instance
		var tdetailObj = new Tdetail(tdetail);

		// Save the Tdetail
		tdetailObj.save(function() {
			// Request Tdetails
			request(app).get('/api/tdetails')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tdetail if not signed in', function(done) {
		// Create new Tdetail model instance
		var tdetailObj = new Tdetail(tdetail);

		// Save the Tdetail
		tdetailObj.save(function() {
			request(app).get('/api/tdetails/' + tdetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', tdetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tdetail instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tdetail
				agent.post('/api/tdetails')
					.send(tdetail)
					.expect(200)
					.end(function(tdetailSaveErr, tdetailSaveRes) {
						// Handle Tdetail save error
						if (tdetailSaveErr) done(tdetailSaveErr);

						// Delete existing Tdetail
						agent.delete('/api/tdetails/' + tdetailSaveRes.body._id)
							.send(tdetail)
							.expect(200)
							.end(function(tdetailDeleteErr, tdetailDeleteRes) {
								// Handle Tdetail error error
								if (tdetailDeleteErr) done(tdetailDeleteErr);

								// Set assertions
								(tdetailDeleteRes.body._id).should.equal(tdetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tdetail instance if not signed in', function(done) {
		// Set Tdetail user 
		tdetail.user = user;

		// Create new Tdetail model instance
		var tdetailObj = new Tdetail(tdetail);

		// Save the Tdetail
		tdetailObj.save(function() {
			// Try deleting Tdetail
			request(app).delete('/api/tdetails/' + tdetailObj._id)
			.expect(403)
			.end(function(tdetailDeleteErr, tdetailDeleteRes) {
				// Set message assertion
				(tdetailDeleteRes.body.message).should.match('User is not authorized');

				// Handle Tdetail error error
				done(tdetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Tdetail.remove().exec(function(){
				done();
			});
		});
	});
});
