'use strict';

module.exports = function(app) {
	var stats = require('../controllers/stats.server.controller');
	var statsPolicy = require('../policies/stats.server.policy');

	// Stats Routes
	app.route('/api/stats').all()
		.get(stats.list).all(statsPolicy.isAllowed)
		.post(stats.create);

	app.route('/api/stats/:statId').all(statsPolicy.isAllowed)
		.get(stats.read)
		.put(stats.update)
		.delete(stats.delete);

	// Finish by binding the Stat middleware
	app.param('statId', stats.statByID);
};