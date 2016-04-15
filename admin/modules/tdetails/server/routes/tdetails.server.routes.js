'use strict';

module.exports = function(app) {
	var tdetails = require('../controllers/tdetails.server.controller');
	var tdetailsPolicy = require('../policies/tdetails.server.policy');

	// Tdetails Routes
	app.route('/api/tdetails').all()
		.get(tdetails.list).all(tdetailsPolicy.isAllowed)
		.post(tdetails.create);

	app.route('/api/tdetails/:tdetailId').all(tdetailsPolicy.isAllowed)
		.get(tdetails.read)
		.put(tdetails.update)
		.delete(tdetails.delete);

	// Finish by binding the Tdetail middleware
	app.param('tdetailId', tdetails.tdetailByID);
};