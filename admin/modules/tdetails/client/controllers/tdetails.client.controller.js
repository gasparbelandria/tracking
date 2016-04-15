'use strict';

// Tdetails controller
angular.module('tdetails').controller('TdetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tdetails',
	function($scope, $stateParams, $location, Authentication, Tdetails ) {
		$scope.authentication = Authentication;

		// Create new Tdetail
		$scope.create = function() {
			// Create new Tdetail object
			var tdetail = new Tdetails ({
				ticket: this.ticket,
				note: this.note,
				status: this.status
			});

			// Redirect after save
			tdetail.$save(function(response) {
				$location.path('tdetails/' + response._id);

				// Clear form fields
				$scope.ticket = '';
				$scope.note = '';
				$scope.status = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tdetail
		$scope.remove = function( tdetail ) {
			if ( tdetail ) { tdetail.$remove();

				for (var i in $scope.tdetails ) {
					if ($scope.tdetails [i] === tdetail ) {
						$scope.tdetails.splice(i, 1);
					}
				}
			} else {
				$scope.tdetail.$remove(function() {
					$location.path('tdetails');
				});
			}
		};

		// Update existing Tdetail
		$scope.update = function() {
			var tdetail = $scope.tdetail ;

			tdetail.$update(function() {
				$location.path('tdetails/' + tdetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tdetails
		$scope.find = function() {
			$scope.tdetails = Tdetails.query();
		};

		// Find existing Tdetail
		$scope.findOne = function() {
			$scope.tdetail = Tdetails.get({ 
				tdetailId: $stateParams.tdetailId
			});
		};
	}
]);
