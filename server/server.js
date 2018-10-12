const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath))
app.use(bodyParser.json());

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit('newMessage', {
		from: 'Akash',
		text: "Hell yeah",
		createdAt: 492
	});

	socket.on('createMessage', (newMessage) => {
		console.log('Message created:', newMessage);
	})
	
	socket.on('disconnect', () => {
		console.log("client disconnected")
	});
})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};