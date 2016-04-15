'use strict';

(function() {
	// Tdetails Controller Spec
	describe('Tdetails Controller Tests', function() {
		// Initialize global variables
		var TdetailsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Tdetails controller.
			TdetailsController = $controller('TdetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tdetail object fetched from XHR', inject(function(Tdetails) {
			// Create sample Tdetail using the Tdetails service
			var sampleTdetail = new Tdetails({
				name: 'New Tdetail'
			});

			// Create a sample Tdetails array that includes the new Tdetail
			var sampleTdetails = [sampleTdetail];

			// Set GET response
			$httpBackend.expectGET('api/tdetails').respond(sampleTdetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tdetails).toEqualData(sampleTdetails);
		}));

		it('$scope.findOne() should create an array with one Tdetail object fetched from XHR using a tdetailId URL parameter', inject(function(Tdetails) {
			// Define a sample Tdetail object
			var sampleTdetail = new Tdetails({
				name: 'New Tdetail'
			});

			// Set the URL parameter
			$stateParams.tdetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/tdetails\/([0-9a-fA-F]{24})$/).respond(sampleTdetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tdetail).toEqualData(sampleTdetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Tdetails) {
			// Create a sample Tdetail object
			var sampleTdetailPostData = new Tdetails({
				name: 'New Tdetail'
			});

			// Create a sample Tdetail response
			var sampleTdetailResponse = new Tdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Tdetail'
			});

			// Fixture mock form input values
			scope.name = 'New Tdetail';

			// Set POST response
			$httpBackend.expectPOST('api/tdetails', sampleTdetailPostData).respond(sampleTdetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tdetail was created
			expect($location.path()).toBe('/tdetails/' + sampleTdetailResponse._id);
		}));

		it('$scope.update() should update a valid Tdetail', inject(function(Tdetails) {
			// Define a sample Tdetail put data
			var sampleTdetailPutData = new Tdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Tdetail'
			});

			// Mock Tdetail in scope
			scope.tdetail = sampleTdetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/tdetails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tdetails/' + sampleTdetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tdetailId and remove the Tdetail from the scope', inject(function(Tdetails) {
			// Create new Tdetail object
			var sampleTdetail = new Tdetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tdetails array and include the Tdetail
			scope.tdetails = [sampleTdetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/tdetails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTdetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tdetails.length).toBe(0);
		}));
	});
}());