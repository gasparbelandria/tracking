'use strict';

describe('Stats E2E Tests:', function() {
	describe('Test Stats page', function() {
		it('Should not include new Stats', function() {
			browser.get('http://localhost:3000/#!/stats');
			expect(element.all(by.repeater('stat in stats')).count()).toEqual(0);
		});
	});
});
