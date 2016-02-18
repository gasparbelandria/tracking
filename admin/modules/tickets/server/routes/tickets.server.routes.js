'use strict';

module.exports = function(app) {
	var tickets = require('../controllers/tickets.server.controller');
	var ticketsPolicy = require('../policies/tickets.server.policy');

	// Tickets Routes
	app.route('/api/tickets').all()
		.get(tickets.list).all(ticketsPolicy.isAllowed)
		.post(tickets.create);

	app.route('/api/tickets/:ticketId').all(ticketsPolicy.isAllowed)
		.get(tickets.read)
		.put(tickets.update)
		.delete(tickets.delete);

	// Finish by binding the Ticket middleware
	app.param('ticketId', tickets.ticketByID);
};