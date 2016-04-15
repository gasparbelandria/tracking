'use strict';

describe('Tdetails E2E Tests:', function() {
	describe('Test Tdetails page', function() {
		it('Should not include new Tdetails', function() {
			browser.get('http://localhost:3000/#!/tdetails');
			expect(element.all(by.repeater('tdetail in tdetails')).count()).toEqual(0);
		});
	});
});
