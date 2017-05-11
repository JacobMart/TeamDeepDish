"use strict;"

//The port to serve on
const PORT = 3040;

//global variables
var fs = require('fs');
var http = require('http');
var express = require('express');
var encryption = require('./lib/encryption');
var urlencoded = require('./lib/form-urlencoded');
var parseCookie = require('./lib/cookie-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});
var router = new (require('./lib/route')).Router(db);
router = express();
var server = new http.Server(handleRequest);
var io = require('socket.io')(server);
var car = require('./src/resource/player');

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

router.use(express.static('public'));

//serving image
router.get('/images/:filename',function(req, res){
	//console.log(req.param.filename);
    fs.readFile('images/' + req.params.filename, function(err, body){
      res.setHeader('Content-Type', 'image/png');
      res.end(body);
    });
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

  // We start by creating an empty session
   req.session = {}

   // We need to determine if there is a logged-in user.
   // We'll check for a session cookie
   var cookie = req.headers.cookie;

   // First, we need to check to see if a cookie was even
   // sent to us.  The first time a client visits our site,
   // they will not have a cookie for it, because we haven't
   // sent them a set-cookie header in a response.  Also,
   // if they turn off cookies in thier browser, there will
   // be no cookies.

if(cookie) {
      // Since we have a cookie, we'll use our cookie-parser
      // library to parse it into an associative array (a map).
      var cookieMap = parseCookie(cookie);

      // To better protect against manipulation of the session
      // cookie, we encrypt it before sending it to the
      // client.  Therefore, the cookie they send back is
      // likewise encrypted, and must be decrypted before
      // we can make sense of it.
      var cryptedSession = cookieMap["cryptsession"];

      // There may not yet be a session
      if(cryptedSession) {
        // if there is, the session is encrypted, and must be decrypted
        var sessionData = encryption.decipher(cryptedSession);
        // further, it is in JSON form, so parse it and set the
        // req.session object to be its parsed value
        req.session = JSON.parse(sessionData);
      }
  }

  switch(req.url) {
    case '/':
    case '/login':
        if(req.method == 'GET') {
          // For GET requests, serve the login page
          fs.readFile('public/login.html', function(err, data){
            if(err){
            }
            res.setHeader("Content-Type", "text/html");
            res.end(data);
          });
        } else {
          // For POST requests, parse the urlencoded body
          urlencoded(req, res, function(req, res){
            var username = req.body.username;
            var password = req.body.password;
            // Evaluate the username/password
				db.get("SELECT * FROM players WHERE username = ?", username, (err, user) => {
					if(err) return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
					console.log(user);
					if( user.length > 0) {
						//return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
						 //res.redirect('/login.html');
						 console.log("no user");
						res.statusCode = 302;
						res.setHeader("Location", "/login.html");
						res.end();	
					}
					else{
						if(user.cryptedPassword != encryption.digest(password + user.salt)) 
						{
							//return res.render('login/login_error', {message: "Username/Password not found.  Please try again.", user: req.user});
							//return res.redirect('/login.html');
							res.statusCode = 302;
							res.setHeader("Location", "/login.html");
							res.end();
						}
						else{
							req.session.user_id = user.id;
							 // matching password & username - log the user in
							// by creating the session object
							var session = {username: username};
							// JSON encode the session object
							var sessionData = JSON.stringify(session);
							// Encrypt the session data
							var sessionCrypt = encryption.encipher(sessionData);
							// And send it to the client as a session cookie
							res.setHeader("Set-Cookie", ["cryptsession=" + sessionCrypt + "; session;"]);
							// Finally, redirect back to the index
							res.statusCode = 302;
							res.setHeader("Location", "/index.html");
							res.end();
							//return res.redirect('/index.html');
						}
					}	
				});		
          }); // end of urlencode
        }
        break;
    case '/register.html':
      if (req.method == 'GET') {
        serveFile('public/register.html', 'text/html', req, res);
		console.log('arrive to get of register file');
      }
      break;
    case '/index.html':
      serveFile('public/chessboardjs-0.3.0/index.html', 'text/html', req, res);
      break;
    case '/chessboard-0.3.0-min.js':
      serveFile('public/chessboardjs-0.3.0/chessboard-0.3.0-min.js', 'text/js', req, res);
      break;
    case '/chessboard-0.3.0-min.css':
      serveFile('public/chessboardjs-0.3.0/css/chessboard-0.3.0-min.css', 'text/css', req, res);
      break;
  //  case '/socket.io/socket.io.js':
  //      serverFile('');
    case '/login.css':
      serveFile('public/login.css', 'text/css', req, res);
      break;
    case '/style.css':
      serveFile('public/style.css', 'text/css', req, res);
      break;
    case '/script.js':
      serveFile('public/script.js', 'text/javascript', req, res);
      break;
    case '/indexStyle.css':
     serveFile('public/indexStyle.css', 'text/css', req, res);
     break;
    case '/indexScript.js':
     serveFile('public/chessboardjs-0.3.0/indexScript.js', 'text/css', req, res);
     break;
     case '/chess_game.js':
      serveFile('public/chess_game.js',"text/js", req, res);
      break;
    default:
		router(req,res);
		console.log("came to router");
  }

}


var player = require('./src/resource/player');

//router.resource('/players', player); //New routing

var route = '/players';

if(player.list) router.get(route, function(req, res) {player.list(req, res, db)});
if(player.create) router.post(route, function(req, res) {player.create(req, res, db)});
if(player.read) router.get(route + '/:id', function(req, res) {player.read(req, res, db)});
if(player.edit) router.get(route + '/:id/edit', function(req, res) {player.read(req, res, db)});
if(player.update) router.post(route + '/:id', function(req, res) {player.update(req, res, db)});
if(player.destroy) router.get(route + '/:id/destroy', function(req, res) {player.destroy(req, res, db)});

var migrate = require('./lib/migrate');


migrate(db, 'migrations', function(err){
	console.log("arrive to migrate");
 // var server = new http.Server(function(req, res) {
 //   router.route(req, res);
 // });
  server.listen(PORT, function(){
    console.log("listening on port " + PORT);
  });


});
