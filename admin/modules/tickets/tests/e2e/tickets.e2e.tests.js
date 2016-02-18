'use strict';

describe('Tickets E2E Tests:', function() {
	describe('Test Tickets page', function() {
		it('Should not include new Tickets', function() {
			browser.get('http://localhost:3000/#!/tickets');
			expect(element.all(by.repeater('ticket in tickets')).count()).toEqual(0);
		});
	});
});
