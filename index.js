const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

// setting routes
app.get("/", (req, res) => {
	res.send('The Server is up and running');
})

// registering the PORT
server.listen(PORT, () => {
	console.log(`Listening to ${PORT}`);
})


// registering the chat socket
const io = socketIO(server);


io.on('connection', (socket) => {
	console.log('A new connection is established');
})
