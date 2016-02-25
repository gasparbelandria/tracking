'use strict';

module.exports = function(app) {
	var addresses = require('../controllers/addresses.server.controller');
	var addressesPolicy = require('../policies/addresses.server.policy');

	// Addresses Routes
	app.route('/api/addresses').all()
		.get(addresses.list).all(addressesPolicy.isAllowed)
		.post(addresses.create);

	app.route('/api/addresses/:addressId').all(addressesPolicy.isAllowed)
		.get(addresses.read)
		.put(addresses.update)
		.delete(addresses.delete);

	// Finish by binding the Address middleware
	app.param('addressId', addresses.addressByID);
};