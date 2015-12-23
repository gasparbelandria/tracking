'use strict';

//Tracking users service used to communicate Tracking users REST endpoints
angular.module('tracking-users').factory('TrackingUsers', ['$resource',
	function($resource) {
		return $resource('api/tracking-users/:trackingUserId', { trackingUserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
