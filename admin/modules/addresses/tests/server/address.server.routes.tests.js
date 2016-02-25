'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Address = mongoose.model('Address'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, address;

/**
 * Address routes tests
 */
describe('Address CRUD tests', function() {
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

		// Save a user to the test db and create new Address
		user.save(function() {
			address = {
				name: 'Address Name'
			};

			done();
		});
	});

	it('should be able to save Address instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Address
				agent.post('/api/addresses')
					.send(address)
					.expect(200)
					.end(function(addressSaveErr, addressSaveRes) {
						// Handle Address save error
						if (addressSaveErr) done(addressSaveErr);

						// Get a list of Addresses
						agent.get('/api/addresses')
							.end(function(addressesGetErr, addressesGetRes) {
								// Handle Address save error
								if (addressesGetErr) done(addressesGetErr);

								// Get Addresses list
								var addresses = addressesGetRes.body;

								// Set assertions
								(addresses[0].user._id).should.equal(userId);
								(addresses[0].name).should.match('Address Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Address instance if not logged in', function(done) {
		agent.post('/api/addresses')
			.send(address)
			.expect(403)
			.end(function(addressSaveErr, addressSaveRes) {
				// Call the assertion callback
				done(addressSaveErr);
			});
	});

	it('should not be able to save Address instance if no name is provided', function(done) {
		// Invalidate name field
		address.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Address
				agent.post('/api/addresses')
					.send(address)
					.expect(400)
					.end(function(addressSaveErr, addressSaveRes) {
						// Set message assertion
						(addressSaveRes.body.message).should.match('Please fill Address name');
						
						// Handle Address save error
						done(addressSaveErr);
					});
			});
	});

	it('should be able to update Address instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Address
				agent.post('/api/addresses')
					.send(address)
					.expect(200)
					.end(function(addressSaveErr, addressSaveRes) {
						// Handle Address save error
						if (addressSaveErr) done(addressSaveErr);

						// Update Address name
						address.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Address
						agent.put('/api/addresses/' + addressSaveRes.body._id)
							.send(address)
							.expect(200)
							.end(function(addressUpdateErr, addressUpdateRes) {
								// Handle Address update error
								if (addressUpdateErr) done(addressUpdateErr);

								// Set assertions
								(addressUpdateRes.body._id).should.equal(addressSaveRes.body._id);
								(addressUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Addresses if not signed in', function(done) {
		// Create new Address model instance
		var addressObj = new Address(address);

		// Save the Address
		addressObj.save(function() {
			// Request Addresses
			request(app).get('/api/addresses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Address if not signed in', function(done) {
		// Create new Address model instance
		var addressObj = new Address(address);

		// Save the Address
		addressObj.save(function() {
			request(app).get('/api/addresses/' + addressObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', address.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Address instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Address
				agent.post('/api/addresses')
					.send(address)
					.expect(200)
					.end(function(addressSaveErr, addressSaveRes) {
						// Handle Address save error
						if (addressSaveErr) done(addressSaveErr);

						// Delete existing Address
						agent.delete('/api/addresses/' + addressSaveRes.body._id)
							.send(address)
							.expect(200)
							.end(function(addressDeleteErr, addressDeleteRes) {
								// Handle Address error error
								if (addressDeleteErr) done(addressDeleteErr);

								// Set assertions
								(addressDeleteRes.body._id).should.equal(addressSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Address instance if not signed in', function(done) {
		// Set Address user 
		address.user = user;

		// Create new Address model instance
		var addressObj = new Address(address);

		// Save the Address
		addressObj.save(function() {
			// Try deleting Address
			request(app).delete('/api/addresses/' + addressObj._id)
			.expect(403)
			.end(function(addressDeleteErr, addressDeleteRes) {
				// Set message assertion
				(addressDeleteRes.body.message).should.match('User is not authorized');

				// Handle Address error error
				done(addressDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Address.remove().exec(function(){
				done();
			});
		});
	});
});
