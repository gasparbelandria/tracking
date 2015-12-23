'use strict';

//Stats service used to communicate Stats REST endpoints
angular.module('stats').factory('Stats', ['$resource',
	function($resource) {
		return $resource('api/stats/:statId', { statId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);