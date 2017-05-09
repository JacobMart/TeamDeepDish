** @function list
 * Sends a list of all projects as a JSON array.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function list(req, res, db) {
  db.all("SELECT * FROM cars", [], function(err, cars){
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error")
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(cars));
  });
}

/** @function create
 * Creates a new project and adds it to the database.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function create(req, res, db) {


//var  jsonData = JSON.stringify({filename:req.body.image.filename,carName:req.body.carName,year:req.body.year,description:req.body.description});

    multipart(req, res, function(req, res){

db.run("INSERT INTO cars (name, brand, year, description) VALUES (?,?,?,?)",
[req.body.image.filename,req.body.carName, req.body.year, req.body.description],
 function(err) {
if(err) {
 console.error(err);
 res.statusCode = 500;
 res.end("Could not insert project into database");
 return;
}
res.statusCode = 200;
res.end();
 }
);
fs.writeFile('public/images/' + req.body.image.filename, req.body.image.data, function(err){
 if(err) {
console.error(err);
res.statusCode = 500;
res.statusMessage = "Server Error";
res.end("Server Error");
return;
 }
  });// end of mulitipart
});
}

/** @function read
 * Serves a specific project as a JSON string
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {sqlite3.Database} db - the database object
 */
function read(req, res, db) {
  var id = req.params.id;
  db.get("SELECT * FROM cars WHERE id=?", [id], function(err, project){
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
    db.run("UPDATE cars SET name=?, description=?, version=?, repository=?, license=? WHERE id=?",
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
  db.run("DELETE FROM cars WHERE id=?", [id], function(err) {
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
    }
    res.statusCode = 200;
    res.end();
  });
}
