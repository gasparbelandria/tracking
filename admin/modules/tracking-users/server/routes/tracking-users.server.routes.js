'use strict';

module.exports = function(app) {
	var trackingUsers = require('../controllers/tracking-users.server.controller');
	var trackingUsersPolicy = require('../policies/tracking-users.server.policy');

	// Tracking users Routes
	app.route('/api/tracking-users').all()
		.get(trackingUsers.list).all(trackingUsersPolicy.isAllowed)
		.post(trackingUsers.create);

	app.route('/api/tracking-users/:trackingUserId').all(trackingUsersPolicy.isAllowed)
		.get(trackingUsers.read)
		.put(trackingUsers.update)
		.delete(trackingUsers.delete);

	// Finish by binding the Tracking user middleware
	app.param('trackingUserId', trackingUsers.trackingUserByID);
};
