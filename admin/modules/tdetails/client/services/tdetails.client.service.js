'use strict';

//Tdetails service used to communicate Tdetails REST endpoints
angular.module('tdetails').factory('Tdetails', ['$resource',
	function($resource) {
		return $resource('api/tdetails/:tdetailId', { tdetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);