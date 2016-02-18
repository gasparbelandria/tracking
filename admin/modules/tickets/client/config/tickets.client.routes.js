'use strict';

//Setting up route
angular.module('tickets').config(['$stateProvider',
	function($stateProvider) {
		// Tickets state routing
		$stateProvider.
		state('tickets', {
			abstract: true,
			url: '/tickets',
			template: '<ui-view/>'
		}).
		state('tickets.list', {
			url: '',
			templateUrl: 'modules/tickets/views/list-tickets.client.view.html'
		}).
		state('tickets.create', {
			url: '/create',
			templateUrl: 'modules/tickets/views/create-ticket.client.view.html'
		}).
		state('tickets.view', {
			url: '/:ticketId',
			templateUrl: 'modules/tickets/views/view-ticket.client.view.html'
		}).
		state('tickets.edit', {
			url: '/:ticketId/edit',
			templateUrl: 'modules/tickets/views/edit-ticket.client.view.html'
		});
	}
]);