const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('../message.js');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		//define message payload
		let from = 'testUser';
		let text = 'test message'
		//store res in variable
		let message = generateMessage(from, text);

		//assert that from is correct
		expect(message.from).toBe(from)
		//assert that text matches up
		expect(message.text).toBe(text)
		//assert that createdAt is number
		expect(typeof message.createdAt).toBe('number')
	})
});

describe('generateLocationMessage', () => {
	it('should generate the correct location object', () => {
		//define message payload
		let from = 'Nancy';
		let lat = 10
		let long = -12
		//store res in variable
		let message = generateLocationMessage(from, lat, long);

		//assert that from is correct
		expect(message.from).toBe(from)
		//assert that text matches up
		expect(message.url).toBe(`https://google.com/maps/?q=${lat},${long}`)
		//assert that createdAt is number
		expect(typeof message.createdAt).toBe('number')
	})
});