const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const app = express();
const server = http.createServer(app)
const io = socketIO(server);
const users = new Users();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath))
app.use(bodyParser.json());

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required')
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the dopest chat app!'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined!`));
		callback();
	});
	
	socket.on('createMessage', (message, callback) => {
		let user = users.getUser(socket.id);

		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
		}
	});
	
	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
		}
	});
})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};