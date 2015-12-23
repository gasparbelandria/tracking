'use strict';

//Setting up route
angular.module('tracking-users').config(['$stateProvider',
	function($stateProvider) {
		// Tracking users state routing
		$stateProvider.
		state('tracking-users', {
			abstract: true,
			url: '/tracking-users',
			template: '<ui-view/>'
		}).
		state('tracking-users.list', {
			url: '',
			templateUrl: 'modules/tracking-users/views/list-tracking-users.client.view.html'
		}).
		state('tracking-users.region', {
			url: '/create',
			templateUrl: 'modules/tracking-users/views/region-tracking-user.client.view.html'
		}).
		state('tracking-users.view', {
			url: '/:trackingUserId',
			templateUrl: 'modules/tracking-users/views/view-tracking-user.client.view.html'
		}).
		state('tracking-users.edit', {
			url: '/:trackingUserId/edit',
			templateUrl: 'modules/tracking-users/views/edit-tracking-user.client.view.html'
		});
	}
]);
