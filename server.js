"use strict;"

//The port to serve on
const PORT = 3040;

//global variables
var fs = require('fs');
var http = require('http');
var server = new http.Server(handleRequest);
var io = require('socket.io')(server);

// setup the websockets
var connected = 0;
io.on('connection', function(socket) {
  console.log('came here');
    var name = 'User ' + connected;
    var color = 'gray';
    connected++;

    socket.on('message', function(text) {
        io.emit('message', {
            user: name,
            text: text,
            color: color
        });
    });

    socket.on('color', function(newColor) {
        color = newColor;
    });

    socket.emit('welcome', "Welcome, " + name + "!");
});

/** @function serveFile
 * Serves a static file resource
 * @param {string} file - the path to the file
 * @param {string} type - the Content-Type of the file
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveFile(file, type, req, res) {
  fs.readFile(file, function(err, data) {
    if(err) {
      console.error("error");
      res.statusCode = 500;
      res.end("Server Error");
      return;
    }
    res.setHeader('ContentType', type);
    res.end(data);
  });
}

/** @function handleRequest
 * Handles incoming http requests
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  switch(req.url) {
    case '/':
    case '/index.html':
      serveFile('public/index.html', 'text/html', req, res);
      break;
    case '/style.css':
      serveFile('public/style.css', 'text/css', req, res);
      break;
    case '/simple-chat.css':
      serveFile('public/simple-chat.css', 'text/css', req, res);
      break;
    case '/script.js':
      serveFile('public/script.js', 'text/js', req, res);
      break;

    case '/chess_game.js':
      serveFile('public/chess_game.js',"text/js", req, res);
      break;
    default:
      res.statusCode = 404;
      res.end("Not found");
  }
}

//Start the server
server.listen(PORT, function(){
  console.log("Listening on port", PORT);
});
