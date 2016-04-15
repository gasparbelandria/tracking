'use strict';

describe('Statuses E2E Tests:', function() {
	describe('Test Statuses page', function() {
		it('Should not include new Statuses', function() {
			browser.get('http://localhost:3000/#!/statuses');
			expect(element.all(by.repeater('status in statuses')).count()).toEqual(0);
		});
	});
});
