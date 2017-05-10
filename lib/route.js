"use strict";

/** @module router
 * A module that defines a class for routing
 * http requests to handler functions
 */
module.exports = {
  Router: Router
};

var url = require('url');

function Router(db) {
  this.db = db;
  this.routeMap = {
    get: [],
    post: []
  }
}

/** @function route
 * Routes an incoming request to the proper registered
 * request handler, or sends a 404 error if no match
 * is found.  Modifies the request object to contain a
 * params associative array of tokens parsed from the
 * reqeust object.
 * @param {http.incomingRequest} req - the reqeust object
 * @param {http.serverResponse} res - the response object
 */
Router.prototype.route = function(req, res) {
  // The method is used to determine which routeMap
  // to search for the route in
  var routeMap = this.routeMap[req.method.toLowerCase()];
  // The resource string from the request url will
  // be matched against the routeMap regular expressions
  var resource = url.parse(req.url).pathname;
  // Find the correct route for the requested resource
  // INVARIANT: route has not yet been found.
  for(var i = 0; i < routeMap.length; i++){
    var match = routeMap[i].regexp.exec(resource);
    if(match) {
      // Store the parameters as an object
      // on the request
      req.params = {}
      routeMap[i].tokens.forEach(function(token, j){
        // Each token corresponds to a capture group
        // from the regular expression match.  These are
        // offset by 1, as the first entry in the match
        // array is the full matching string.
        req.params[token] = match[j+1];
      });
      // Trigger the handler and return, stopping execution
      return routeMap[i].handler(req, res);
    }
  }
  // If we reach this point, the resource was not mapped
  // to a route, so send a 404 error
  res.statusCode = 404;
  res.statusMessage = "Resource not found";
  res.end("Resource not found");
}

/** @function get
 * Adds a GET route with associated handler to
 * the get routemap.
 * @param {string} route - the route to add
 * @param {function} handler - the function to
 * call when a match is found
 */
Router.prototype.get = function(route, handler) {
  addRoute(this.routeMap.get, route, handler);
}

/** @function post
 * Adds a POST route with associated handler to
 * the get routemap.
 * @param {string} route - the route to add
 * @param {function} handler - the function to
 * call when a match is found
 */
Router.prototype.post = function(route, handler) {
  addRoute(this.routeMap.post, route, handler);
}

/** @function resource
 * This is a shorthand method for generating restful
 * routes for a resource, i.e.:
 *  GET route/ -> resource.list()
 *  POST route/ -> resource.add()
 *  GET route/:id -> resource.show()
 *  POST route/:id -> resource.update()
 *  GET route/:id/edit -> resource.edit()
 *  POST route/:id/destroy -> resource.destroy()
 * @param {string} route - the resource route
 * @param {object} resource - an object implementing the
 * above methods
 */
Router.prototype.resource = function(route, resource) {
  var db = this.db;
  if(resource.list) this.get(route, function(req, res) {resource.list(req, res, db)});
  if(resource.create) this.post(route, function(req, res) {resource.create(req, res, db)});
  if(resource.read) this.get(route + '/:id', function(req, res) {resource.read(req, res, db)});
  if(resource.edit) this.get(route + '/:id/edit', function(req, res) {resource.read(req, res, db)});
  if(resource.update) this.post(route + '/:id', function(req, res) {resource.update(req, res, db)});
  if(resource.destroy) this.get(route + '/:id/destroy', function(req, res) {resource.destroy(req, res, db)});
}

/** @function addRoute
 * This helper function adds a route to a routeMap
 * associative array
 * @param {object} routeMap - the routemap to add the route to
 * @param {string} route - the route to add
 * @param {function} handler - the handler to add
 */
function addRoute(routeMap, route, handler) {
  var tokens = [];
  // Convert the route into a regular expression
  var parts = route.split('/').map(function(part) {
    if(part.charAt(0) == ':') {
      // This is a token, so store the token and
      // add a regexp capture group to our parts array
      tokens.push(part.slice(1));
      return '([^\/]+)';
      return '(\w+)';
    } else {
      // This is a static sequence of characters,
      // so leave it as-is
      return part;
    }
  });
  var regexp = new RegExp('^' + parts.join('/') + '/?$');
  // Store the route in the routemap
  routeMap.push({
    regexp: regexp,
    tokens: tokens,
    handler: handler
  });
}
