"use strict;"

//The port to serve on
const PORT = 3040;

//global variables
var fs = require('fs');
var http = require('http');
var server = new http.Server(handleRequest);

//Start the server
server.listen(PORT, function(){
  console.log("Listening on port", PORT);
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
    case '/script.js':
      serveFile('public/script.js', 'text/css', req, res);
      break;
    default:
      res.statusCode = 404;
      res.end("Not found");
  }
}
