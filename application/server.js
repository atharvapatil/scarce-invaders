// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for clients to connect
io.on('connection', function (socket) {
  console.log('A client connected: ' + socket.id);

  // Listen for this client to disconnect
  socket.on('disconnect', function () {
    console.log("A client has disconnected " + socket.id);
  });
});

