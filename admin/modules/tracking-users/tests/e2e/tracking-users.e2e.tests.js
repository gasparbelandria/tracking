'use strict';

describe('Tracking users E2E Tests:', function() {
	describe('Test Tracking users page', function() {
		it('Should not include new Tracking users', function() {
			browser.get('http://localhost:3000/#!/tracking-users');
			expect(element.all(by.repeater('trackingUser in trackingUsers')).count()).toEqual(0);
		});
	});
});
