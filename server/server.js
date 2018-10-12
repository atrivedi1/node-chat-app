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

	socket.on('createMessage', (message) => {
		console.log('Message created:', message);
		
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})
	
	socket.on('disconnect', () => {
		console.log("client disconnected")
	});
})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};