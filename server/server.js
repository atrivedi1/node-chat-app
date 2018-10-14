const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const app = express();
const server = http.createServer(app)
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath))
app.use(bodyParser.json());

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the dopest chat app!'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
	
	socket.on('createMessage', (message, callback) => {
		console.log('Message created:', message);
		
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server.');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	});
	
	socket.on('disconnect', () => {
		console.log("client disconnected")
	});
})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};