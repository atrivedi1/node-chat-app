const expect = require('expect');
const {Users} = require('../users.js');

describe('Users', () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Aastha',
			room: 'Partners'
		},
		{
			id: '2',
			name: 'Jen',
			room: 'React Course'
		},
		{
			id: '3',
			name: 'Julie',
			room: 'React Course'
		}]
	})

	it('should add new user', () => {
		let users = new Users();
		
		let user = {
			id: '123',
			name: 'Akash',
			room: 'Office Fans'
		}

		let resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		let userId = '3';
		let user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		let userId = '4';
		users.removeUser(userId);
		expect(users.users.length).toBe(3);
	});

	it('should find a user', () => {
		let userId = '1'
		let foundUser = users.getUser(userId);
		expect(foundUser.id).toBe(userId);
	});

	it('should not find a user', () => {
		let userId = '4'
		let foundUser = users.getUser(userId);
		expect(foundUser).toBeFalsy();
	});

	it('should return names for React course', () => {
		let userList = users.getUserList('React Course');
		expect(userList).toEqual(['Jen', 'Julie']);
	});

	it('should return names of partners', () => {
		let userList = users.getUserList('Partners');
		expect(userList).toEqual(['Aastha']);
	});
});