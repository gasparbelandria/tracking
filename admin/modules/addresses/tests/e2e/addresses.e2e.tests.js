'use strict';

describe('Addresses E2E Tests:', function() {
	describe('Test Addresses page', function() {
		it('Should not include new Addresses', function() {
			browser.get('http://localhost:3000/#!/addresses');
			expect(element.all(by.repeater('address in addresses')).count()).toEqual(0);
		});
	});
});
