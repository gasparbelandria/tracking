'use strict';

//Setting up route
angular.module('statuses').config(['$stateProvider',
	function($stateProvider) {
		// Statuses state routing
		$stateProvider.
		state('statuses', {
			abstract: true,
			url: '/statuses',
			template: '<ui-view/>'
		}).
		state('statuses.list', {
			url: '',
			templateUrl: 'modules/statuses/views/list-statuses.client.view.html'
		}).
		state('statuses.create', {
			url: '/create',
			templateUrl: 'modules/statuses/views/create-status.client.view.html'
		}).
		state('statuses.view', {
			url: '/:statusId',
			templateUrl: 'modules/statuses/views/view-status.client.view.html'
		}).
		state('statuses.edit', {
			url: '/:statusId/edit',
			templateUrl: 'modules/statuses/views/edit-status.client.view.html'
		});
	}
]);