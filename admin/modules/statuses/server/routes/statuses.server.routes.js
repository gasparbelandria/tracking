'use strict';

module.exports = function(app) {
	var statuses = require('../controllers/statuses.server.controller');
	var statusesPolicy = require('../policies/statuses.server.policy');

	// Statuses Routes
	app.route('/api/statuses').all()
		.get(statuses.list).all(statusesPolicy.isAllowed)
		.post(statuses.create);

	app.route('/api/statuses/:statusId').all(statusesPolicy.isAllowed)
		.get(statuses.read)
		.put(statuses.update)
		.delete(statuses.delete);

	// Finish by binding the Status middleware
	app.param('statusId', statuses.statusByID);
};