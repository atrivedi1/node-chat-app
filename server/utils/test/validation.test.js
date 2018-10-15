const expect = require('expect');
const {isRealString} = require('../validation.js');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		let result = isRealString(4);
		expect(result).toBe(false);
	});

	it('should reject string with only spaces', () => {
		let result = isRealString('     ');
		expect(result).toBe(false);
	});


	it('should allow string with non-space character(s)', () => {
		let result = isRealString('Yo yo');
		expect(result).toBe(true);
	});
});