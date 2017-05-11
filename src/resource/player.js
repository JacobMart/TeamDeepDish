"use strict";

/** @module projects
 * A RESTful resource representing a software project
 * implementing the CRUD methods.
 */
var fs = require('fs');
var multipart = require('./../../lib/multipart');
var encryption = require('./../../lib/encryption');
 
 
module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
}

/** @function list
 * Sends a list of all projects as a JSON array.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function list(req, res, db) {
  db.all("SELECT * FROM players", [], function(err, players){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error")
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(players));
  });
}

/** @function create
 * Creates a new project and adds it to the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function create(req, res, db) {

console.log("arrive multipart");
 // Using multipart library to succeffuly render the  request from the register.html
  multipart(req, res, function(req, res){	
	var salt = encryption.salt();
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	  console.log("username: ",username," Pwrd", password);
	  db.run("INSERT INTO players (username,cryptedPassword,salt,wins,losses) values (?,?,?,?,?)",
	  username,
	  encryption.digest(password + salt),
	  salt,0,0, function(err, user) {
	 // if(err) {console.log(err); return res.render('login/signup_error', {message: "Username is already taken. Try other username.", user: req.user});}
	 // else { return res.render('login/login', {message: "Account has been created, Please login now."});}
	  return res.redirect('/login.html');
	});
 });// end of mulitipart			
}

/** @function read
 * Serves a specific project as a JSON string
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function read(req, res, db) {

  var id = req.params.id;
  db.get("SELECT * FROM players WHERE id=?", [id], function(err, project){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
      return;
    }
    if(!project) {
      res.statusCode = 404;
      res.end("Project not found");
      return;
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(project));
  });
}


/** @update
 * Updates a specific record with the supplied values
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function update(req, res, db) {
  var id = req.params.id;
  var body = "";

  req.on("error", function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function() {
    var project = JSON.parse(body);
    db.run("UPDATE players SET name=?, description=?, version=?, repository=?, license=? WHERE id=?",
      [project.name, project.description, project.version, project.repository, project.license, id],
      function(err) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Could not update project in database");
          return;
        }
        res.statusCode = 200;
        res.end();
      }
    );
  });
}

/** @destroy
 * Removes the specified project from the database.
 * @param {http.incomingRequest} req - the request object 
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
 
function destroy(req, res, db) {
  var id = req.params.id;
  db.run("DELETE FROM players WHERE id=?", [id], function(err) {
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
    }
    res.statusCode = 200;
    res.end();
  });
}
